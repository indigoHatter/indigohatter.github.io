#!/usr/bin/env python3
"""
bubbles.py | SVG circle scatter generator for porterwhatever.io right brain block.
Used for development only — not part of the live environment.

Generates a <g> block of scattered circles suitable for pasting directly into
index.html. Two-phase placement:

  Phase 1: Random scatter up to TARGET_COUNT circles, collision-checked.
  Phase 2: Coverage grid check — fills any cell with fewer than MIN_PER_CELL
           circles, skipping the text exclusion zone.

Usage:
    python3 bubbles.py

Tune the CONFIG section at the top, then paste the printed output into
the <g clip-path="url(#clipRight)"> block in index.html.
"""

import math
import random

# ── CONFIG ────────────────────────────────────────────────────────────────────

SEED          = 42       # Change for a different layout; keep fixed to reproduce

# Placement bounds (viewBox coordinates)
CX_MIN        = 320
CX_MAX        = 480
CY_MIN        = 100
CY_MAX        = 260

# Text exclusion zone — no circle edge enters this region
# "Creative" label lives in the lower-right corner
TEXT_EXCL_X   = 418     # cx + r must stay <= this, OR...
TEXT_EXCL_Y   = 232     # cy + r must stay <= this (both conditions needed to exclude)

# Circle size distribution
RADII         = [3,   3.5,  4,   4.5,  5,   5.5,  6  ]
WEIGHTS       = [14,  12,   11,  9,    8,   5,    3  ]

# Phase 1
TARGET_COUNT  = 55      # How many circles to scatter
MIN_GAP       = 6       # Minimum px between circle edges (prevents overlaps)

# Phase 2 coverage grid
GRID_COLS     = 4       # Divide CX range into this many columns
GRID_ROWS     = 4       # Divide CY range into this many rows
MIN_PER_CELL  = 2       # Minimum circles per grid cell (text zone exempt)

# SVG output
STROKE_A      = "var(--c-right-circle)"
STROKE_B      = "var(--c-right-circle-b)"
STROKE_WIDTH  = "0.9"
OPACITY       = "0.45"
CLIP_PATH     = "url(#clipRight)"
INDENT        = "            "   # indentation to match index.html

# ── HELPERS ───────────────────────────────────────────────────────────────────

def dist(a, b):
    return math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2)

def collides(new, placed, min_gap):
    cx, cy, r = new
    for ox, oy, oR in placed:
        if dist((cx, cy), (ox, oy)) < r + oR + min_gap:
            return True
    return False

def in_text_zone(cx, cy, r):
    """Returns True if any part of the circle overlaps the text exclusion zone."""
    return cx + r > TEXT_EXCL_X and cy + r > TEXT_EXCL_Y

# ── PHASE 1: SCATTER ─────────────────────────────────────────────────────────

random.seed(SEED)
placed = []
attempts = 0

while len(placed) < TARGET_COUNT and attempts < 8000:
    attempts += 1
    r  = random.choices(RADII, weights=WEIGHTS)[0]
    cx = random.randint(CX_MIN, CX_MAX)
    cy = random.randint(CY_MIN, CY_MAX)
    if in_text_zone(cx, cy, r):
        continue
    if not collides((cx, cy, r), placed, MIN_GAP):
        placed.append((cx, cy, r))

# ── PHASE 2: COVERAGE FILL ───────────────────────────────────────────────────

cell_w = (CX_MAX - CX_MIN) // GRID_COLS
cell_h = (CY_MAX - CY_MIN) // GRID_ROWS

for col in range(GRID_COLS):
    for row in range(GRID_ROWS):
        x0 = CX_MIN + col * cell_w
        x1 = x0 + cell_w
        y0 = CY_MIN + row * cell_h
        y1 = y0 + cell_h

        # Skip cells that overlap the text exclusion zone
        if x1 > TEXT_EXCL_X and y1 > TEXT_EXCL_Y:
            continue

        count = sum(1 for ox, oy, _ in placed if x0 <= ox < x1 and y0 <= oy < y1)

        fill_attempts = 0
        while count < MIN_PER_CELL and fill_attempts < 200:
            fill_attempts += 1
            r  = random.choices([3, 3.5, 4], weights=[5, 4, 3])[0]
            cx = random.randint(x0 + 4, x1 - 4)
            cy = random.randint(y0 + 4, y1 - 4)
            if in_text_zone(cx, cy, r):
                continue
            if not collides((cx, cy, r), placed, MIN_GAP):
                placed.append((cx, cy, r))
                count += 1

# ── OUTPUT ───────────────────────────────────────────────────────────────────

placed.sort(key=lambda c: (c[1], c[0]))

print(f'{INDENT}<g clip-path="{CLIP_PATH}" opacity="{OPACITY}">')
print(f'{INDENT}  <!-- {len(placed)} circles, scattered with coverage check -->')
for i, (cx, cy, r) in enumerate(placed):
    stroke = STROKE_A if i % 2 == 0 else STROKE_B
    r_str  = str(int(r)) if r == int(r) else str(r)
    print(f'{INDENT}  <circle cx="{cx}" cy="{cy}" r="{r_str}" '
          f'fill="none" stroke="{stroke}" stroke-width="{STROKE_WIDTH}"/>')
print(f'{INDENT}</g>')
print(f'\n<!-- {len(placed)} circles placed in {attempts} phase-1 attempts -->')
