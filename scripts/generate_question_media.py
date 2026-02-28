from __future__ import annotations
import json
from pathlib import Path
from PIL import Image

ROOT = Path('/Users/hytae/Downloads/verse8-driving-cbt')
DB_PATH = ROOT / 'data' / 'questions.v1.json'
PAGE_DIR = ROOT / 'data' / 'page_media'
OUT_DIR = ROOT / 'data' / 'question_media'

OUT_DIR.mkdir(parents=True, exist_ok=True)

db = json.loads(DB_PATH.read_text(encoding='utf-8'))
questions = db.get('questions', [])

# Group questions by source page image.
page_map: dict[int, list[dict]] = {}
for q in questions:
    media = q.get('media')
    if not media or not media.get('src'):
        continue
    src = media['src']
    name = Path(src).name
    if not name.startswith('p') or not name.endswith('.jpg'):
        continue
    try:
        page_no = int(name[1:-4])
    except ValueError:
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

    # Vertical segmentation with slight overlap to avoid cut lines.
    if n <= 1:
        bounds = [(0.0, 1.0)]
    elif n == 2:
        bounds = [(0.0, 0.53), (0.47, 1.0)]
    elif n == 3:
        bounds = [(0.0, 0.355), (0.322, 0.688), (0.655, 1.0)]
    else:
        # Rare fallback: even split.
        step = 1.0 / n
        bounds = []
        for i in range(n):
            y0 = max(0.0, i * step - 0.01)
            y1 = min(1.0, (i + 1) * step + 0.01)
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

        q['media']['src'] = f'./data/question_media/{out_name}'
        q['media']['alt'] = f"Question {q.get('ordinal')} image"

DB_PATH.write_text(json.dumps(db, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f'Updated media paths in {DB_PATH}')
print(f'Generated {sum(len(v) for v in page_map.values())} cropped question images in {OUT_DIR}')
