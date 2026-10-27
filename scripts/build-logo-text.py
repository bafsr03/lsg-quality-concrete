"""Rebuild brand/source/logo.png: keep the owner's house monogram, redraw the
two text lines as "LSG GENERAL" / "CONTRACTOR" in Montserrat (the original face).

  python3 scripts/build-logo-text.py brand/source/logo-original.png brand/source/logo.png <fonts-dir>

<fonts-dir> holds Montserrat-Bold.ttf and Montserrat-Regular.ttf (OFL, from
github.com/JulietaUla/Montserrat). Then run node scripts/build-brand.mjs."""
import sys
from PIL import Image, ImageDraw, ImageFont
src, out, fonts = sys.argv[1], sys.argv[2], sys.argv[3]
im = Image.open(src).convert('RGBA')
W, H = im.size
A = im.getchannel('A')
mono_box = A.crop((0, 0, W, 700)).getbbox()
cx = (mono_box[0] + mono_box[2]) / 2
# Ink colour from the monogram's solid pixels.
px = [im.getpixel((x, y)) for y in range(mono_box[1], mono_box[3], 7) for x in range(mono_box[0], mono_box[2], 7)]
solid = [p for p in px if p[3] > 250]
ink = tuple(sorted(c[i] for c in solid)[len(solid) // 2] for i in range(3))
SS = 4  # supersample

def line(text, face, cap_px, tracking_em=0.0, target_w=None):
    f = ImageFont.truetype(f'{fonts}/Montserrat-{face}.ttf', 400 * SS)
    cap = f.getbbox('H')[3] - f.getbbox('H')[1]
    f = ImageFont.truetype(f'{fonts}/Montserrat-{face}.ttf', round(400 * SS * cap_px * SS / cap))
    def render(track):
        widths = [f.getlength(c) for c in text]
        total = sum(widths) + track * (len(text) - 1)
        canvas = Image.new('L', (int(total) + 200 * SS, int(cap_px * SS * 2.2)), 0)
        d = ImageDraw.Draw(canvas)
        x = 100 * SS
        for c, w in zip(text, widths):
            d.text((x, cap_px * SS * 0.3), c, font=f, fill=255)
            x += w + track
        return canvas.crop(canvas.getbbox())
    track = tracking_em * f.size
    g = render(track)
    if target_w:  # solve tracking so the line spans target_w
        for _ in range(30):
            track += (target_w * SS - g.width) / (len(text) - 1)
            g = render(track)
    return g.resize((round(g.width / SS), round(g.height / SS)), Image.LANCZOS)

l1 = line('LSG GENERAL', 'Bold', 79)
l2 = line('CONTRACTOR', 'Regular', 52, target_w=l1.width)
out_im = Image.new('RGBA', (W, H), (0, 0, 0, 0))
out_im.paste(im.crop((0, 0, W, 715)), (0, 0))
for g, top in [(l1, 752), (l2, 867)]:
    layer = Image.new('RGBA', g.size, ink + (255,))
    layer.putalpha(g)
    out_im.alpha_composite(layer, (round(cx - g.width / 2), top))
out_im.save(out)
print('ink', ink, 'l1', l1.size, 'l2', l2.size, 'cx', cx)
