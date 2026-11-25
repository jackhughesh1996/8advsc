/**
 * Shared classroom interactivity, persistence, and Periodic Table engine
 * for the "Elements and Compounds" 7-lesson unit.
 */

export const STORAGE_KEY = 'elements_compounds_unit_v1';

export const LESSONS = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'Atoms & Elements',
    href: './lesson-1.html',
    summary:
      'Explore what matter is made of at the particle level and how pure elements differ from everyday substances.',
    successCriteria: [
      'Define an atom as the smallest building block of an element.',
      'Explain that an element contains only one type of atom.',
      'Identify common elements from particle diagrams and everyday examples.',
    ],
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'The Periodic Table & Element Symbols',
    href: './lesson-2.html',
    summary:
      'Read element tiles, write one- and two-letter chemical symbols accurately, and navigate groups and periods.',
    successCriteria: [
      'Use correct capitalisation when writing chemical symbols (e.g., Na, Cl, Fe).',
      'Locate elements by period (row) and group (column) on the Periodic Table.',
      'Explain why some symbols come from Latin names such as Fe, Cu, and Au.',
    ],
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'Metals, Non-Metals & Metalloids',
    href: './lesson-3.html',
    summary:
      'Compare physical properties such as conductivity, lustre, and malleability to classify elements.',
    successCriteria: [
      'Compare key properties of metals and non-metals.',
      'Identify where metals, non-metals, and metalloids sit on the Periodic Table.',
      'Match an element’s properties to a practical real-world use.',
    ],
  },
  {
    id: 'lesson-4',
    number: 4,
    title: 'Compounds & Mixtures',
    href: './lesson-4.html',
    summary:
      'Distinguish chemically bonded compounds from physical mixtures and observe how properties change upon bonding.',
    successCriteria: [
      'Explain the difference between an element, a compound, and a mixture.',
      'Interpret particle models to classify pure substances and mixtures.',
      'Describe how a compound’s properties differ from its constituent elements.',
    ],
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'Chemical Formulas & Atomic Ratios',
    href: './lesson-5.html',
    summary:
      'Decode chemical formulas using element symbols and subscript numbers to count atoms in a molecule or lattice.',
    successCriteria: [
      'Identify which elements are present in a chemical formula.',
      'Use subscripts to count the exact number of each type of atom.',
      'Write simple formulas from particle diagrams or atom ratios.',
    ],
  },
  {
    id: 'lesson-6',
    number: 6,
    title: 'Naming Simple Compounds',
    href: './lesson-6.html',
    summary:
      'Apply systematic naming rules for binary compounds (-ide) and common polyatomic compounds (-ate).',
    successCriteria: [
      'Name two-element compounds using the "-ide" ending rule.',
      'Recognise common "-ate" compounds that contain oxygen (e.g., carbonate, sulfate).',
      'Translate between common compound names and their chemical formulas.',
    ],
  },
  {
    id: 'lesson-7',
    number: 7,
    title: 'Physical vs. Chemical Changes',
    href: './lesson-7.html',
    summary:
      'Distinguish reversible state/shape changes from chemical reactions that rearrange atoms into new substances.',
    successCriteria: [
      'Identify evidence of a chemical reaction (gas, precipitate, colour or temperature change).',
      'Distinguish physical changes from chemical changes using particle ideas.',
      'Represent simple reactions using word equations showing reactants and products.',
    ],
  },
];

/**
 * Curated Periodic Table dataset: Elements 1–20 + key classroom metals
 * Positioned in authentic Period (1–6) and Group (1–18) coordinates.
 */
