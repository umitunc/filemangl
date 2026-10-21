import os
import subprocess
from PIL import Image

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
WORKSPACE = r"d:\Works\2026\filemanager"
DOCS_LOGO = os.path.join(WORKSPACE, "docs", "logo")
PUBLIC_DIR = os.path.join(WORKSPACE, "public")
os.makedirs(DOCS_LOGO, exist_ok=True)
os.makedirs(PUBLIC_DIR, exist_ok=True)

# 1. Render Banner PNG (1200x380)
banner_svg_path = os.path.join(DOCS_LOGO, "filemangl-banner.svg")
banner_html_path = os.path.join(DOCS_LOGO, "_render_banner.html")
banner_png_path = os.path.join(DOCS_LOGO, "filemangl-banner.png")

with open(banner_html_path, "w", encoding="utf-8") as f:
    f.write(f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ background: transparent; overflow: hidden; }}
  img {{ width: 1200px; height: 380px; display: block; }}
</style>
</head>
<body>
  <img src="filemangl-banner.svg" />
</body>
</html>""")

cmd_banner = [
    EDGE_PATH,
    "--headless=new",
    "--disable-gpu",
    "--force-device-scale-factor=1",
    "--window-size=1200,380",
    f"--screenshot={banner_png_path}",
    f"file:///{banner_html_path.replace(os.sep, '/')}"
]
print("Rendering banner...")
subprocess.run(cmd_banner, check=True)

# 2. Render Logo PNG (1024x1024 master)
logo_html_path = os.path.join(DOCS_LOGO, "_render_logo.html")
logo_master_png = os.path.join(DOCS_LOGO, "_logo_master.png")

with open(logo_html_path, "w", encoding="utf-8") as f:
    f.write(f"""<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * {{ margin: 0; padding: 0; box-sizing: border-box; }}
  body {{ background: transparent; overflow: hidden; }}
  img {{ width: 1024px; height: 1024px; display: block; }}
</style>
</head>
<body>
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
print("Rendering logo master...")
subprocess.run(cmd_logo, check=True)

# 3. Use PIL to generate icons & png variants
img = Image.open(logo_master_png).convert("RGBA")

# 512x512
img_512 = img.resize((512, 512), Image.Resampling.LANCZOS)
img_512.save(os.path.join(DOCS_LOGO, "filemangl-logo-512.png"))
img_512.save(os.path.join(DOCS_LOGO, "filemangl-logo.png"))

# 192x192
img_192 = img.resize((192, 192), Image.Resampling.LANCZOS)
img_192.save(os.path.join(DOCS_LOGO, "filemangl-logo-192.png"))

# Apple touch icon 180x180
img_180 = img.resize((180, 180), Image.Resampling.LANCZOS)
img_180.save(os.path.join(PUBLIC_DIR, "apple-touch-icon.png"))

# 32x32 & 16x16
img_32 = img.resize((32, 32), Image.Resampling.LANCZOS)
img_32.save(os.path.join(PUBLIC_DIR, "favicon-32x32.png"))

img_16 = img.resize((16, 16), Image.Resampling.LANCZOS)
img_16.save(os.path.join(PUBLIC_DIR, "favicon-16x16.png"))

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

print("All assets successfully generated!")
