import os
import subprocess
from PIL import Image, ImageDraw

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
WORKSPACE = r"d:\Works\2026\filemanager"
DOCS_LOGO = os.path.join(WORKSPACE, "docs", "logo")
PUBLIC_DIR = os.path.join(WORKSPACE, "public")
os.makedirs(DOCS_LOGO, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

# 1. Render Banner PNG (1200x380 with transparent background)
banner_svg_path = os.path.join(DOCS_LOGO, "filemangl-banner.svg")
banner_html_path = os.path.join(DOCS_LOGO, "_render_banner.html")
banner_png_path = os.path.join(DOCS_LOGO, "filemangl-banner.png")

with open(banner_html_path, "w", encoding="utf-8") as f:
    f.write("""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 1200px;
    height: 380px;
    background: transparent !important;
    overflow: hidden;
  }
  img {
    width: 1200px;
    height: 380px;
    display: block;
    background: transparent !important;
  }
</style>
</head>
<body style="background: transparent;">
  <img src="filemangl-banner.svg" />
</body>
</html>""")

cmd_banner = [
    EDGE_PATH,
    "--headless=new",
    "--disable-gpu",
    "--default-background-color=00000000",
    "--force-device-scale-factor=1",
    "--window-size=1200,380",
    f"--screenshot={banner_png_path}",
    f"file:///{banner_html_path.replace(os.sep, '/')}"
]
print("Rendering banner with transparent background...")
subprocess.run(cmd_banner, check=True)

# Post-process banner with PIL: Apply 4x supersampled rounded corner mask
banner_img = Image.open(banner_png_path).convert("RGBA")
bw, bh = banner_img.size

# Create high-precision antialiased rounded corner mask
scale = 4
mask_hi = Image.new("L", (bw * scale, bh * scale), 0)
draw_hi = ImageDraw.Draw(mask_hi)
# Radius is 20 in SVG, stroke-width is 2
draw_hi.rounded_rectangle([(0, 0), (bw * scale - 1, bh * scale - 1)], radius=20 * scale, fill=255)
corner_mask = mask_hi.resize((bw, bh), Image.Resampling.LANCZOS)

# Combine Edge's captured alpha with the rounded corner mask
r, g, b, orig_a = banner_img.split()
clean_a = Image.composite(orig_a, Image.new("L", (bw, bh), 0), corner_mask)
banner_img.putalpha(clean_a)
banner_img.save(banner_png_path, "PNG", optimize=True)
print(f"Banner saved with transparent corners. Top-left pixel: {banner_img.getpixel((0, 0))}")

# 2. Render Logo PNG (1024x1024 master with transparent background)
logo_html_path = os.path.join(DOCS_LOGO, "_render_logo.html")
logo_master_png = os.path.join(DOCS_LOGO, "_logo_master.png")

with open(logo_html_path, "w", encoding="utf-8") as f:
    f.write("""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  html, body {
    margin: 0;
    padding: 0;
    width: 1024px;
    height: 1024px;
    background: transparent !important;
    overflow: hidden;
  }
  img {
    width: 1024px;
    height: 1024px;
    display: block;
    background: transparent !important;
  }
</style>
</head>
<body style="background: transparent;">
  <img src="filemangl-logo.svg" />
</body>
</html>""")

cmd_logo = [
    EDGE_PATH,
    "--headless=new",
    "--disable-gpu",
    "--default-background-color=00000000",
    "--window-size=1024,1024",
    f"--screenshot={logo_master_png}",
    f"file:///{logo_html_path.replace(os.sep, '/')}"
]
print("Rendering logo master with transparent background...")
subprocess.run(cmd_logo, check=True)

# 3. Use PIL to generate icons & png variants
img = Image.open(logo_master_png).convert("RGBA")

# 512x512
img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
img_512.save(os.path.join(DOCS_LOGO, "filemangl-logo-512.png"), "PNG", optimize=True)
img_512.save(os.path.join(DOCS_LOGO, "filemangl-logo.png"), "PNG", optimize=True)

# 192x192
img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
img_192.save(os.path.join(DOCS_LOGO, "filemangl-logo-192.png"), "PNG", optimize=True)

# Apple touch icon 180x180
img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
img_180.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"), "PNG", optimize=True)

# 32x32 & 16x16
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save(os.path.join(PUBLIC_DIR, "favicon-32x32.png"), "PNG", optimize=True)

img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_16.save(os.path.join(PUBLIC_DIR, "favicon-16x16.png"), "PNG", optimize=True)

# Multi-resolution ICO (16, 32, 48, 64)
ico_sizes = [(16, 16), (32, 32), (48, 48), (64, 64)]
img.save(os.path.join(PUBLIC_DIR, "favicon.ico"), format="ICO", sizes=ico_sizes)
img.save(os.path.join(DOCS_LOGO, "favicon.ico"), format="ICO", sizes=ico_sizes)

# Clean up temp html & master
if os.path.exists(banner_html_path):
    os.remove(banner_html_path)
if os.path.exists(logo_html_path):
    os.remove(logo_html_path)
if os.path.exists(logo_master_png):
    os.remove(logo_master_png)

print("All assets successfully generated with crystal-clear transparency!")
