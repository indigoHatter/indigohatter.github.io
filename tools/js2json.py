"""
js2json.py — strips `const VAR_NAME = ` wrapper and trailing semicolon,
strips JS comments, parses JS object literals (unquoted keys OK),
and writes a pretty-printed .json file.

Usage:
    python js2json.py <in.js> [out.json]
    python js2json.py left.js                # outputs left.json alongside original
    python js2json.py left.js resume.json    # outputs to resume.json

Dependencies:
    pip install jsmin demjson3
"""

import sys
import re
import json
from pathlib import Path
from jsmin import jsmin      #pyright:ignore[reportMissingImports] - handled by Dependencies reminder in header
import demjson3              #pyright:ignore[reportMissingImports] - handled by Dependencies reminder in header


def js_to_json(input_path: Path, output_path: Path) -> None:
    raw = input_path.read_text(encoding="utf-8")

    # Strip comments (jsmin respects string contents)
    stripped = jsmin(raw)

    # Strip leading `const FOO = ` (any valid JS identifier)
    stripped = re.sub(r"^\s*const\s+\w+\s*=\s*", "", stripped, count=1)

    # Strip trailing semicolon and whitespace
    stripped = stripped.rstrip().rstrip(";").rstrip()

    # Parse as JS object literal (handles unquoted keys)
    try:
        data = demjson3.decode(stripped)
    except demjson3.JSONDecodeError as e:
        print(f"Error: could not parse as JS object literal.\n{e}")
        sys.exit(1)

    output_path.write_text(json.dumps(data, indent=2), encoding="utf-8")
    print(f"Written: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python js2json.py <input.js> [output.json]")
        sys.exit(1)

    input_path = Path(sys.argv[1])

    if not input_path.exists():
        print(f"Error: file not found: {input_path}")
        sys.exit(1)

    output_path = Path(sys.argv[2]) if len(sys.argv) >= 3 else input_path.with_suffix(".json")

    js_to_json(input_path, output_path)