export const ELEMENTS = [
  { number: 1, symbol: 'H', name: 'Hydrogen', mass: '1.008', period: 1, group: 1, category: 'nonmetal', categoryLabel: 'Non-metal', state: 'Gas', uses: 'Rocket fuel, ammonia production', fact: 'Lightest and most abundant element in the universe.' },
  { number: 2, symbol: 'He', name: 'Helium', mass: '4.003', period: 1, group: 18, category: 'noble-gas', categoryLabel: 'Noble Gas', state: 'Gas', uses: 'Weather balloons, MRI cooling', fact: 'Unreactive gas with a full outer electron shell.' },

  { number: 3, symbol: 'Li', name: 'Lithium', mass: '6.94', period: 2, group: 1, category: 'alkali-metal', categoryLabel: 'Alkali Metal', state: 'Solid', uses: 'Rechargeable batteries', fact: 'Soft enough to cut with a butter knife and floats on water.' },
  { number: 4, symbol: 'Be', name: 'Beryllium', mass: '9.012', period: 2, group: 2, category: 'alkaline-earth', categoryLabel: 'Alkaline Earth Metal', state: 'Solid', uses: 'Aerospace alloys, X-ray windows', fact: 'Strong yet very lightweight metal.' },
  { number: 5, symbol: 'B', name: 'Boron', mass: '10.81', period: 2, group: 13, category: 'metalloid', categoryLabel: 'Metalloid', state: 'Solid', uses: 'Borosilicate lab glassware', fact: 'Helps Pyrex glassware resist sudden heat changes.' },
  { number: 6, symbol: 'C', name: 'Carbon', mass: '12.01', period: 2, group: 14, category: 'nonmetal', categoryLabel: 'Non-metal', state: 'Solid', uses: 'Pencil graphite, diamonds, fuels', fact: 'Forms the backbone of all organic molecules.' },
  { number: 7, symbol: 'N', name: 'Nitrogen', mass: '14.01', period: 2, group: 15, category: 'nonmetal', categoryLabel: 'Non-metal', state: 'Gas', uses: 'Makes up 78% of Earth’s air, fertilisers', fact: 'Essential element in proteins and DNA.' },
  { number: 8, symbol: 'O', name: 'Oxygen', mass: '16.00', period: 2, group: 16, category: 'nonmetal', categoryLabel: 'Non-metal', state: 'Gas', uses: 'Respiration, combustion, water (H₂O)', fact: 'Makes up about 21% of the air we breathe.' },
  { number: 9, symbol: 'F', name: 'Fluorine', mass: '19.00', period: 2, group: 17, category: 'halogen', categoryLabel: 'Halogen', state: 'Gas', uses: 'Toothpaste fluoride compounds', fact: 'The most chemically reactive non-metal.' },
  { number: 10, symbol: 'Ne', name: 'Neon', mass: '20.18', period: 2, group: 18, category: 'noble-gas', categoryLabel: 'Noble Gas', state: 'Gas', uses: 'Glowing glass signs, lasers', fact: 'Glows bright reddish-orange in high-voltage tubes.' },

  { number: 11, symbol: 'Na', name: 'Sodium', mass: '22.99', period: 3, group: 1, category: 'alkali-metal', categoryLabel: 'Alkali Metal', state: 'Solid', uses: 'Table salt (NaCl), street lamps', fact: 'Symbol Na comes from the Latin word "natrium".' },
  { number: 12, symbol: 'Mg', name: 'Magnesium', mass: '24.31', period: 3, group: 2, category: 'alkaline-earth', categoryLabel: 'Alkaline Earth Metal', state: 'Solid', uses: 'Flares, lightweight alloys', fact: 'Burns with a dazzling bright white flame in oxygen.' },
  { number: 13, symbol: 'Al', name: 'Aluminium', mass: '26.98', period: 3, group: 13, category: 'post-transition', categoryLabel: 'Post-Transition Metal', state: 'Solid', uses: 'Drink cans, foil, aircraft bodies', fact: 'Most abundant metal in Earth’s crust.' },
  { number: 14, symbol: 'Si', name: 'Silicon', mass: '28.09', period: 3, group: 14, category: 'metalloid', categoryLabel: 'Metalloid', state: 'Solid', uses: 'Computer microchips, glass, sand', fact: 'Semiconductor that powers modern electronics.' },
  { number: 15, symbol: 'P', name: 'Phosphorus', mass: '30.97', period: 3, group: 15, category: 'nonmetal', categoryLabel: 'Non-metal', state: 'Solid', uses: 'Matchboxes, plant fertilisers', fact: 'Found in bones, teeth, and cell energy molecules.' },
  { number: 16, symbol: 'S', name: 'Sulfur', mass: '32.06', period: 3, group: 16, category: 'nonmetal', categoryLabel: 'Non-metal', state: 'Solid', uses: 'Vulcanising rubber, sulfuric acid', fact: 'Bright yellow brittle solid found near volcanoes.' },
  { number: 17, symbol: 'Cl', name: 'Chlorine', mass: '35.45', period: 3, group: 17, category: 'halogen', categoryLabel: 'Halogen', state: 'Gas', uses: 'Water purification, table salt (NaCl)', fact: 'Pale green toxic gas that forms safe salt when bonded to sodium.' },
  { number: 18, symbol: 'Ar', name: 'Argon', mass: '39.95', period: 3, group: 18, category: 'noble-gas', categoryLabel: 'Noble Gas', state: 'Gas', uses: 'Light bulbs, welding shields', fact: 'Third most common gas in Earth’s atmosphere (~0.93%).' },

  { number: 19, symbol: 'K', name: 'Potassium', mass: '39.10', period: 4, group: 1, category: 'alkali-metal', categoryLabel: 'Alkali Metal', state: 'Solid', uses: 'Fertilisers, essential nerve mineral', fact: 'Symbol K comes from the Latin word "kalium".' },
  { number: 20, symbol: 'Ca', name: 'Calcium', mass: '40.08', period: 4, group: 2, category: 'alkaline-earth', categoryLabel: 'Alkaline Earth Metal', state: 'Solid', uses: 'Bones, shells, limestone (CaCO₃)', fact: 'Gives chalk, marble, and seashells their structure.' },

  // Common Classroom Metals (Periods 4–6)
  { number: 26, symbol: 'Fe', name: 'Iron', mass: '55.85', period: 4, group: 8, category: 'transition-metal', categoryLabel: 'Transition Metal', state: 'Solid', uses: 'Steel bridges, magnets, haemoglobin', fact: 'Symbol Fe comes from Latin "ferrum"; rusts in air and water.' },
  { number: 29, symbol: 'Cu', name: 'Copper', mass: '63.55', period: 4, group: 11, category: 'transition-metal', categoryLabel: 'Transition Metal', state: 'Solid', uses: 'Electrical wiring, plumbing pipes', fact: 'Symbol Cu comes from Latin "cuprum"; excellent conductor.' },
  { number: 30, symbol: 'Zn', name: 'Zinc', mass: '65.38', period: 4, group: 12, category: 'transition-metal', categoryLabel: 'Transition Metal', state: 'Solid', uses: 'Galvanising steel, brass alloy', fact: 'Protects iron from rusting when used as a coating.' },
  { number: 47, symbol: 'Ag', name: 'Silver', mass: '107.87', period: 5, group: 11, category: 'transition-metal', categoryLabel: 'Transition Metal', state: 'Solid', uses: 'Jewellery, mirrors, electronics', fact: 'Symbol Ag comes from Latin "argentum"; highest electrical conductivity.' },
  { number: 50, symbol: 'Sn', name: 'Tin', mass: '118.71', period: 5, group: 14, category: 'post-transition', categoryLabel: 'Post-Transition Metal', state: 'Solid', uses: 'Solder, bronze alloy, food cans', fact: 'Symbol Sn comes from Latin "stannum".' },
  { number: 79, symbol: 'Au', name: 'Gold', mass: '196.97', period: 6, group: 11, category: 'transition-metal', categoryLabel: 'Transition Metal', state: 'Solid', uses: 'Jewellery, circuit contacts', fact: 'Symbol Au comes from Latin "aurum"; never tarnishes in air.' },
  { number: 80, symbol: 'Hg', name: 'Mercury', mass: '200.59', period: 6, group: 12, category: 'transition-metal', categoryLabel: 'Transition Metal', state: 'Liquid', uses: 'Scientific barometers, older thermometers', fact: 'Symbol Hg comes from "hydrargyrum"; the only metal that is liquid at room temperature.' },
  { number: 82, symbol: 'Pb', name: 'Lead', mass: '207.2', period: 6, group: 14, category: 'post-transition', categoryLabel: 'Post-Transition Metal', state: 'Solid', uses: 'Radiation shielding, car batteries', fact: 'Symbol Pb comes from Latin "plumbum" (origin of "plumbing").' },
];

