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

# Group questions by source PDF page.
page_map: dict[int, list[dict]] = {}
for q in questions:
    q_type = q.get('type')
    has_media = isinstance(q.get('media'), dict)
    if q_type not in {'sign', 'photo', 'illustration'} and not has_media:
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
        out_name = f"q{int(q.get('ordinal', 0)):04d}.jpg"
        out_path = OUT_DIR / out_name
        cropped.save(out_path, format='JPEG', quality=78, optimize=True)

        if not isinstance(q.get('media'), dict):
            q['media'] = {'type': 'image'}
        q['media']['type'] = 'image'
        q['media']['src'] = f'./data/question_media/{out_name}?{CACHE_BUSTER}'
        q['media']['alt'] = f"Question {q.get('ordinal')} image"

DB_PATH.write_text(json.dumps(db, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Updated media paths in {DB_PATH}')
print(f'Generated {sum(len(v) for v in page_map.values())} cropped question images in {OUT_DIR}')
