"""Regenerate products/*.html from tools/product-template.html.
Only needed if you add a new product: add it to config.js AND to PRODUCTS below,
then run:  python3 tools/build_products.py"""
from pathlib import Path
import html
PRODUCTS = [
    ("mehfil", "Mehfil", "Girls", "Sindoor anarkali with zari border & dupatta"),
    ("genda", "Genda", "Girls", "Marigold-gold lehenga-choli with dupatta"),
    ("shaan", "Shaan", "Boys", "Emerald Nehru jacket with ivory kurta & churidar"),
    ("chandni", "Chandni", "Boys", "Ivory kurta & dhoti with a fine gold border"),
]
root = Path(__file__).resolve().parent.parent
tpl = (root / "tools" / "product-template.html").read_text()
for slug, name, gender, tagline in PRODUCTS:
    out = (tpl.replace("{{SLUG}}", slug).replace("{{NAME}}", html.escape(name))
              .replace("{{GENDER}}", gender).replace("{{TAGLINE}}", html.escape(tagline)))
    (root / "products" / f"{slug}.html").write_text(out)
    print("wrote products/%s.html" % slug)