/* ==========================================================================
   localStorage Persistence Helpers
   ========================================================================== */

function createEmptyState() {
  return { version: 1, lessons: {} };
}

export function loadProgress() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return createEmptyState();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object' || !parsed.lessons) {
      return createEmptyState();
    }
    return parsed;
  } catch {
    return createEmptyState();
  }
}

export function saveProgress(state) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota or private-browsing errors cleanly
  }
}

export function getLessonState(lessonId) {
  const state = loadProgress();
  if (!state.lessons[lessonId]) {
    state.lessons[lessonId] = { totalActivities: 0, activities: {} };
  }
  return state.lessons[lessonId];
}

export function setActivityResult(lessonId, activityId, payload, totalActivitiesOnPage) {
  const state = loadProgress();
  if (!state.lessons[lessonId]) {
    state.lessons[lessonId] = { totalActivities: totalActivitiesOnPage || 0, activities: {} };
  }
  if (typeof totalActivitiesOnPage === 'number') {
    state.lessons[lessonId].totalActivities = totalActivitiesOnPage;
  }
  state.lessons[lessonId].activities[activityId] = {
    ...payload,
    updatedAt: new Date().toISOString(),
  };
  saveProgress(state);
  updateLessonProgressBar(lessonId);
  renderUnitHubCards();
}

export function registerLessonActivityCount(lessonId, count) {
  const state = loadProgress();
  if (!state.lessons[lessonId]) {
    state.lessons[lessonId] = { totalActivities: count, activities: {} };
  } else {
    state.lessons[lessonId].totalActivities = count;
  }
  saveProgress(state);
}

export function clearProgress(scopeLessonId = null) {
  if (!scopeLessonId) {
    saveProgress(createEmptyState());
  } else {
    const state = loadProgress();
    delete state.lessons[scopeLessonId];
    saveProgress(state);
  }
}

/* ==========================================================================
   Progress Bar & Unit Hub Rendering
   ========================================================================== */

export function getCurrentLessonId() {
  return document.body?.dataset?.lessonId || null;
}

export function updateLessonProgressBar(lessonId = getCurrentLessonId()) {
  if (!lessonId) return;
  const activityEls = document.querySelectorAll('[data-activity]');
  const total = activityEls.length;
  const lessonState = getLessonState(lessonId);
  const completed = Array.from(activityEls).filter((el) => {
    const id = el.dataset.activityId;
    return id && lessonState.activities?.[id]?.completed;
  }).length;

  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  document.querySelectorAll('[data-progress-fill]').forEach((bar) => {
    bar.style.width = `${pct}%`;
  });

  document.querySelectorAll('[data-progress-label]').forEach((label) => {
    label.textContent =
      total === 0 ? '0 / 0 activities' : `${completed} / ${total} completed`;
  });
}

