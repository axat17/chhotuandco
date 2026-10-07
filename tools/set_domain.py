"""Point link previews (og:image / og:url) at the site's domain.
Run after changing CNAME:  python3 tools/set_domain.py"""
from pathlib import Path
import re
root = Path(__file__).resolve().parent.parent
cname = (root / "CNAME").read_text().strip() if (root / "CNAME").exists() else ""
base = f"https://{cname}" if cname else "https://axat17.github.io/chhotuandco"
files = [root / "index.html", root / "tools" / "product-template.html", *sorted((root / "products").glob("*.html"))]
for f in files:
    s = f.read_text()
    rel = "" if f.name in ("index.html",) else (f"products/{f.name}" if f.parent.name == "products" else None)
    s = re.sub(r'(<meta property="og:image" content=")[^"]*(")', rf'\g<1>{base}/assets/img/og-image.png\2', s)
    s = re.sub(r'\n<meta property="og:url" content="[^"]*">', '', s)
    if rel is not None:
        s = s.replace('<meta property="og:image"', f'<meta property="og:url" content="{base}/{rel}">\n<meta property="og:image"', 1)
    f.write_text(s)
    print("updated", f.relative_to(root))
print("base:", base)
