"""Validate local portfolio links, STL structure, source imports and ZIP CRCs."""
from pathlib import Path
import re
import struct
import zipfile
root = Path(__file__).resolve().parents[1]
for model in (root / 'models').glob('*.stl'):
    data = model.read_bytes()
    assert len(data) == 84 + 50 * struct.unpack_from('<I', data, 80)[0], model
for path in list(root.rglob('*.html')) + list(root.rglob('*.scad')):
    text = path.read_text()
    refs = re.findall(r'(?:href|src)="([^"#]+)"', text) if path.suffix == '.html' else re.findall(r'(?:import\("|include <)([^">]+)', text)
    for ref in refs:
        if ref.startswith(('https:', 'http:', 'data:', 'blob:')) or '${' in ref:
            continue
        ref = ref.split('#')[0].split('?')[0]
        if ref:
            assert (path.parent / ref).exists(), (path, ref)
for path in (root / 'downloads').glob('*.zip'):
    with zipfile.ZipFile(path) as archive:
        assert archive.testzip() is None, path
print('PASS: STL structure, relative references, and ZIP CRCs.')