export function renderUnitHubCards() {
  const grid = document.getElementById('unit-lesson-grid');
  if (!grid) return;

  const state = loadProgress();
  let completedLessons = 0;
  let totalCompletedActivities = 0;
  let totalKnownActivities = 0;

  grid.innerHTML = '';

  LESSONS.forEach((lesson) => {
    const saved = state.lessons?.[lesson.id];
    const totalActs = saved?.totalActivities || 0;
    const activitiesMap = saved?.activities || {};
    const doneActs = Object.values(activitiesMap).filter((a) => a && a.completed).length;

    totalCompletedActivities += doneActs;
    totalKnownActivities += totalActs;

    let statusClass = '';
    let statusText = '○ Not started';
    if (totalActs > 0 && doneActs >= totalActs) {
      statusClass = 'is-complete';
      statusText = '✓ Completed';
      completedLessons += 1;
    } else if (doneActs > 0) {
      statusClass = 'is-progress';
      statusText = `◐ ${doneActs} of ${totalActs} done`;
    }

    const card = document.createElement('article');
    card.className = 'lesson-card';

    const criteriaItems = lesson.successCriteria
      .map(
        (criterion) =>
          `<li><span class="criteria-bullet" aria-hidden="true">${statusClass === 'is-complete' ? '✓' : '·'}</span><span>${escapeHtml(criterion)}</span></li>`
      )
      .join('');

    const progressMeta =
      totalActs > 0
        ? `${doneActs}/${totalActs} activities`
        : 'Ready to begin';

    card.innerHTML = `
      <div class="lesson-card-top">
        <span class="lesson-index">Lesson 0${lesson.number}</span>
        <span class="status-indicator ${statusClass}">${statusText}</span>
      </div>
      <h3 class="lesson-card-title">${escapeHtml(lesson.title)}</h3>
      <p class="lesson-card-summary">${escapeHtml(lesson.summary)}</p>
      <div class="criteria-block">
        <span class="criteria-heading">Success Criteria</span>
        <ul class="criteria-list">${criteriaItems}</ul>
      </div>
      <div class="lesson-card-footer">
        <span class="lesson-card-progress-text">${progressMeta}</span>
        <a class="btn btn-primary btn-sm" href="${lesson.href}">Open Lesson ${lesson.number}</a>
      </div>
    `;

    grid.appendChild(card);
  });

  // Update Unit Hub overall progress meter
  const pctEl = document.getElementById('hub-progress-pct');
  const fillEl = document.getElementById('hub-progress-fill');
  const lessonsCountEl = document.getElementById('hub-lessons-count');
  const actsCountEl = document.getElementById('hub-activities-count');

  const unitPct =
    totalKnownActivities > 0
      ? Math.round((totalCompletedActivities / totalKnownActivities) * 100)
      : Math.round((completedLessons / LESSONS.length) * 100);

  if (pctEl) pctEl.textContent = `${unitPct}%`;
  if (fillEl) fillEl.style.width = `${unitPct}%`;
  if (lessonsCountEl) {
    lessonsCountEl.textContent = `${completedLessons} of ${LESSONS.length} lessons complete`;
  }
  if (actsCountEl) {
    actsCountEl.textContent =
      totalKnownActivities > 0
        ? `${totalCompletedActivities} / ${totalKnownActivities} activities saved`
        : 'Progress auto-saves locally';
  }
}

/* ==========================================================================
   Reusable Activity Engine 1: Multiple Choice Checker
   Usage:
   <div class="activity-card" data-activity="mcq" data-activity-id="l1-q1" data-answer="b">
     ...
     <button class="mcq-option" data-option="a" data-explanation="...">Option A</button>
     <button class="mcq-option" data-option="b" data-explanation="...">Option B</button>
     <div class="activity-feedback" aria-live="polite"></div>
   </div>
   ========================================================================== */

export function initMCQ(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const correctOption = (container.dataset.answer || '').trim();
  const options = Array.from(container.querySelectorAll('[data-option]'));
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || activityId;

  function applySelection(selectedValue, saveToStore = true) {
    const isCorrect = selectedValue === correctOption;
    let chosenText = '';
    let explanation = '';

    options.forEach((optBtn) => {
      const val = (optBtn.dataset.option || '').trim();
      const active = val === selectedValue;
      optBtn.classList.toggle('is-selected', active);
      optBtn.classList.toggle('is-correct', active && isCorrect);
      optBtn.classList.toggle('is-incorrect', active && !isCorrect);
      optBtn.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (active) {
        chosenText = optBtn.textContent.trim();
        explanation = optBtn.dataset.explanation || '';
      }
    });

    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', isCorrect);
      feedbackEl.classList.toggle('is-error', !isCorrect);
      const prefix = isCorrect ? '✓ Correct:' : '✕ Not quite:';
      const defaultMsg = isCorrect
        ? 'Well done—your answer has been saved.'
        : 'Review the concept above and try another option.';
      feedbackEl.textContent = `${prefix} ${explanation || defaultMsg}`;
    }

    if (saveToStore && lessonId && activityId) {
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'mcq',
          title: titleText,
          selected: selectedValue,
          answerSummary: chosenText,
          completed: isCorrect,
        },
        totalActivities
      );
    }
  }

  options.forEach((optBtn) => {
    optBtn.addEventListener('click', () => {
      applySelection((optBtn.dataset.option || '').trim(), true);
    });
  });

  // Restore saved state
  if (lessonId && activityId) {
    const saved = getLessonState(lessonId).activities?.[activityId];
    if (saved && saved.selected) {
      applySelection(saved.selected, false);
    }
  }
}

/* ==========================================================================
   Reusable Activity Engine 2: Drag-or-Click Classification
   Usage:
   <div class="activity-card" data-activity="classify" data-activity-id="l3-sort">
     <div class="classify-bank">
       <button class="classify-item" draggable="true" data-item-id="iron" data-target="metal">Iron</button>
     </div>
     <div class="classify-bins">
       <div class="classify-bin" data-bin="metal">...<div class="classify-bin-items"></div></div>
     </div>
     <div class="classify-actions">
       <button data-classify-check>Check Answers</button>
       <button data-classify-reset>Reset</button>
     </div>
     <div class="activity-feedback" aria-live="polite"></div>
   </div>
   ========================================================================== */

