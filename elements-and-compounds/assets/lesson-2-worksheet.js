/**
 * Lesson 2 Consolidation Worksheet renderer & Teacher Answer Key toggle.
 * Renders clean Bohr ring templates for handwriting and overlays exact
 * electron configurations when Teacher Answer Key mode is active.
 */

const PART_B_ATOMS = [
  {
    symbol: 'N',
    name: 'Nitrogen',
    atomicNumber: 7,
    shells: [2, 5],
    rings: 2,
    note: 'Neutral atom · 7 e⁻',
  },
  {
    symbol: 'F',
    name: 'Fluorine',
    atomicNumber: 9,
    shells: [2, 7],
    rings: 2,
    note: 'Neutral atom · 9 e⁻',
  },
  {
    symbol: 'S',
    name: 'Sulfur',
    atomicNumber: 16,
    shells: [2, 8, 6],
    rings: 3,
    note: 'Neutral atom · 16 e⁻',
  },
  {
    symbol: 'K',
    name: 'Potassium',
    atomicNumber: 19,
    shells: [2, 8, 8, 1],
    rings: 4,
    note: 'Neutral atom · 19 e⁻',
  },
];

const PART_E_DIAGRAMS = [
  {
    label: 'Neutral Na (11 p⁺, 11 e⁻)',
    symbol: 'Na',
    protons: 11,
    shells: [2, 8, 1],
    rings: 3,
  },
  {
    label: 'Sodium ion Na⁺ (11 p⁺, 10 e⁻)',
    symbol: 'Na⁺',
    protons: 11,
    shells: [2, 8],
    rings: 3,
  },
];

const RING_RADII_BY_COUNT = {
  2: [44, 72],
  3: [38, 58, 78],
  4: [33, 49, 65, 81],
};

function buildBohrSvg({ protons, symbol, shells, rings, size = 164, showNucleusSymbol = true }) {
  const cx = 100;
  const cy = 100;
  const radii = RING_RADII_BY_COUNT[rings] || RING_RADII_BY_COUNT[3];

  const ringsMarkup = radii
    .map(
      (r) =>
        `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#64748B" stroke-width="1.6" stroke-dasharray="3 2.5" />`
    )
    .join('');

  const electronsMarkup = shells
    .map((count, ringIdx) => {
      const r = radii[ringIdx];
      if (!r || count <= 0) return '';
      const dots = [];
      for (let i = 0; i < count; i += 1) {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / count;
        const ex = (cx + r * Math.cos(angle)).toFixed(2);
        const ey = (cy + r * Math.sin(angle)).toFixed(2);
        dots.push(
          `<circle cx="${ex}" cy="${ey}" r="4.6" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.3" />`
        );
      }
      return dots.join('');
    })
    .join('');

  const nucleusLabel = showNucleusSymbol ? `${protons}p⁺` : symbol;

  return `
    <svg class="ws-bohr-svg" viewBox="0 0 200 200" width="${size}" height="${size}" aria-label="Bohr shell diagram for ${symbol}">
      ${ringsMarkup}
      <circle cx="${cx}" cy="${cy}" r="18" fill="#FEF2F2" stroke="#C93336" stroke-width="1.8" />
      <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="central" fill="#0F172A" font-family="IBM Plex Mono, monospace" font-size="11" font-weight="700">${nucleusLabel}</text>
      <g class="ws-bohr-answer-dots" aria-hidden="true">
        ${electronsMarkup}
      </g>
    </svg>
  `;
}

function renderPartB() {
  const grid = document.getElementById('ws-bohr-grid');
  if (!grid) return;

  grid.innerHTML = PART_B_ATOMS.map(
    (atom, idx) => `
      <article class="ws-bohr-card">
        <div class="ws-bohr-card-head">
          <div>
            <span class="ws-bohr-num">${idx + 1}.</span>
            <strong>${atom.name} (${atom.symbol})</strong>
          </div>
          <span class="ws-bohr-meta tabular-nums">Z = ${atom.atomicNumber} · ${atom.note}</span>
        </div>
        <div class="ws-bohr-stage">
          ${buildBohrSvg({
            protons: atom.atomicNumber,
            symbol: atom.symbol,
            shells: atom.shells,
            rings: atom.rings,
            size: 162,
          })}
        </div>
        <div class="ws-bohr-notation">
          <span>Shell notation:</span>
          <span class="ws-student-line-sm"></span>
          <span class="ws-key-val tabular-nums">${atom.shells.join(', ')}</span>
        </div>
      </article>
    `
  ).join('');
}

function renderPartE() {
  const container = document.getElementById('ws-ext-diagrams');
  if (!container) return;

  container.innerHTML = PART_E_DIAGRAMS.map(
    (item) => `
      <div class="ws-ext-svg-card">
        ${buildBohrSvg({
          protons: item.protons,
          symbol: item.symbol,
          shells: item.shells,
          rings: item.rings,
          size: 108,
        })}
        <span class="ws-ext-svg-caption">${item.label}</span>
      </div>
    `
  ).join('');
}

function initWorksheetControls() {
  const modeButtons = Array.from(document.querySelectorAll('[data-ws-mode]'));
  const banner = document.getElementById('ws-mode-banner');
  const printBtn = document.getElementById('ws-print-btn');

  function setMode(mode) {
    const nextMode = mode === 'key' ? 'key' : 'student';
    document.body.dataset.worksheetMode = nextMode;

    modeButtons.forEach((btn) => {
      const active = btn.dataset.wsMode === nextMode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    if (banner) {
      banner.textContent =
        nextMode === 'key'
          ? 'Teacher Answer Key — model answers and plotted electron shells visible for projection or printing.'
          : 'Student Copy — blank spaces formatted for handwriting on 1 double-sided A4 page.';
    }
  }

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.wsMode);
    });
  });

  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  setMode('student');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderPartB();
    renderPartE();
    initWorksheetControls();
  });
} else {
  renderPartB();
  renderPartE();
  initWorksheetControls();
}
