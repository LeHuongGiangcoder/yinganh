"""Turn the couple's originals in assets-source/ into the web assets in public/.

The line art arrives as dark pencil on white paper; it is re-inked in navy with
a transparent background (reds become gold) so it reads on the sky-blue page.
Photographs are downscaled to webp. Re-run after adding or swapping an original:

    python3 scripts/build-assets.py
"""

from PIL import Image, ImageOps
import os, numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
REPO = os.path.dirname(HERE)
SRC = os.path.join(REPO, "assets-source")   # the couple's originals (git-ignored)
OUT = os.path.join(REPO, "public")          # what the site actually serves
TPL = os.path.join(SRC, "template-art")     # ink drawings carried over from the template

NAVY = (18, 48, 91)
GOLD = (199, 154, 46)

def tint(src, out, navy=NAVY, gold=GOLD, keep_red=True, gamma=1.0, size=None, trim=True):
    """Dark-ink-on-light art -> transparent art in navy (reds mapped to gold)."""
    im = Image.open(src).convert("RGBA")
    if size:
        im.thumbnail(size, Image.LANCZOS)
    a = np.asarray(im).astype(np.float32)
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    lum = 0.299 * r + 0.587 * g + 0.114 * b
    alpha = np.clip((255.0 - lum) / 255.0, 0, 1) ** gamma
    alpha = alpha * (al / 255.0)
    # drop the paper tone the art was scanned on, then lift the remaining
    # pencil strokes so the faint ones survive on a coloured background
    floor = 0.09
    alpha = np.clip((alpha - floor) / (1.0 - floor), 0, 1) ** 0.8
    alpha = np.clip(alpha * 1.35, 0, 1)
    redness = (r - np.maximum(g, b)) / 255.0
    is_red = (redness > 0.18) & (al > 8) if keep_red else np.zeros_like(alpha, bool)
    out_rgb = np.zeros(a.shape[:2] + (3,), np.float32)
    for i in range(3):
        out_rgb[..., i] = np.where(is_red, gold[i], navy[i])
    res = np.dstack([out_rgb, alpha * 255.0]).astype(np.uint8)
    art = Image.fromarray(res)
    # The uploads are full-page scans; crop back to the drawing itself so the
    # layout can size each piece by what is actually drawn.
    box = art.getchannel("A").point(lambda v: 255 if v > 45 else 0).getbbox() if trim else None
    if box:
        pad = int(0.02 * max(art.width, art.height))
        art = art.crop((
            max(0, box[0] - pad), max(0, box[1] - pad),
            min(art.width, box[2] + pad), min(art.height, box[3] + pad),
        ))
    art.save(out)
    print("tint", out)

def photo(src, out, size=(1400, 1400), q=82, gray=False):
    im = Image.open(src)
    im = ImageOps.exif_transpose(im).convert("RGB")
    im.thumbnail(size, Image.LANCZOS)
    if gray:
        im = ImageOps.grayscale(im).convert("RGB")
    im.save(out, "WEBP", quality=q, method=6)
    print("photo", out, im.size)

def passthrough(src, out, size=(1400, 1400), q=80):
    im = Image.open(src).convert("RGB")
    im.thumbnail(size, Image.LANCZOS)
    im.save(out, "WEBP", quality=q, method=6)
    print("bg", out, im.size)

# --- backgrounds -----------------------------------------------------------
passthrough(f"{SRC}/background/2.webp", f"{OUT}/images/bg-sky.webp", (1100, 1900))
passthrough(f"{SRC}/background/4.webp", f"{OUT}/images/bg-cloud.webp", (1100, 1900))

# --- entrance --------------------------------------------------------------
tint(f"{SRC}/sketch.png", f"{OUT}/images/sketch-portrait.png", gamma=1.15, size=(1100, 1650), trim=False)
photo(f"{SRC}/after sketch.jpeg", f"{OUT}/images/after-sketch.webp", (1000, 1500))

# --- couple photos (flashback montage + gallery) ---------------------------
MOMENTS = [
    ("DSC_6666 copy.jpeg",   "moment-01.webp"),
    ("DSC_5839 copy.jpeg",   "moment-02.webp"),
    ("DSC_6029 -2copy.jpeg", "moment-03.webp"),
    ("DSC_5716 copy.jpeg",   "moment-04.webp"),
    ("DSC_6549 copy.jpeg",   "moment-05.webp"),
    ("DSC_5781 copy.jpeg",   "moment-06.webp"),
    ("DSC_6705 copy.jpeg",   "moment-07.webp"),
]
for src, out in MOMENTS:
    photo(f"{SRC}/couple pics/{src}", f"{OUT}/images/{out}", (1000, 1500))

photo(f"{SRC}/couple pics/DSC_6670 copy.jpeg", f"{OUT}/images/portrait-hug.webp", (1000, 1500))

# --- line art from the template, re-inked in navy --------------------------
for n in ["5", "6", "7", "8", "12", "13", "14", "15", "16", "left", "right", "venue"]:
    tint(f"{TPL}/{n}.webp", f"{OUT}/component/{n}.png", size=(900, 900))

# --- line art the couple uploaded ------------------------------------------
tint(f"{SRC}/2.png", f"{OUT}/component/dancers.png", size=(1400, 1400))
tint(f"{SRC}/3.png", f"{OUT}/component/champagne.png", size=(1400, 1400))
tint(f"{SRC}/4.png", f"{OUT}/component/gifts.png", size=(1400, 1400))
tint(f"{SRC}/5.png", f"{OUT}/component/table.png", size=(1400, 1400))