export function initClassify(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const bankEl = container.querySelector('.classify-bank');
  const bins = Array.from(container.querySelectorAll('[data-bin]'));
  const items = Array.from(container.querySelectorAll('[data-item-id]'));
  const checkBtn = container.querySelector('[data-classify-check]');
  const resetBtn = container.querySelector('[data-classify-reset]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || activityId;

  let selectedItemEl = null;

  function clearFeedback() {
    items.forEach((item) => item.classList.remove('is-correct', 'is-incorrect'));
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
  }

  function selectItem(itemEl) {
    if (selectedItemEl === itemEl) {
      itemEl.classList.remove('is-selected');
      selectedItemEl = null;
      return;
    }
    items.forEach((i) => i.classList.remove('is-selected'));
    selectedItemEl = itemEl;
    itemEl.classList.add('is-selected');
  }

  function moveItemToContainer(itemEl, targetContainer) {
    if (!itemEl || !targetContainer) return;
    targetContainer.appendChild(itemEl);
    itemEl.classList.remove('is-selected');
    selectedItemEl = null;
    clearFeedback();
    persistPlacements(false);
  }

  function getCurrentPlacements() {
    const placements = {};
    bins.forEach((bin) => {
      const binId = bin.dataset.bin;
      const binItems = bin.querySelectorAll('[data-item-id]');
      binItems.forEach((item) => {
        placements[item.dataset.itemId] = binId;
      });
    });
    return placements;
  }

  function persistPlacements(completedFlag) {
    if (!lessonId || !activityId) return;
    const placements = getCurrentPlacements();
    const summaryPairs = items
      .map((item) => {
        const binId = placements[item.dataset.itemId];
        return `${item.textContent.trim()} -> ${binId || 'unplaced'}`;
      })
      .join('; ');

    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'classify',
        title: titleText,
        placements,
        answerSummary: summaryPairs,
        completed: Boolean(completedFlag),
      },
      totalActivities
    );
  }

  function evaluateClassification(save = true) {
    let correctCount = 0;
    let placedCount = 0;

    items.forEach((item) => {
      const parentBin = item.closest('[data-bin]');
      item.classList.remove('is-correct', 'is-incorrect');
      if (parentBin) {
        placedCount += 1;
        const isMatch = parentBin.dataset.bin === item.dataset.target;
        item.classList.add(isMatch ? 'is-correct' : 'is-incorrect');
        if (isMatch) correctCount += 1;
      }
    });

    const allCorrect = placedCount === items.length && correctCount === items.length;

    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allCorrect);
      feedbackEl.classList.toggle('is-error', !allCorrect);
      if (placedCount < items.length) {
        feedbackEl.textContent = `Place all ${items.length} items into a category first (${placedCount}/${items.length} placed).`;
      } else if (allCorrect) {
        feedbackEl.textContent = `✓ All ${items.length} items classified correctly.`;
      } else {
        feedbackEl.textContent = `✕ ${correctCount} of ${items.length} correct. Move any red items to another category and check again.`;
      }
    }

    if (save) {
      persistPlacements(allCorrect);
    }
  }

  // Click-to-select & drag-and-drop on items
  items.forEach((item) => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      selectItem(item);
    });

    item.addEventListener('dragstart', (e) => {
      selectedItemEl = item;
      e.dataTransfer?.setData('text/plain', item.dataset.itemId || '');
    });
  });

  // Bins accept clicks and drops
  bins.forEach((bin) => {
    const dropZone = bin.querySelector('.classify-bin-items') || bin;

    bin.addEventListener('click', () => {
      if (selectedItemEl) {
        moveItemToContainer(selectedItemEl, dropZone);
      }
    });

    bin.addEventListener('dragover', (e) => {
      e.preventDefault();
      bin.classList.add('is-drop-target');
    });

    bin.addEventListener('dragleave', () => {
      bin.classList.remove('is-drop-target');
    });

    bin.addEventListener('drop', (e) => {
      e.preventDefault();
      bin.classList.remove('is-drop-target');
      const draggedId = e.dataTransfer?.getData('text/plain');
      const itemEl =
        items.find((i) => i.dataset.itemId === draggedId) || selectedItemEl;
      moveItemToContainer(itemEl, dropZone);
    });
  });

  // Clicking bank returns selected item to bank
  if (bankEl) {
    bankEl.addEventListener('click', () => {
      if (selectedItemEl) {
        moveItemToContainer(selectedItemEl, bankEl);
      }
    });
    bankEl.addEventListener('dragover', (e) => e.preventDefault());
    bankEl.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggedId = e.dataTransfer?.getData('text/plain');
      const itemEl =
        items.find((i) => i.dataset.itemId === draggedId) || selectedItemEl;
      moveItemToContainer(itemEl, bankEl);
    });
  }

  checkBtn?.addEventListener('click', () => evaluateClassification(true));

  resetBtn?.addEventListener('click', () => {
    items.forEach((item) => {
      item.classList.remove('is-selected', 'is-correct', 'is-incorrect');
      bankEl?.appendChild(item);
    });
    selectedItemEl = null;
    clearFeedback();
    persistPlacements(false);
  });

  // Restore saved state
  if (lessonId && activityId) {
    const saved = getLessonState(lessonId).activities?.[activityId];
    if (saved?.placements) {
      Object.entries(saved.placements).forEach(([itemId, binId]) => {
        const itemEl = items.find((i) => i.dataset.itemId === itemId);
        const binEl = bins.find((b) => b.dataset.bin === binId);
        const dropZone = binEl?.querySelector('.classify-bin-items') || binEl;
        if (itemEl && dropZone) {
          dropZone.appendChild(itemEl);
        }
      });
      if (saved.completed) {
        evaluateClassification(false);
      }
    }
  }
}

