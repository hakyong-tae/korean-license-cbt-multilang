from __future__ import annotations
import json
from pathlib import Path
from PIL import Image

ROOT = Path('/Users/hytae/Downloads/verse8-driving-cbt')
DB_PATH = ROOT / 'data' / 'questions.v1.json'
PAGE_DIR = ROOT / 'data' / 'page_media'
OUT_DIR = ROOT / 'data' / 'question_media'
CACHE_BUSTER = 'v2'

OUT_DIR.mkdir(parents=True, exist_ok=True)

db = json.loads(DB_PATH.read_text(encoding='utf-8'))
questions = db.get('questions', [])


def needs_visual_media(q: dict) -> bool:
    prompt = (q.get('prompt', {}).get('en') or '').lower()
    q_type = q.get('type')
    if q_type not in {'sign', 'photo', 'illustration'}:
        return False
    visual_cues = (
        'following',
        'in the photo',
        'this photo',
        'given situation',
        'in the given situation',
        'pictured',
        'shown',
        'below',
        'image',
        'figure'
    )
    return any(cue in prompt for cue in visual_cues)


def extract_visual_only(cropped: Image.Image) -> Image.Image:
    gray = cropped.convert('L')
    w, h = gray.size
    px = gray.load()

    # Block-level connected components to isolate the main visual clue region.
    bs = 8
    gw = max(1, w // bs)
    gh = max(1, h // bs)
    mask = [[0] * gw for _ in range(gh)]

    for gy in range(gh):
        y0 = gy * bs
        y1 = min(h, y0 + bs)
        for gx in range(gw):
            x0 = gx * bs
            x1 = min(w, x0 + bs)
            total = (x1 - x0) * (y1 - y0)
            dark = 0
            for yy in range(y0, y1):
                for xx in range(x0, x1):
                    if px[xx, yy] < 238:
                        dark += 1
            ratio = dark / total if total else 0.0
            if ratio >= 0.10:
                mask[gy][gx] = 1

    seen = [[False] * gw for _ in range(gh)]
    comps = []
    dirs = ((1, 0), (-1, 0), (0, 1), (0, -1))

    for y in range(gh):
        for x in range(gw):
            if not mask[y][x] or seen[y][x]:
                continue
            stack = [(x, y)]
            seen[y][x] = True
            minx = maxx = x
            miny = maxy = y
            cnt = 0
            while stack:
                cx, cy = stack.pop()
                cnt += 1
                if cx < minx:
                    minx = cx
                if cx > maxx:
                    maxx = cx
                if cy < miny:
                    miny = cy
                if cy > maxy:
                    maxy = cy
                for dx, dy in dirs:
                    nx, ny = cx + dx, cy + dy
                    if 0 <= nx < gw and 0 <= ny < gh and mask[ny][nx] and not seen[ny][nx]:
                        seen[ny][nx] = True
                        stack.append((nx, ny))
            bw = maxx - minx + 1
            bh = maxy - miny + 1
            comps.append((cnt, minx, miny, bw, bh))

    # Keep candidates in top zone with meaningful size.
    candidates = []
    for cnt, minx, miny, bw, bh in comps:
        px_w = bw * bs
        px_h = bh * bs
        top = miny * bs
        area = px_w * px_h
        if top > int(h * 0.65):
            continue
        if px_h < int(h * 0.12) or px_w < int(w * 0.12):
            continue
        # Prefer regions that look like visual blocks, not long text strips.
        aspect = px_w / max(1, px_h)
        if aspect > 8.0 and px_h < int(h * 0.22):
            continue
        score = area + cnt * 10
        candidates.append((score, minx, miny, bw, bh))

    if not candidates:
        return cropped

    _, minx, miny, bw, bh = max(candidates, key=lambda t: t[0])
    x0 = max(0, minx * bs - 10)
    y0 = max(0, miny * bs - 10)
    x1 = min(w, (minx + bw) * bs + 10)
    y1 = min(h, (miny + bh) * bs + 10)

    # Final guard: if crop is too large, keep upper half to avoid question text body.
    if (y1 - y0) > int(h * 0.78):
        y1 = min(h, int(h * 0.55))
    if y1 <= y0 or x1 <= x0:
        return cropped

    return cropped.crop((x0, y0, x1, y1))

# Group questions by source PDF page.
page_map: dict[int, list[dict]] = {}
for q in questions:
    q_type = q.get('type')
    has_media = isinstance(q.get('media'), dict)
    if q_type not in {'sign', 'photo', 'illustration'} and not has_media:
        continue
    if not needs_visual_media(q):
        if 'media' in q:
            del q['media']
        continue

    page_no = None
    source_page = q.get('source', {}).get('page')
    if isinstance(source_page, int):
        page_no = source_page
    else:
        media = q.get('media')
        if media and media.get('src'):
            src = media['src']
            name = Path(src).name
            if name.startswith('p') and name.endswith('.jpg'):
                try:
                    page_no = int(name[1:-4])
                except ValueError:
                    page_no = None
    if not page_no:
        continue
    page_map.setdefault(page_no, []).append(q)

for page_no, qs in page_map.items():
    qs.sort(key=lambda x: x.get('ordinal', 0))
    page_path = PAGE_DIR / f'p{page_no:03d}.jpg'
    if not page_path.exists():
        continue

    img = Image.open(page_path).convert('RGB')
    w, h = img.size
    n = len(qs)

    # Vertical segmentation without overlap to avoid duplicated neighboring questions.
    if n <= 1:
        bounds = [(0.0, 1.0)]
    elif n == 2:
        bounds = [(0.0, 0.5), (0.5, 1.0)]
    elif n == 3:
        bounds = [(0.0, 1.0 / 3.0), (1.0 / 3.0, 2.0 / 3.0), (2.0 / 3.0, 1.0)]
    else:
        # Rare fallback: even split.
        step = 1.0 / n
        bounds = []
        for i in range(n):
            y0 = i * step
            y1 = (i + 1) * step
            bounds.append((y0, y1))

    for idx, q in enumerate(qs):
        y0f, y1f = bounds[min(idx, len(bounds) - 1)]
        y0 = max(0, int(h * y0f))
        y1 = min(h, int(h * y1f))
        if y1 <= y0:
            y0, y1 = 0, h

        cropped = img.crop((0, y0, w, y1))
        visual = extract_visual_only(cropped)
        out_name = f"q{int(q.get('ordinal', 0)):04d}.jpg"
        out_path = OUT_DIR / out_name
        visual.save(out_path, format='JPEG', quality=82, optimize=True)

        if not isinstance(q.get('media'), dict):
            q['media'] = {'type': 'image'}
        q['media']['type'] = 'image'
        q['media']['src'] = f'./data/question_media/{out_name}?{CACHE_BUSTER}'
        q['media']['alt'] = f"Question {q.get('ordinal')} image"

# Cleanup orphaned cropped images that are no longer referenced.
used_files = set()
for q in questions:
    src = (q.get('media') or {}).get('src') or ''
    if not src:
        continue
    file_name = Path(src.split('?', 1)[0]).name
    if file_name:
        used_files.add(file_name)

for p in OUT_DIR.glob('q*.jpg'):
    if p.name not in used_files:
        p.unlink(missing_ok=True)

DB_PATH.write_text(json.dumps(db, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Updated media paths in {DB_PATH}')
print(f'Generated {sum(len(v) for v in page_map.values())} cropped question images in {OUT_DIR}')