/* ==========================================================================
   Reusable Activity Engine 3: Editable Student Tables
   Usage:
   <div class="activity-card" data-activity="table" data-activity-id="l2-table">
     <table class="student-table">
       ...
       <input class="table-input" data-cell-id="r1c1" data-sample="Sodium" />
     </table>
     <button data-table-toggle-samples>Show Sample Answers</button>
   </div>
   ========================================================================== */

export function initEditableTable(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const inputs = Array.from(container.querySelectorAll('[data-cell-id]'));
  const sampleBtn = container.querySelector('[data-table-toggle-samples]');
  const statusEl = container.querySelector('[data-table-status]');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || activityId;

  let showingSamples = false;

  function saveTable() {
    const values = {};
    let filledCount = 0;

    inputs.forEach((input) => {
      const cellId = input.dataset.cellId;
      const val = input.value;
      values[cellId] = val;
      if (val.trim().length > 0) filledCount += 1;
    });

    const isComplete = inputs.length > 0 && filledCount === inputs.length;
    if (statusEl) {
      statusEl.textContent =
        filledCount === 0
          ? 'Type your notes to auto-save'
          : `Saved (${filledCount}/${inputs.length} cells filled)`;
    }

    if (lessonId && activityId) {
      const summary = inputs
        .filter((i) => i.value.trim())
        .map((i) => `${i.dataset.cellLabel || i.dataset.cellId}: ${i.value.trim()}`)
        .join(' | ');

      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'table',
          title: titleText,
          cells: values,
          answerSummary: summary || 'No entries yet',
          completed: isComplete,
        },
        totalActivities
      );
    }
  }

  let debounceTimer = null;
  inputs.forEach((input) => {
    input.addEventListener('input', () => {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(saveTable, 180);
    });
  });

  sampleBtn?.addEventListener('click', () => {
    showingSamples = !showingSamples;
    sampleBtn.textContent = showingSamples ? 'Hide Sample Answers' : 'Show Sample Answers';
    inputs.forEach((input) => {
      const sample = input.dataset.sample;
      if (!sample) return;
      let note = input.parentElement?.querySelector('.table-sample-note');
      if (showingSamples) {
        if (!note) {
          note = document.createElement('div');
          note.className = 'table-sample-note';
          input.parentElement?.appendChild(note);
        }
        note.textContent = `Sample: ${sample}`;
      } else if (note) {
        note.remove();
      }
    });
  });

  // Restore saved cell values
  if (lessonId && activityId) {
    const saved = getLessonState(lessonId).activities?.[activityId];
    if (saved?.cells) {
      let filledCount = 0;
      inputs.forEach((input) => {
        const val = saved.cells[input.dataset.cellId];
        if (typeof val === 'string') {
          input.value = val;
          if (val.trim().length > 0) filledCount += 1;
        }
      });
      if (statusEl && filledCount > 0) {
        statusEl.textContent = `Saved (${filledCount}/${inputs.length} cells filled)`;
      }
    }
  }
}

/* ==========================================================================
   Interactive Periodic Table Modal (Elements 1–20 + Common Metals)
   ========================================================================== */

let lastFocusedElement = null;

function ensurePeriodicTableModal() {
  let modal = document.getElementById('periodic-table-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'periodic-table-modal';
  modal.className = 'modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'pt-modal-title');

  const categories = [
    { id: 'all', label: 'All Elements (28)' },
    { id: 'alkali-metal', label: 'Alkali Metals' },
    { id: 'alkaline-earth', label: 'Alkaline Earth' },
    { id: 'transition-metal', label: 'Transition Metals' },
    { id: 'post-transition', label: 'Post-Transition' },
    { id: 'metalloid', label: 'Metalloids' },
    { id: 'nonmetal', label: 'Non-metals' },
    { id: 'halogen', label: 'Halogens' },
    { id: 'noble-gas', label: 'Noble Gases' },
  ];

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-wide">
      <div class="modal-header">
        <div>
          <h2 id="pt-modal-title">Interactive Periodic Table</h2>
          <p class="meta-line">Elements 1–20 plus key classroom metals (Fe, Cu, Zn, Ag, Sn, Au, Hg, Pb)</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" data-close-modal="periodic-table-modal" aria-label="Close Periodic Table">
          Close
        </button>
      </div>
      <div class="modal-body">
        <div class="pt-toolbar">
          <div class="pt-filter-bar" role="group" aria-label="Filter elements by category">
            ${categories
              .map(
                (cat, idx) =>
                  `<button type="button" class="pt-filter-btn ${idx === 0 ? 'is-active' : ''}" data-pt-filter="${cat.id}">${cat.label}</button>`
              )
              .join('')}
          </div>
        </div>
        <div class="pt-layout">
          <div class="pt-grid-scroll">
            <div class="pt-grid" id="pt-grid-cells"></div>
          </div>
          <aside class="pt-inspector" id="pt-inspector" aria-live="polite"></aside>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const gridEl = modal.querySelector('#pt-grid-cells');
  const inspectorEl = modal.querySelector('#pt-inspector');
  const filterBtns = Array.from(modal.querySelectorAll('[data-pt-filter]'));

  let activeCategory = 'all';
  let selectedNumber = 6; // Default focus: Carbon

  function renderInspector(el) {
    if (!el || !inspectorEl) return;
    inspectorEl.innerHTML = `
      <div class="pt-inspector-head">
        <div class="pt-inspector-badge cat-${el.category}">
          <span class="pt-num">${el.number}</span>
          <span class="pt-sym">${el.symbol}</span>
        </div>
        <div>
          <h3>${escapeHtml(el.name)}</h3>
          <p class="meta-line">${escapeHtml(el.categoryLabel)} · Period ${el.period}, Group ${el.group}</p>
        </div>
      </div>
      <ul class="pt-facts-list">
        <li><span class="pt-facts-label">Atomic Number</span><span class="pt-facts-value tabular-nums">${el.number}</span></li>
        <li><span class="pt-facts-label">Relative Atomic Mass</span><span class="pt-facts-value tabular-nums">${el.mass}</span></li>
        <li><span class="pt-facts-label">State at 20 °C</span><span class="pt-facts-value">${escapeHtml(el.state)}</span></li>
        <li><span class="pt-facts-label">Common Uses</span><span class="pt-facts-value">${escapeHtml(el.uses)}</span></li>
      </ul>
      <p style="font-size: 0.875rem; color: var(--text-body);">${escapeHtml(el.fact)}</p>
    `;
  }

  function renderGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    // Group column headers 1..18
    for (let g = 1; g <= 18; g += 1) {
      const label = document.createElement('div');
      label.className = 'pt-group-label';
      label.textContent = `${g}`;
      label.style.gridRow = '1';
      label.style.gridColumn = `${g}`;
      gridEl.appendChild(label);
    }

    // Build lookup by period-group
    const lookup = new Map();
    ELEMENTS.forEach((el) => {
      lookup.set(`${el.period}-${el.group}`, el);
    });

    // Standard periodic grid cells for Periods 1..6, Groups 1..18
    for (let p = 1; p <= 6; p += 1) {
      for (let g = 1; g <= 18; g += 1) {
        // Respect standard periodic gaps in Periods 1, 2, 3
        if (p === 1 && g > 1 && g < 18) continue;
        if ((p === 2 || p === 3) && g > 2 && g < 13) continue;

        const el = lookup.get(`${p}-${g}`);
        if (el) {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = `pt-tile cat-${el.category}`;
          if (el.number === selectedNumber) btn.classList.add('is-selected');
          if (activeCategory !== 'all' && el.category !== activeCategory) {
            btn.classList.add('is-dimmed');
          }
          btn.style.gridRow = `${p + 1}`;
          btn.style.gridColumn = `${g}`;
          btn.setAttribute('aria-label', `${el.name}, symbol ${el.symbol}, atomic number ${el.number}`);
          btn.innerHTML = `
            <span class="pt-num">${el.number}</span>
            <span class="pt-sym">${el.symbol}</span>
            <span class="pt-name-mini">${el.name}</span>
          `;
          btn.addEventListener('click', () => {
            selectedNumber = el.number;
            renderGrid();
            renderInspector(el);
          });
          gridEl.appendChild(btn);
        } else {
          // Subtle empty frame showing true group/period spacing for omitted elements
          const empty = document.createElement('div');
          empty.className = 'pt-cell-empty';
          empty.style.gridRow = `${p + 1}`;
          empty.style.gridColumn = `${g}`;
          empty.setAttribute('aria-hidden', 'true');
          gridEl.appendChild(empty);
        }
      }
    }
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.ptFilter || 'all';
      filterBtns.forEach((b) => b.classList.toggle('is-active', b === btn));
      renderGrid();
    });
  });

  renderGrid();
  renderInspector(ELEMENTS.find((e) => e.number === selectedNumber) || ELEMENTS[0]);

  wireModalClose(modal);
  return modal;
}

/* ==========================================================================
   Reset Progress Modal & Export / Print Summary Modal
   ========================================================================== */

function ensureResetModal() {
  let modal = document.getElementById('reset-progress-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'reset-progress-modal';
  modal.className = 'modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'reset-modal-title');

  const currentLesson = getCurrentLessonId();
  const currentLessonObj = LESSONS.find((l) => l.id === currentLesson);

  modal.innerHTML = `
    <div class="modal-dialog">
      <div class="modal-header">
        <h2 id="reset-modal-title">Reset Saved Progress</h2>
        <button type="button" class="btn btn-secondary btn-sm" data-close-modal="reset-progress-modal">
          Cancel
        </button>
      </div>
      <div class="modal-body">
        <p id="reset-modal-desc">
          Clearing your saved progress removes your answers and completion badges from this browser.
          This cannot be undone.
        </p>
      </div>
      <div class="modal-footer">
        ${
          currentLessonObj
            ? `<button type="button" class="btn btn-secondary" id="confirm-reset-lesson">Reset Lesson ${currentLessonObj.number} Only</button>`
            : ''
        }
        <button type="button" class="btn btn-danger-outline" id="confirm-reset-all">Reset Entire Unit</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#confirm-reset-lesson')?.addEventListener('click', () => {
    clearProgress(currentLesson);
    closeModal(modal);
    window.location.reload();
  });

  modal.querySelector('#confirm-reset-all')?.addEventListener('click', () => {
    clearProgress(null);
    closeModal(modal);
    window.location.reload();
  });

  wireModalClose(modal);
  return modal;
}

function buildSummaryText() {
  const state = loadProgress();
  const lines = [
    'ELEMENTS AND COMPOUNDS — STUDENT SUMMARY NOTES',
    `Exported: ${new Date().toLocaleString()}`,
    '====================================================',
    '',
  ];

  LESSONS.forEach((lesson) => {
    const saved = state.lessons?.[lesson.id];
    const acts = Object.values(saved?.activities || {});
    const done = acts.filter((a) => a.completed).length;
    const total = saved?.totalActivities || 0;

    lines.push(`Lesson ${lesson.number}: ${lesson.title}`);
    lines.push(`Progress: ${done}/${total} activities completed`);
    if (acts.length === 0) {
      lines.push('  No saved responses yet.');
    } else {
      acts.forEach((act) => {
        const mark = act.completed ? '[Done]' : '[In Progress]';
        lines.push(`  ${mark} ${act.title || 'Activity'}: ${act.answerSummary || ''}`);
      });
    }
    lines.push('');
  });

  return lines.join('\n');
}

function ensureExportModal() {
  let modal = document.getElementById('export-summary-modal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'export-summary-modal';
  modal.className = 'modal-backdrop';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-labelledby', 'export-modal-title');

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-wide">
      <div class="modal-header">
        <div>
          <h2 id="export-modal-title">Print & Export Summary</h2>
          <p class="meta-line">Review your saved answers across all 7 lessons</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" data-close-modal="export-summary-modal">
          Close
        </button>
      </div>
      <div class="modal-body">
        <div class="summary-list" id="export-summary-list"></div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="download-summary-txt">Download Notes (.txt)</button>
        <button type="button" class="btn btn-primary" id="print-summary-btn">Print / Save as PDF</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#print-summary-btn')?.addEventListener('click', () => {
    closeModal(modal);
    window.print();
  });

  modal.querySelector('#download-summary-txt')?.addEventListener('click', () => {
    const content = buildSummaryText();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'elements-and-compounds-summary.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  });

  wireModalClose(modal);
  return modal;
}

function populateExportModal(modal) {
  const listEl = modal.querySelector('#export-summary-list');
  if (!listEl) return;
  const state = loadProgress();
  listEl.innerHTML = '';

  LESSONS.forEach((lesson) => {
    const saved = state.lessons?.[lesson.id];
    const acts = Object.values(saved?.activities || {});
    const done = acts.filter((a) => a.completed).length;
    const total = saved?.totalActivities || 0;

    const block = document.createElement('div');
    block.className = 'summary-lesson-block';

    const entriesHtml =
      acts.length === 0
        ? '<p class="summary-entry" style="color: var(--text-muted);">No saved answers yet.</p>'
        : acts
            .map(
              (act) =>
                `<p class="summary-entry"><strong>${escapeHtml(act.title || 'Activity')}:</strong> ${escapeHtml(act.answerSummary || 'Saved')} (${act.completed ? 'Completed' : 'In progress'})</p>`
            )
            .join('');

    block.innerHTML = `
      <div class="summary-lesson-head">
        <span>Lesson ${lesson.number}: ${escapeHtml(lesson.title)}</span>
        <span class="tabular-nums" style="font-size: 0.8125rem; color: var(--text-muted);">${done}/${total} complete</span>
      </div>
      ${entriesHtml}
    `;
    listEl.appendChild(block);
  });
}

/* ==========================================================================
   Modal Lifecycle Utilities
   ========================================================================== */

function openModal(modal) {
  lastFocusedElement = document.activeElement;
  modal.classList.add('is-open');
  const closeBtn = modal.querySelector('[data-close-modal]');
  closeBtn?.focus();
}

function closeModal(modal) {
  modal.classList.remove('is-open');
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

function wireModalClose(modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });
  modal.querySelectorAll('[data-close-modal]').forEach((btn) => {
    btn.addEventListener('click', () => closeModal(modal));
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  document.querySelectorAll('.modal-backdrop.is-open').forEach((openEl) => {
    closeModal(openEl);
  });
});

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/* ==========================================================================
   App Bootstrapping
   ========================================================================== */

export function initUnitApp() {
  const lessonId = getCurrentLessonId();
  const activityEls = Array.from(document.querySelectorAll('[data-activity]'));
  const totalActivities = activityEls.length;

  if (lessonId) {
    registerLessonActivityCount(lessonId, totalActivities);
  }

  activityEls.forEach((el) => {
    const type = el.dataset.activity;
    if (type === 'mcq') initMCQ(el, lessonId, totalActivities);
    else if (type === 'classify') initClassify(el, lessonId, totalActivities);
    else if (type === 'table') initEditableTable(el, lessonId, totalActivities);
  });

  updateLessonProgressBar(lessonId);
  renderUnitHubCards();

  // Wire Periodic Table triggers
  document.querySelectorAll('[data-open-periodic-table]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = ensurePeriodicTableModal();
      openModal(modal);
    });
  });

  // Wire Reset Progress triggers
  document.querySelectorAll('[data-reset-progress]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = ensureResetModal();
      openModal(modal);
    });
  });

  // Wire Print / Export Summary triggers
  document.querySelectorAll('[data-export-summary]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const modal = ensureExportModal();
      populateExportModal(modal);
      openModal(modal);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initUnitApp);
} else {
  initUnitApp();
}

window.UnitApp = {
  LESSONS,
  ELEMENTS,
  loadProgress,
  clearProgress,
  updateLessonProgressBar,
  renderUnitHubCards,
};
