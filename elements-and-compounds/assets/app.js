/**
 * Shared classroom interactivity, persistence, and Periodic Table engine
 * for the "Elements and Compounds" 7-lesson unit.
 */

export const STORAGE_KEY = 'elements_compounds_unit_v2';

export const LESSONS = [
  {
    id: 'lesson-1',
    number: 1,
    title: 'What is an Element?',
    href: './lesson-1.html',
    summary:
      'Define elements as pure substances of one kind of atom, explore the first 20 elements, and preview single atoms, molecules, and lattices.',
    successCriteria: [
      'Define an element.',
      'Distinguish between single atoms, molecules, and lattices (descriptive preview).',
      'Identify the names and symbols of the first 20 elements.',
    ],
  },
  {
    id: 'lesson-2',
    number: 2,
    title: 'Inside the Atom & Fundamental Forces',
    href: './lesson-2.html',
    summary:
      'Explore protons, neutrons, electrons, the 2, 8, 8, 18, 18, 32, 32 shell filling sequence (2, 8, 8, 2 for the first 20), and how the strong nuclear force and electrostatic force hold atoms together.',
    successCriteria: [
      'State the relative mass and charge of protons, neutrons, and electrons.',
      'Use the 2, 8, 8, 18, 18, 32, 32 pattern (2, 8, 8, 2 for the first 20 elements) to arrange electrons in shells.',
      'Explain how the strong nuclear force (with neutrons) and electrostatic force hold the atom together.',
      'Calculate mass number, proton number, and net charge for atoms and ions.',
    ],
  },
  {
    id: 'lesson-3',
    number: 3,
    title: 'Where Elements Come From, Abundances & Binding Energy',
    href: './lesson-3.html',
    summary:
      'Trace elements from the Big Bang to stars and supernovae, decode cosmic abundance patterns, and use the binding energy curve.',
    successCriteria: [
      'Trace the cosmic origins of elements (Big Bang, stellar fusion, supernovae/neutron star mergers).',
      'Explain why lighter elements and even-atomic-number elements are much more abundant in the universe.',
      'Use the nuclear binding energy curve to explain why both stellar fusion and nuclear fission release energy.',
    ],
  },
  {
    id: 'lesson-4',
    number: 4,
    title: 'Trends in the Periodic Table',
    href: './lesson-4.html',
    summary:
      'Link Groups and Periods to valence electrons and shells, and visualize periodic trends in mass, radius, electronegativity, and reactivity.',
    successCriteria: [
      'Identify Groups (columns = valence electrons/similar properties) and Periods (rows = number of electron shells).',
      'Describe and explain periodic trends in atomic mass, atomic radius, electronegativity, and reactivity.',
      'Predict properties of elements based on their position in the Periodic Table.',
    ],
  },
  {
    id: 'lesson-5',
    number: 5,
    title: 'Chemical Bonding & Basic Formulas',
    href: './lesson-5.html',
    summary:
      'Predict ionic, covalent, and metallic bonds from electronegativity differences, and write and fix basic chemical formulas.',
    successCriteria: [
      'Predict whether two elements will form an ionic, covalent, or metallic bond using periodic table position and electronegativity.',
      'Describe how electrons behave in ionic, covalent, and metallic bonding.',
      'Write and interpret basic chemical formulas with correct capitalization and subscripts.',
    ],
  },
  {
    id: 'lesson-6',
    number: 6,
    title: 'Macro-Scale Properties of Metals & Non-Metals',
    href: './lesson-6.html',
    summary:
      'Explain conductivity, lustre, malleability, brittleness, and melting points using atomic structure, trends, and bonding models.',
    successCriteria: [
      'Describe the macro-scale properties of metals and non-metals (conductivity, lustre, malleability/brittleness, melting point).',
      'Explain these macro-scale properties using atomic structure, periodic trends, and bonding models from Lessons 2–5.',
    ],
  },
  {
    id: 'lesson-7',
    number: 7,
    title: 'Elements, Compounds, Mixtures & Chemical Reactions',
    href: './lesson-7.html',
    summary:
      'Classify particle diagrams as elements, compounds, or mixtures, investigate Copper Sulfate reactions, and run Hydrogen and Oxygen gas tests.',
    successCriteria: [
      'Distinguish between elements, compounds, and mixtures using particle diagrams.',
      'Describe a basic chemical reaction in terms of reactants, products, and changing properties.',
      'Describe the laboratory tests for Hydrogen and Oxygen gas.',
    ],
  },
];

/**
 * Complete Periodic Table dataset: All 118 IUPAC elements (1–118)
 * Includes authentic Period/Group coordinates, 10 chemical family categories,
 * and simplified 3-class grouping (Metal, Metalloid, Non-metal).
 */
const CATEGORY_LABELS = {
  'alkali-metal': 'Alkali Metal',
  'alkaline-earth': 'Alkaline Earth Metal',
  'transition-metal': 'Transition Metal',
  lanthanide: 'Lanthanide',
  actinide: 'Actinide',
  'post-transition': 'Post-Transition Metal',
  metalloid: 'Metalloid',
  nonmetal: 'Non-metal',
  halogen: 'Halogen',
  'noble-gas': 'Noble Gas',
};

const SIMPLE_CLASS_INFO = {
  metal: {
    label: 'Metal',
    summary:
      'Metals sit on the left and centre of the Periodic Table. Most are solid at room temperature, shiny (lustrous), malleable, and good conductors of heat and electricity.',
  },
  metalloid: {
    label: 'Metalloid',
    summary:
      'Metalloids sit along the diagonal staircase between metals and non-metals. They share properties of both—such as looking shiny while acting as semiconductors.',
  },
  nonmetal: {
    label: 'Non-metal',
    summary:
      'Non-metals sit on the upper right (plus Hydrogen at top left). They are generally poor conductors of heat and electricity, and many are gases or brittle solids.',
  },
};

function getSimpleClass(category) {
  if (category === 'metalloid') return 'metalloid';
  if (category === 'nonmetal' || category === 'halogen' || category === 'noble-gas') {
    return 'nonmetal';
  }
  return 'metal';
}

// Tuple format: [number, symbol, name, mass, period, group, category, state, uses, fact, fCol?]
const RAW_ELEMENTS_118 = [
  // Period 1
  [1, 'H', 'Hydrogen', '1.008', 1, 1, 'nonmetal', 'Gas', 'Rocket fuel, ammonia production', 'Lightest and most abundant element in the universe.'],
  [2, 'He', 'Helium', '4.003', 1, 18, 'noble-gas', 'Gas', 'Weather balloons, MRI cooling', 'Unreactive gas with a full outer electron shell.'],
  // Period 2
  [3, 'Li', 'Lithium', '6.94', 2, 1, 'alkali-metal', 'Solid', 'Rechargeable batteries', 'Soft enough to cut with a butter knife and floats on water.'],
  [4, 'Be', 'Beryllium', '9.012', 2, 2, 'alkaline-earth', 'Solid', 'Aerospace alloys, X-ray windows', 'Strong yet very lightweight metal.'],
  [5, 'B', 'Boron', '10.81', 2, 13, 'metalloid', 'Solid', 'Borosilicate lab glassware', 'Helps Pyrex glassware resist sudden heat changes.'],
  [6, 'C', 'Carbon', '12.01', 2, 14, 'nonmetal', 'Solid', 'Pencil graphite, diamonds, fuels', 'Forms the backbone of all organic molecules.'],
  [7, 'N', 'Nitrogen', '14.01', 2, 15, 'nonmetal', 'Gas', 'Makes up 78% of Earth’s air, fertilisers', 'Essential element in proteins and DNA.'],
  [8, 'O', 'Oxygen', '16.00', 2, 16, 'nonmetal', 'Gas', 'Respiration, combustion, water (H₂O)', 'Makes up about 21% of the air we breathe.'],
  [9, 'F', 'Fluorine', '19.00', 2, 17, 'halogen', 'Gas', 'Toothpaste fluoride compounds', 'The most chemically reactive non-metal.'],
  [10, 'Ne', 'Neon', '20.18', 2, 18, 'noble-gas', 'Gas', 'Glowing glass signs, lasers', 'Glows bright reddish-orange in high-voltage tubes.'],
  // Period 3
  [11, 'Na', 'Sodium', '22.99', 3, 1, 'alkali-metal', 'Solid', 'Table salt (NaCl), street lamps', 'Symbol Na comes from the Latin word "natrium".'],
  [12, 'Mg', 'Magnesium', '24.31', 3, 2, 'alkaline-earth', 'Solid', 'Flares, lightweight alloys', 'Burns with a dazzling bright white flame in oxygen.'],
  [13, 'Al', 'Aluminium', '26.98', 3, 13, 'post-transition', 'Solid', 'Drink cans, foil, aircraft bodies', 'Most abundant metal in Earth’s crust.'],
  [14, 'Si', 'Silicon', '28.09', 3, 14, 'metalloid', 'Solid', 'Computer microchips, glass, sand', 'Semiconductor that powers modern electronics.'],
  [15, 'P', 'Phosphorus', '30.97', 3, 15, 'nonmetal', 'Solid', 'Matchboxes, plant fertilisers', 'Found in bones, teeth, and cell energy molecules.'],
  [16, 'S', 'Sulfur', '32.06', 3, 16, 'nonmetal', 'Solid', 'Vulcanising rubber, sulfuric acid', 'Bright yellow brittle solid found near volcanoes.'],
  [17, 'Cl', 'Chlorine', '35.45', 3, 17, 'halogen', 'Gas', 'Water purification, table salt (NaCl)', 'Pale green toxic gas that forms safe salt when bonded to sodium.'],
  [18, 'Ar', 'Argon', '39.95', 3, 18, 'noble-gas', 'Gas', 'Light bulbs, welding shields', 'Third most common gas in Earth’s atmosphere (~0.93%).'],
  // Period 4
  [19, 'K', 'Potassium', '39.10', 4, 1, 'alkali-metal', 'Solid', 'Fertilisers, essential nerve mineral', 'Symbol K comes from the Latin word "kalium".'],
  [20, 'Ca', 'Calcium', '40.08', 4, 2, 'alkaline-earth', 'Solid', 'Bones, shells, limestone (CaCO₃)', 'Gives chalk, marble, and seashells their structure.'],
  [21, 'Sc', 'Scandium', '44.96', 4, 3, 'transition-metal', 'Solid', 'Lightweight sports frames, aerospace alloys', 'Silvery-white metal named after Scandinavia.'],
  [22, 'Ti', 'Titanium', '47.87', 4, 4, 'transition-metal', 'Solid', 'Medical implants, aircraft engines, sunscreens', 'As strong as steel yet roughly 45% lighter and corrosion-resistant.'],
  [23, 'V', 'Vanadium', '50.94', 4, 5, 'transition-metal', 'Solid', 'High-strength tool steel, springs', 'Forms brightly coloured compounds in different oxidation states.'],
  [24, 'Cr', 'Chromium', '52.00', 4, 6, 'transition-metal', 'Solid', 'Stainless steel, chrome plating', 'Gives rubies their red colour and emeralds their green colour.'],
  [25, 'Mn', 'Manganese', '54.94', 4, 7, 'transition-metal', 'Solid', 'Steelmaking, alkaline batteries', 'Essential trace nutrient for plants and animals.'],
  [26, 'Fe', 'Iron', '55.85', 4, 8, 'transition-metal', 'Solid', 'Steel bridges, magnets, haemoglobin', 'Symbol Fe comes from Latin "ferrum"; rusts in air and water.'],
  [27, 'Co', 'Cobalt', '58.93', 4, 9, 'transition-metal', 'Solid', 'Rechargeable battery cathodes, blue glass', 'Produces deep cobalt-blue pigments in ceramics and glass.'],
  [28, 'Ni', 'Nickel', '58.69', 4, 10, 'transition-metal', 'Solid', 'Coins, stainless steel, batteries', 'Magnetic silvery metal resistant to corrosion.'],
  [29, 'Cu', 'Copper', '63.55', 4, 11, 'transition-metal', 'Solid', 'Electrical wiring, plumbing pipes', 'Symbol Cu comes from Latin "cuprum"; excellent conductor.'],
  [30, 'Zn', 'Zinc', '65.38', 4, 12, 'transition-metal', 'Solid', 'Galvanising steel, brass alloy', 'Protects iron from rusting when used as a coating.'],
  [31, 'Ga', 'Gallium', '69.72', 4, 13, 'post-transition', 'Solid', 'LEDs, solar panels, thermometers', 'Solid at 20 °C, but melts in your hand at 29.8 °C.'],
  [32, 'Ge', 'Germanium', '72.63', 4, 14, 'metalloid', 'Solid', 'Fibre optics, infrared lenses, electronics', 'Key semiconductor used in early transistors.'],
  [33, 'As', 'Arsenic', '74.92', 4, 15, 'metalloid', 'Solid', 'Semiconductor wafers, wood preservatives', 'Well-known toxic metalloid found in minerals.'],
  [34, 'Se', 'Selenium', '78.97', 4, 16, 'nonmetal', 'Solid', 'Photocopiers, solar cells, glass tinting', 'Conducts electricity better when light shines on it.'],
  [35, 'Br', 'Bromine', '79.90', 4, 17, 'halogen', 'Liquid', 'Flame retardants, water treatment', 'The only non-metal element that is a liquid at room temperature.'],
  [36, 'Kr', 'Krypton', '83.80', 4, 18, 'noble-gas', 'Gas', 'High-speed photography flashes, lasers', 'Unreactive gas whose name comes from Greek "kryptos" (hidden).'],
  // Period 5
  [37, 'Rb', 'Rubidium', '85.47', 5, 1, 'alkali-metal', 'Solid', 'Atomic clocks, research vacuum tubes', 'Reacts violently with water and ignites in air.'],
  [38, 'Sr', 'Strontium', '87.62', 5, 2, 'alkaline-earth', 'Solid', 'Red fireworks and emergency flares', 'Burns with a brilliant crimson-red flame.'],
  [39, 'Y', 'Yttrium', '88.91', 5, 3, 'transition-metal', 'Solid', 'LED phosphors, camera lenses, lasers', 'Named after the Swedish village of Ytterby.'],
  [40, 'Zr', 'Zirconium', '91.22', 5, 4, 'transition-metal', 'Solid', 'Nuclear reactor cladding, ceramic knives', 'Resistant to extreme heat and chemical corrosion.'],
  [41, 'Nb', 'Niobium', '92.91', 5, 5, 'transition-metal', 'Solid', 'Superconducting MRI magnets, jet alloys', 'Strengthens steel alloys used in gas pipelines.'],
  [42, 'Mo', 'Molybdenum', '95.95', 5, 6, 'transition-metal', 'Solid', 'High-temperature steel alloys, lubricants', 'Very high melting point (2,623 °C).'],
  [43, 'Tc', 'Technetium', '[98]', 5, 7, 'transition-metal', 'Solid', 'Hospital medical imaging tracers', 'Lightest element with no stable isotopes; first artificially made element.'],
  [44, 'Ru', 'Ruthenium', '101.07', 5, 8, 'transition-metal', 'Solid', 'Electrical contacts, chemical catalysts', 'Hard silvery metal in the platinum group.'],
  [45, 'Rh', 'Rhodium', '102.91', 5, 9, 'transition-metal', 'Solid', 'Catalytic converters, white gold plating', 'Highly reflective and extremely resistant to tarnishing.'],
  [46, 'Pd', 'Palladium', '106.42', 5, 10, 'transition-metal', 'Solid', 'Catalytic converters, electronics, dentistry', 'Can absorb up to 900 times its own volume of hydrogen gas.'],
  [47, 'Ag', 'Silver', '107.87', 5, 11, 'transition-metal', 'Solid', 'Jewellery, mirrors, electronics', 'Symbol Ag comes from Latin "argentum"; highest electrical conductivity.'],
  [48, 'Cd', 'Cadmium', '112.41', 5, 12, 'transition-metal', 'Solid', 'Nickel-cadmium batteries, pigments', 'Soft bluish metal that is toxic and now strictly regulated.'],
  [49, 'In', 'Indium', '114.82', 5, 13, 'post-transition', 'Solid', 'Touchscreen transparent coatings, solders', 'Makes a high-pitched "cry" sound when a pure bar is bent.'],
  [50, 'Sn', 'Tin', '118.71', 5, 14, 'post-transition', 'Solid', 'Solder, bronze alloy, food cans', 'Symbol Sn comes from Latin "stannum".'],
  [51, 'Sb', 'Antimony', '121.76', 5, 15, 'metalloid', 'Solid', 'Flame-retardant plastics, lead batteries', 'Symbol Sb comes from Latin "stibium".'],
  [52, 'Te', 'Tellurium', '127.60', 5, 16, 'metalloid', 'Solid', 'Cadmium-telluride solar panels, alloys', 'Silvery metalloid named after Earth ("tellus").'],
  [53, 'I', 'Iodine', '126.90', 5, 17, 'halogen', 'Solid', 'Antiseptic solutions, iodised table salt', 'Dark purple-black crystals that sublime into violet vapour.'],
  [54, 'Xe', 'Xenon', '131.29', 5, 18, 'noble-gas', 'Gas', 'Ion spacecraft thrusters, bright car headlights', 'Heavy noble gas capable of forming compounds with fluorine.'],
  // Period 6 (Main + Lanthanides 57–71)
  [55, 'Cs', 'Cesium', '132.91', 6, 1, 'alkali-metal', 'Solid', 'Ultra-accurate atomic clocks', 'Soft golden metal that melts just above room temperature (28.5 °C).'],
  [56, 'Ba', 'Barium', '137.33', 6, 2, 'alkaline-earth', 'Solid', 'Medical X-ray contrast drinks, green fireworks', 'Burns with a bright apple-green flame.'],
  [57, 'La', 'Lanthanum', '138.91', 6, 3, 'lanthanide', 'Solid', 'Hybrid car batteries, camera lenses', 'First element of the lanthanide series.', 4],
  [58, 'Ce', 'Cerium', '140.12', 6, 3, 'lanthanide', 'Solid', 'Lighter flints, glass polishing powder', 'Most abundant of all rare-earth metals.', 5],
  [59, 'Pr', 'Praseodymium', '140.91', 6, 3, 'lanthanide', 'Solid', 'Welder’s goggles, strong aircraft magnets', 'Gives glass a bright yellow-green tint.', 6],
  [60, 'Nd', 'Neodymium', '144.24', 6, 3, 'lanthanide', 'Solid', 'Ultra-strong headphones and wind-turbine magnets', 'Creates the strongest permanent magnets known.', 7],
  [61, 'Pm', 'Promethium', '[145]', 6, 3, 'lanthanide', 'Solid', 'Miniature nuclear batteries, luminous paint', 'The only radioactive lanthanide element.', 8],
  [62, 'Sm', 'Samarium', '150.36', 6, 3, 'lanthanide', 'Solid', 'High-temperature magnets, guitar pickups', 'Magnets stay strong even at very high temperatures.', 9],
  [63, 'Eu', 'Europium', '151.96', 6, 3, 'lanthanide', 'Solid', 'Anti-counterfeit banknote ink, LED phosphors', 'Glows bright red or blue under ultraviolet light.', 10],
  [64, 'Gd', 'Gadolinium', '157.25', 6, 3, 'lanthanide', 'Solid', 'MRI medical scan contrast agents', 'Strongly magnetic at low temperatures.', 11],
  [65, 'Tb', 'Terbium', '158.93', 6, 3, 'lanthanide', 'Solid', 'Green screen phosphors, solid-state speakers', 'One of four elements named after Ytterby, Sweden.', 12],
  [66, 'Dy', 'Dysprosium', '162.50', 6, 3, 'lanthanide', 'Solid', 'Electric vehicle motor magnets', 'Helps neodymium magnets keep working when hot.', 13],
  [67, 'Ho', 'Holmium', '164.93', 6, 3, 'lanthanide', 'Solid', 'Medical lasers, magnetic pole concentrators', 'Has the highest magnetic strength of any natural element.', 14],
  [68, 'Er', 'Erbium', '167.26', 6, 3, 'lanthanide', 'Solid', 'Undersea fibre-optic internet amplifiers', 'Turns glass and crystals a delicate pink colour.', 15],
  [69, 'Tm', 'Thulium', '168.93', 6, 3, 'lanthanide', 'Solid', 'Portable X-ray machines, surgical lasers', 'Least abundant non-radioactive rare-earth metal.', 16],
  [70, 'Yb', 'Ytterbium', '173.05', 6, 3, 'lanthanide', 'Solid', 'Optical lattice clocks, industrial lasers', 'Used in experimental ultra-precise atomic clocks.', 17],
  [71, 'Lu', 'Lutetium', '174.97', 6, 3, 'lanthanide', 'Solid', 'PET medical scanner detectors, oil refining', 'Densest and hardest of the lanthanide elements.', 18],
  [72, 'Hf', 'Hafnium', '178.49', 6, 4, 'transition-metal', 'Solid', 'Computer microchip gates, nuclear control rods', 'Absorbs neutrons effectively without corroding.'],
  [73, 'Ta', 'Tantalum', '180.95', 6, 5, 'transition-metal', 'Solid', 'Smartphone capacitors, surgical instruments', 'Extremely resistant to acid corrosion.'],
  [74, 'W', 'Tungsten', '183.84', 6, 6, 'transition-metal', 'Solid', 'Light bulb filaments, drill bits', 'Symbol W comes from "wolfram"; highest melting point of any pure metal (3,422 °C).'],
  [75, 'Re', 'Rhenium', '186.21', 6, 7, 'transition-metal', 'Solid', 'Jet engine turbine blades, catalysts', 'One of the rarest elements in Earth’s crust.'],
  [76, 'Os', 'Osmium', '190.23', 6, 8, 'transition-metal', 'Solid', 'Fountain pen nibs, electrical contacts', 'Densest naturally occurring element on Earth.'],
  [77, 'Ir', 'Iridium', '192.22', 6, 9, 'transition-metal', 'Solid', 'Spark plugs, deep-sea cable repeaters', 'Rare in Earth’s crust, but common in meteorites from the dinosaur-extinction boundary.'],
  [78, 'Pt', 'Platinum', '195.08', 6, 10, 'transition-metal', 'Solid', 'Catalytic converters, jewellery, lab electrodes', 'Unreactive precious metal that resists corrosion.'],
  [79, 'Au', 'Gold', '196.97', 6, 11, 'transition-metal', 'Solid', 'Jewellery, circuit contacts', 'Symbol Au comes from Latin "aurum"; never tarnishes in air.'],
  [80, 'Hg', 'Mercury', '200.59', 6, 12, 'transition-metal', 'Liquid', 'Scientific barometers, older thermometers', 'Symbol Hg comes from "hydrargyrum"; the only metal that is liquid at room temperature.'],
  [81, 'Tl', 'Thallium', '204.38', 6, 13, 'post-transition', 'Solid', 'Infrared detectors, medical heart scans', 'Soft grey metal named from Greek "thallos" (green shoot) for its green flame spectrum.'],
  [82, 'Pb', 'Lead', '207.2', 6, 14, 'post-transition', 'Solid', 'Radiation shielding, car batteries', 'Symbol Pb comes from Latin "plumbum" (origin of "plumbing").'],
  [83, 'Bi', 'Bismuth', '208.98', 6, 15, 'post-transition', 'Solid', 'Stomach medicine, lead-free solder', 'Forms iridescent rainbow hopper crystals when melted and cooled.'],
  [84, 'Po', 'Polonium', '[209]', 6, 16, 'post-transition', 'Solid', 'Anti-static industrial brushes, space heaters', 'Discovered by Marie and Pierre Curie in 1898 and named after Poland.'],
  [85, 'At', 'Astatine', '[210]', 6, 17, 'metalloid', 'Solid', 'Targeted cancer radiotherapy research', 'Rarest naturally occurring element in Earth’s crust.'],
  [86, 'Rn', 'Radon', '[222]', 6, 18, 'noble-gas', 'Gas', 'Geological earthquake monitoring', 'Colourless, dense radioactive gas formed from radium decay.'],
  // Period 7 (Main + Actinides 89–103)
  [87, 'Fr', 'Francium', '[223]', 7, 1, 'alkali-metal', 'Solid', 'Atomic structure physics research', 'Extremely rare and unstable alkali metal named after France.'],
  [88, 'Ra', 'Radium', '[226]', 7, 2, 'alkaline-earth', 'Solid', 'Historical research, targeted radiation therapy', 'Glows faintly blue in the dark due to radioactivity.'],
  [89, 'Ac', 'Actinium', '[227]', 7, 3, 'actinide', 'Solid', 'Medical cancer immunotherapy research', 'First element of the actinide series.', 4],
  [90, 'Th', 'Thorium', '232.04', 7, 3, 'actinide', 'Solid', 'Gas lantern mantles, next-generation reactor research', 'Weakly radioactive metal named after Thor, Norse god of thunder.', 5],
  [91, 'Pa', 'Protactinium', '231.04', 7, 3, 'actinide', 'Solid', 'Ocean sediment dating, scientific research', 'Rare radioactive metal found in uranium ores.', 6],
  [92, 'U', 'Uranium', '238.03', 7, 3, 'actinide', 'Solid', 'Nuclear power plant fuel, geological dating', 'Heaviest naturally abundant element used to generate nuclear electricity.', 7],
  [93, 'Np', 'Neptunium', '[237]', 7, 3, 'actinide', 'Solid', 'Neutron detection instruments, plutonium production', 'First synthetic transuranium element, named after Neptune.', 8],
  [94, 'Pu', 'Plutonium', '[244]', 7, 3, 'actinide', 'Solid', 'Deep-space probe power batteries (RTGs)', 'Powers spacecraft like Voyager and the Perseverance Mars rover.', 9],
  [95, 'Am', 'Americium', '[243]', 7, 3, 'actinide', 'Solid', 'Household ionisation smoke detectors', 'Tiny safe amounts inside smoke alarms help detect smoke particles.', 10],
  [96, 'Cm', 'Curium', '[247]', 7, 3, 'actinide', 'Solid', 'Mars rover rock-analysis X-ray spectrometers', 'Named in honour of Marie and Pierre Curie.', 11],
  [97, 'Bk', 'Berkelium', '[247]', 7, 3, 'actinide', 'Solid', 'Synthesising heavier elements in labs', 'Named after Berkeley, California, where it was first made.', 12],
  [98, 'Cf', 'Californium', '[251]', 7, 3, 'actinide', 'Solid', 'Airport scanners, reactor startup neutron sources', 'Strong neutron emitter used to detect metal fatigue in aircraft.', 13],
  [99, 'Es', 'Einsteinium', '[252]', 7, 3, 'actinide', 'Solid', 'Heavy-element nuclear physics research', 'Named in honour of physicist Albert Einstein.', 14],
  [100, 'Fm', 'Fermium', '[257]', 7, 3, 'actinide', 'Solid', 'Nuclear chemistry research', 'Heaviest element that can be formed by neutron bombardment.', 15],
  [101, 'Md', 'Mendelevium', '[258]', 7, 3, 'actinide', 'Solid', 'Single-atom chemistry research', 'Named after Dmitri Mendeleev, creator of the Periodic Table.', 16],
  [102, 'No', 'Nobelium', '[259]', 7, 3, 'actinide', 'Solid', 'Nuclear physics research', 'Named after Alfred Nobel, founder of the Nobel Prizes.', 17],
  [103, 'Lr', 'Lawrencium', '[266]', 7, 3, 'actinide', 'Solid', 'Atomic physics research', 'Final member of the actinide series.', 18],
  [104, 'Rf', 'Rutherfordium', '[267]', 7, 4, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Named after Ernest Rutherford, discoverer of the atomic nucleus.'],
  [105, 'Db', 'Dubnium', '[268]', 7, 5, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Named after the Joint Institute for Nuclear Research in Dubna.'],
  [106, 'Sg', 'Seaborgium', '[269]', 7, 6, 'transition-metal', 'Solid (predicted)', 'Nuclear chemistry research', 'Named after chemist Glenn Seaborg while he was still alive.'],
  [107, 'Bh', 'Bohrium', '[270]', 7, 7, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Named after Danish atomic physicist Niels Bohr.'],
  [108, 'Hs', 'Hassium', '[277]', 7, 8, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Named after the German state of Hesse, where it was synthesised.'],
  [109, 'Mt', 'Meitnerium', '[278]', 7, 9, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Honours physicist Lise Meitner, co-discoverer of nuclear fission.'],
  [110, 'Ds', 'Darmstadtium', '[281]', 7, 10, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Named after Darmstadt, Germany, where it was discovered in 1994.'],
  [111, 'Rg', 'Roentgenium', '[282]', 7, 11, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Named after Wilhelm Röntgen, discoverer of X-rays.'],
  [112, 'Cn', 'Copernicium', '[285]', 7, 12, 'transition-metal', 'Solid (predicted)', 'Nuclear physics research', 'Named after astronomer Nicolaus Copernicus.'],
  [113, 'Nh', 'Nihonium', '[286]', 7, 13, 'post-transition', 'Solid (predicted)', 'Nuclear physics research', 'First element discovered in Asia; named from "Nihon" (Japan).'],
  [114, 'Fl', 'Flerovium', '[289]', 7, 14, 'post-transition', 'Solid (predicted)', 'Nuclear physics research', 'Superheavy element made only a few atoms at a time in particle accelerators.'],
  [115, 'Mc', 'Moscovium', '[290]', 7, 15, 'post-transition', 'Solid (predicted)', 'Nuclear physics research', 'Short-lived synthetic element named after the Moscow region.'],
  [116, 'Lv', 'Livermorium', '[293]', 7, 16, 'post-transition', 'Solid (predicted)', 'Nuclear physics research', 'Named after Lawrence Livermore National Laboratory.'],
  [117, 'Ts', 'Tennessine', '[294]', 7, 17, 'halogen', 'Solid (predicted)', 'Nuclear physics research', 'Second-heaviest known element, named after Tennessee.'],
  [118, 'Og', 'Oganesson', '[294]', 7, 18, 'noble-gas', 'Solid (predicted)', 'Nuclear physics research', 'Heaviest known element (118 protons), named after physicist Yuri Oganessian.'],
];

// Scientific reference values: [electronegativity (Pauling), atomicRadiusPm, shells[], cosmicAbundance (Si = 1e6)]
const ELEMENT_SCIENCE_DATA = {
  1: [2.20, 53, [1], 2.43e10],
  2: [null, 31, [2], 2.34e9],
  3: [0.98, 167, [2, 1], 55.5],
  4: [1.57, 112, [2, 2], 0.60],
  5: [2.04, 87, [2, 3], 17.3],
  6: [2.55, 67, [2, 4], 7.19e6],
  7: [3.04, 56, [2, 5], 2.12e6],
  8: [3.44, 48, [2, 6], 1.41e7],
  9: [3.98, 42, [2, 7], 804],
  10: [null, 38, [2, 8], 3.29e6],
  11: [0.93, 190, [2, 8, 1], 5.77e4],
  12: [1.31, 145, [2, 8, 2], 1.03e6],
  13: [1.61, 118, [2, 8, 3], 8.46e4],
  14: [1.90, 111, [2, 8, 4], 1.00e6],
  15: [2.19, 98, [2, 8, 5], 8.30e3],
  16: [2.58, 88, [2, 8, 6], 4.21e5],
  17: [3.16, 79, [2, 8, 7], 5.17e3],
  18: [null, 71, [2, 8, 8], 9.27e4],
  19: [0.82, 243, [2, 8, 8, 1], 3.76e3],
  20: [1.00, 194, [2, 8, 8, 2], 6.04e4],
  21: [1.36, 184, [2, 8, 9, 2], 34.4],
  22: [1.54, 176, [2, 8, 10, 2], 2.47e3],
  23: [1.63, 171, [2, 8, 11, 2], 286],
  24: [1.66, 166, [2, 8, 13, 1], 1.31e4],
  25: [1.55, 161, [2, 8, 13, 2], 9.22e3],
  26: [1.83, 156, [2, 8, 14, 2], 8.48e5],
  27: [1.88, 152, [2, 8, 15, 2], 2.35e3],
  28: [1.91, 149, [2, 8, 16, 2], 4.90e4],
  29: [1.90, 145, [2, 8, 18, 1], 541],
  30: [1.65, 142, [2, 8, 18, 2], 1.30e3],
  35: [2.96, 94, [2, 8, 18, 7], null],
  36: [null, 88, [2, 8, 18, 8], null],
  37: [0.82, 265, [2, 8, 18, 8, 1], null],
  47: [1.93, 165, [2, 8, 18, 18, 1], null],
  53: [2.66, 115, [2, 8, 18, 18, 7], null],
  54: [null, 108, [2, 8, 18, 18, 8], null],
  55: [0.79, 298, [2, 8, 18, 18, 8, 1], null],
  79: [2.54, 174, [2, 8, 18, 32, 18, 1], null],
  92: [1.38, 175, [2, 8, 18, 32, 21, 9, 2], null],
};

export const ELEMENTS = RAW_ELEMENTS_118.map(
  ([number, symbol, name, mass, period, group, category, state, uses, fact, fCol = null]) => {
    const simpleClass = getSimpleClass(category);
    const sci = ELEMENT_SCIENCE_DATA[number] || [null, null, null, null];
    return {
      number,
      symbol,
      name,
      mass,
      period,
      group,
      category,
      categoryLabel: CATEGORY_LABELS[category] || category,
      simpleClass,
      simpleLabel: SIMPLE_CLASS_INFO[simpleClass].label,
      state,
      uses,
      fact,
      fCol,
      electronegativity: sci[0],
      radiusPm: sci[1],
      shells: sci[2],
      cosmicAbundance: sci[3],
    };
  }
);

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

  // Sync activity completion badges on bottom numbered slide buttons
  document.querySelectorAll('.slide-num-btn[data-slide-idx]').forEach((btn) => {
    const idx = Number.parseInt(btn.dataset.slideIdx || '-1', 10);
    const slide = document.querySelectorAll('.slide')[idx];
    const actId = slide?.dataset?.activityId || slide?.querySelector('[data-activity]')?.dataset?.activityId;
    if (actId) {
      btn.classList.toggle('is-activity-done', Boolean(lessonState.activities?.[actId]?.completed));
    }
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
   Interactive Periodic Table Modal (All 118 Elements + Detailed / Simplified View)
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

  const detailedCategories = [
    { id: 'all', label: 'All Elements (118)' },
    { id: 'alkali-metal', label: 'Alkali Metals' },
    { id: 'alkaline-earth', label: 'Alkaline Earth' },
    { id: 'transition-metal', label: 'Transition Metals' },
    { id: 'lanthanide', label: 'Lanthanides' },
    { id: 'actinide', label: 'Actinides' },
    { id: 'post-transition', label: 'Post-Transition' },
    { id: 'metalloid', label: 'Metalloids' },
    { id: 'nonmetal', label: 'Non-metals' },
    { id: 'halogen', label: 'Halogens' },
    { id: 'noble-gas', label: 'Noble Gases' },
  ];

  const simplifiedCategories = [
    { id: 'all', label: 'All Elements (118)', swatch: '' },
    { id: 'metal', label: 'Metals (92)', swatch: 'class-metal' },
    { id: 'metalloid', label: 'Metalloids (7)', swatch: 'class-metalloid' },
    { id: 'nonmetal', label: 'Non-metals (19)', swatch: 'class-nonmetal' },
  ];

  modal.innerHTML = `
    <div class="modal-dialog modal-dialog-wide">
      <div class="modal-header">
        <div>
          <h2 id="pt-modal-title">Interactive Periodic Table</h2>
          <p class="meta-line" id="pt-modal-subtitle">All 118 elements · Detailed view with families, atomic mass, state, and uses</p>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" data-close-modal="periodic-table-modal" aria-label="Close Periodic Table">
          Close
        </button>
      </div>
      <div class="modal-body">
        <div class="pt-toolbar">
          <div class="pt-toolbar-top">
            <div class="pt-view-switch" role="group" aria-label="Periodic table display mode">
              <button type="button" class="pt-view-btn is-active" data-pt-view="detailed" aria-pressed="true">
                Detailed View
              </button>
              <button type="button" class="pt-view-btn" data-pt-view="simplified" aria-pressed="false">
                Simplified (Metals / Metalloids / Non-metals)
              </button>
            </div>
          </div>
          <div class="pt-filter-bar" id="pt-filter-bar" role="group" aria-label="Filter elements"></div>
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
  const filterBarEl = modal.querySelector('#pt-filter-bar');
  const subtitleEl = modal.querySelector('#pt-modal-subtitle');
  const viewBtns = Array.from(modal.querySelectorAll('[data-pt-view]'));

  let viewMode = 'detailed';
  let activeFilter = 'all';
  let selectedNumber = 6; // Default focus: Carbon

  function getSelectedElement() {
    return ELEMENTS.find((e) => e.number === selectedNumber) || ELEMENTS[0];
  }

  function renderInspector(el) {
    if (!el || !inspectorEl) return;

    const locationText = el.fCol
      ? el.category === 'lanthanide'
        ? 'Period 6 · Lanthanide series'
        : 'Period 7 · Actinide series'
      : `Period ${el.period}, Group ${el.group}`;

    if (viewMode === 'simplified') {
      const simpleInfo = SIMPLE_CLASS_INFO[el.simpleClass];
      inspectorEl.innerHTML = `
        <div class="pt-inspector-head">
          <div class="pt-inspector-badge class-${el.simpleClass}">
            <span class="pt-num">${el.number}</span>
            <span class="pt-sym">${el.symbol}</span>
          </div>
          <div>
            <h3>${escapeHtml(el.name)}</h3>
            <p class="meta-line">${escapeHtml(el.simpleLabel)} · ${escapeHtml(locationText)}</p>
          </div>
        </div>
        <ul class="pt-facts-list">
          <li><span class="pt-facts-label">Classification</span><span class="pt-facts-value">${escapeHtml(el.simpleLabel)}</span></li>
          <li><span class="pt-facts-label">Atomic Number</span><span class="pt-facts-value tabular-nums">${el.number}</span></li>
          <li><span class="pt-facts-label">State at 20 °C</span><span class="pt-facts-value">${escapeHtml(el.state)}</span></li>
        </ul>
        <p style="font-size: 0.875rem; color: var(--text-body);">${escapeHtml(simpleInfo.summary)}</p>
      `;
      return;
    }

    inspectorEl.innerHTML = `
      <div class="pt-inspector-head">
        <div class="pt-inspector-badge cat-${el.category}">
          <span class="pt-num">${el.number}</span>
          <span class="pt-sym">${el.symbol}</span>
        </div>
        <div>
          <h3>${escapeHtml(el.name)}</h3>
          <p class="meta-line">${escapeHtml(el.categoryLabel)} · ${escapeHtml(locationText)}</p>
        </div>
      </div>
      <ul class="pt-facts-list">
        <li><span class="pt-facts-label">Atomic Number</span><span class="pt-facts-value tabular-nums">${el.number}</span></li>
        <li><span class="pt-facts-label">Relative Atomic Mass</span><span class="pt-facts-value tabular-nums">${escapeHtml(el.mass)}</span></li>
        <li><span class="pt-facts-label">State at 20 °C</span><span class="pt-facts-value">${escapeHtml(el.state)}</span></li>
        <li><span class="pt-facts-label">Common Uses</span><span class="pt-facts-value">${escapeHtml(el.uses)}</span></li>
      </ul>
      <p style="font-size: 0.875rem; color: var(--text-body);">${escapeHtml(el.fact)}</p>
    `;
  }

  function renderFilterBar() {
    if (!filterBarEl) return;
    const list = viewMode === 'simplified' ? simplifiedCategories : detailedCategories;
    filterBarEl.innerHTML = '';

    list.forEach((item) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `pt-filter-btn ${activeFilter === item.id ? 'is-active' : ''}`;
      btn.dataset.ptFilter = item.id;
      if (item.swatch) {
        btn.innerHTML = `<span class="pt-swatch ${item.swatch}" style="width: 10px; height: 10px; margin-right: 5px; vertical-align: -1px;" aria-hidden="true"></span>${escapeHtml(item.label)}`;
      } else {
        btn.textContent = item.label;
      }
      btn.addEventListener('click', () => {
        activeFilter = item.id;
        renderFilterBar();
        renderGrid();
      });
      filterBarEl.appendChild(btn);
    });
  }

  function createTileButton(el, gridRow, gridCol) {
    const colorClass = viewMode === 'simplified' ? `class-${el.simpleClass}` : `cat-${el.category}`;
    const filterKey = viewMode === 'simplified' ? el.simpleClass : el.category;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `pt-tile ${colorClass}`;
    if (el.number === selectedNumber) btn.classList.add('is-selected');
    if (activeFilter !== 'all' && filterKey !== activeFilter) {
      btn.classList.add('is-dimmed');
    }
    btn.style.gridRow = `${gridRow}`;
    btn.style.gridColumn = `${gridCol}`;
    btn.setAttribute(
      'aria-label',
      `${el.name}, symbol ${el.symbol}, atomic number ${el.number}, ${viewMode === 'simplified' ? el.simpleLabel : el.categoryLabel}`
    );
    btn.innerHTML = `
      <span class="pt-num">${el.number}</span>
      <span class="pt-sym">${el.symbol}</span>
      <span class="pt-name-mini">${escapeHtml(el.name)}</span>
    `;
    btn.addEventListener('click', () => {
      selectedNumber = el.number;
      renderGrid();
      renderInspector(el);
    });
    return btn;
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

    // Main block lookup by period-group (excludes f-block elements placed below)
    const mainLookup = new Map();
    const fBlockElements = [];
    ELEMENTS.forEach((el) => {
      if (el.fCol) {
        fBlockElements.push(el);
      } else {
        mainLookup.set(`${el.period}-${el.group}`, el);
      }
    });

    // Render Periods 1..7, Groups 1..18
    for (let p = 1; p <= 7; p += 1) {
      for (let g = 1; g <= 18; g += 1) {
        if (p === 1 && g > 1 && g < 18) continue;
        if ((p === 2 || p === 3) && g > 2 && g < 13) continue;

        if ((p === 6 || p === 7) && g === 3) {
          const isLanthanide = p === 6;
          const marker = document.createElement('button');
          marker.type = 'button';
          marker.className = 'pt-fblock-marker';
          marker.style.gridRow = `${p + 1}`;
          marker.style.gridColumn = '3';
          marker.innerHTML = isLanthanide
            ? '<span>57–71</span><span>La–Lu</span>'
            : '<span>89–103</span><span>Ac–Lr</span>';
          marker.title = isLanthanide ? 'Jump to Lanthanides (57–71)' : 'Jump to Actinides (89–103)';
          marker.addEventListener('click', () => {
            selectedNumber = isLanthanide ? 57 : 89;
            if (viewMode === 'detailed') {
              activeFilter = isLanthanide ? 'lanthanide' : 'actinide';
              renderFilterBar();
            }
            renderGrid();
            renderInspector(getSelectedElement());
          });
          gridEl.appendChild(marker);
          continue;
        }

        const el = mainLookup.get(`${p}-${g}`);
        if (el) {
          gridEl.appendChild(createTileButton(el, p + 1, g));
        }
      }
    }

    // f-block series labels (Rows 10 and 11, spanning Cols 1–3)
    const lanLabel = document.createElement('div');
    lanLabel.className = 'pt-fblock-label';
    lanLabel.style.gridRow = '10';
    lanLabel.style.gridColumn = '1 / span 3';
    lanLabel.textContent = 'Lanthanides (57–71)';
    gridEl.appendChild(lanLabel);

    const actLabel = document.createElement('div');
    actLabel.className = 'pt-fblock-label';
    actLabel.style.gridRow = '11';
    actLabel.style.gridColumn = '1 / span 3';
    actLabel.textContent = 'Actinides (89–103)';
    gridEl.appendChild(actLabel);

    fBlockElements.forEach((el) => {
      const row = el.category === 'lanthanide' ? 10 : 11;
      gridEl.appendChild(createTileButton(el, row, el.fCol));
    });
  }

  function setViewMode(nextMode) {
    viewMode = nextMode === 'simplified' ? 'simplified' : 'detailed';
    activeFilter = 'all';
    viewBtns.forEach((btn) => {
      const active = btn.dataset.ptView === viewMode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (subtitleEl) {
      subtitleEl.textContent =
        viewMode === 'simplified'
          ? 'All 118 elements · Simplified view grouped into Metals, Metalloids, and Non-metals'
          : 'All 118 elements · Detailed view with families, atomic mass, state, and uses';
    }
    renderFilterBar();
    renderGrid();
    renderInspector(getSelectedElement());
  }

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setViewMode(btn.dataset.ptView || 'detailed');
    });
  });

  setViewMode('detailed');
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

function getModalHost() {
  return (
    document.fullscreenElement ||
    document.querySelector('.slideshow-workspace') ||
    document.body
  );
}

function openModal(modal) {
  const host = getModalHost();
  if (modal.parentElement !== host) {
    host.appendChild(modal);
  }
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
   Lesson 1 Interactive Engines:
   1. First 20 Explorer + Quiz Mode
   2. Particle Arrangements 6-Card Challenge
   3. Spell Words with Element Symbols (all 118 IUPAC symbols)
   4. Quick Check Symbol Quiz
   ========================================================================== */

const ALL_IUPAC_ELEMENTS = [
  ['H', 'Hydrogen'], ['He', 'Helium'], ['Li', 'Lithium'], ['Be', 'Beryllium'],
  ['B', 'Boron'], ['C', 'Carbon'], ['N', 'Nitrogen'], ['O', 'Oxygen'],
  ['F', 'Fluorine'], ['Ne', 'Neon'], ['Na', 'Sodium'], ['Mg', 'Magnesium'],
  ['Al', 'Aluminium'], ['Si', 'Silicon'], ['P', 'Phosphorus'], ['S', 'Sulfur'],
  ['Cl', 'Chlorine'], ['Ar', 'Argon'], ['K', 'Potassium'], ['Ca', 'Calcium'],
  ['Sc', 'Scandium'], ['Ti', 'Titanium'], ['V', 'Vanadium'], ['Cr', 'Chromium'],
  ['Mn', 'Manganese'], ['Fe', 'Iron'], ['Co', 'Cobalt'], ['Ni', 'Nickel'],
  ['Cu', 'Copper'], ['Zn', 'Zinc'], ['Ga', 'Gallium'], ['Ge', 'Germanium'],
  ['As', 'Arsenic'], ['Se', 'Selenium'], ['Br', 'Bromine'], ['Kr', 'Krypton'],
  ['Rb', 'Rubidium'], ['Sr', 'Strontium'], ['Y', 'Yttrium'], ['Zr', 'Zirconium'],
  ['Nb', 'Niobium'], ['Mo', 'Molybdenum'], ['Tc', 'Technetium'], ['Ru', 'Ruthenium'],
  ['Rh', 'Rhodium'], ['Pd', 'Palladium'], ['Ag', 'Silver'], ['Cd', 'Cadmium'],
  ['In', 'Indium'], ['Sn', 'Tin'], ['Sb', 'Antimony'], ['Te', 'Tellurium'],
  ['I', 'Iodine'], ['Xe', 'Xenon'], ['Cs', 'Cesium'], ['Ba', 'Barium'],
  ['La', 'Lanthanum'], ['Ce', 'Cerium'], ['Pr', 'Praseodymium'], ['Nd', 'Neodymium'],
  ['Pm', 'Promethium'], ['Sm', 'Samarium'], ['Eu', 'Europium'], ['Gd', 'Gadolinium'],
  ['Tb', 'Terbium'], ['Dy', 'Dysprosium'], ['Ho', 'Holmium'], ['Er', 'Erbium'],
  ['Tm', 'Thulium'], ['Yb', 'Ytterbium'], ['Lu', 'Lutetium'], ['Hf', 'Hafnium'],
  ['Ta', 'Tantalum'], ['W', 'Tungsten'], ['Re', 'Rhenium'], ['Os', 'Osmium'],
  ['Ir', 'Iridium'], ['Pt', 'Platinum'], ['Au', 'Gold'], ['Hg', 'Mercury'],
  ['Tl', 'Thallium'], ['Pb', 'Lead'], ['Bi', 'Bismuth'], ['Po', 'Polonium'],
  ['At', 'Astatine'], ['Rn', 'Radon'], ['Fr', 'Francium'], ['Ra', 'Radium'],
  ['Ac', 'Actinium'], ['Th', 'Thorium'], ['Pa', 'Protactinium'], ['U', 'Uranium'],
  ['Np', 'Neptunium'], ['Pu', 'Plutonium'], ['Am', 'Americium'], ['Cm', 'Curium'],
  ['Bk', 'Berkelium'], ['Cf', 'Californium'], ['Es', 'Einsteinium'], ['Fm', 'Fermium'],
  ['Md', 'Mendelevium'], ['No', 'Nobelium'], ['Lr', 'Lawrencium'], ['Rf', 'Rutherfordium'],
  ['Db', 'Dubnium'], ['Sg', 'Seaborgium'], ['Bh', 'Bohrium'], ['Hs', 'Hassium'],
  ['Mt', 'Meitnerium'], ['Ds', 'Darmstadtium'], ['Rg', 'Roentgenium'], ['Cn', 'Copernicum'],
  ['Nh', 'Nihonium'], ['Fl', 'Flerovium'], ['Mc', 'Moscovium'], ['Lv', 'Livermorium'],
  ['Ts', 'Tennessine'], ['Og', 'Oganesson'],
];

const SYMBOL_LOOKUP = new Map(
  ALL_IUPAC_ELEMENTS.map(([sym, name], idx) => [
    sym.toLowerCase(),
    { symbol: sym, name, number: idx + 1 },
  ])
);

function spellWithSymbols(rawWord) {
  const clean = rawWord.replace(/[^a-zA-Z]/g, '').toLowerCase();
  if (!clean) return null;

  const memo = new Map();
  function solve(index) {
    if (index === clean.length) return [];
    if (memo.has(index)) return memo.get(index);

    // Prefer 2-letter symbols first, then 1-letter symbols for natural element chunks
    for (const len of [2, 1]) {
      if (index + len <= clean.length) {
        const slice = clean.slice(index, index + len);
        const match = SYMBOL_LOOKUP.get(slice);
        if (match) {
          const rest = solve(index + len);
          if (rest) {
            const result = [match, ...rest];
            memo.set(index, result);
            return result;
          }
        }
      }
    }
    memo.set(index, null);
    return null;
  }

  return solve(0);
}

export function initFirst20Explorer(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const gridEl = container.querySelector('#f20-grid');
  const detailEl = container.querySelector('#f20-detail-panel');
  const quizToggleBtn = container.querySelector('#f20-quiz-toggle');
  const scoreBadge = container.querySelector('#f20-score-badge');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'First 20 Elements Explorer';

  const first20 = ELEMENTS.filter((el) => el.number <= 20);
  const saved = getLessonState(lessonId).activities?.[activityId] || {};

  let quizMode = Boolean(saved.quizMode);
  let selectedNumber = saved.selectedNumber || 1;
  const exploredSet = new Set(Array.isArray(saved.explored) ? saved.explored : [1]);
  const solvedSet = new Set(Array.isArray(saved.solved) ? saved.solved : []);

  function persist() {
    const completed = solvedSet.size >= 5 || exploredSet.size >= 6;
    if (scoreBadge) {
      scoreBadge.textContent = quizMode
        ? `Quiz Mode: ${solvedSet.size} / 20 named`
        : `Explored: ${exploredSet.size} / 20`;
    }
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'first20',
        title: titleText,
        quizMode,
        selectedNumber,
        explored: Array.from(exploredSet),
        solved: Array.from(solvedSet),
        answerSummary: `${exploredSet.size}/20 explored, ${solvedSet.size}/20 named in Quiz Mode`,
        completed,
      },
      totalActivities
    );
  }

  function renderGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    first20.forEach((el) => {
      // Insert spacing gap between Group 2 and Group 13 in Period 1 (after H)
      if (el.number === 2) {
        const gap = document.createElement('div');
        gap.className = 'f20-gap';
        gap.setAttribute('aria-hidden', 'true');
        gridEl.appendChild(gap);
      }

      const isSolved = solvedSet.has(el.number);
      const hideName = quizMode && !isSolved;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `f20-tile cat-${el.category}`;
      if (el.number === selectedNumber) btn.classList.add('is-selected');
      if (isSolved) btn.classList.add('is-quiz-solved');
      if (hideName) btn.classList.add('is-quiz-hidden');
      btn.setAttribute(
        'aria-label',
        hideName
          ? `Atomic number ${el.number}, symbol ${el.symbol}, name hidden`
          : `${el.number} ${el.symbol} ${el.name}`
      );

      btn.innerHTML = `
        <div class="f20-tile-top">
          <span>${el.number}</span>
          <span>${el.mass}</span>
        </div>
        <div class="f20-tile-sym">${el.symbol}</div>
        <div class="f20-tile-name">${hideName ? '???' : escapeHtml(el.name)}</div>
      `;

      btn.addEventListener('click', () => {
        selectedNumber = el.number;
        exploredSet.add(el.number);
        renderGrid();
        renderDetail();
        persist();
      });

      gridEl.appendChild(btn);
    });
  }

  function renderDetail() {
    if (!detailEl) return;
    const el = first20.find((item) => item.number === selectedNumber) || first20[0];
    const isSolved = solvedSet.has(el.number);
    const hideName = quizMode && !isSolved;

    detailEl.innerHTML = `
      <div class="pt-inspector-badge cat-${el.category}">
        <span class="pt-num">${el.number}</span>
        <span class="pt-sym">${el.symbol}</span>
      </div>
      <div style="display: flex; flex-direction: column; gap: 6px;">
        <div style="display: flex; flex-wrap: wrap; align-items: baseline; gap: 10px;">
          <h3 style="font-size: 1.125rem;">${hideName ? `Element #${el.number} (${el.symbol})` : escapeHtml(el.name)}</h3>
          <span class="meta-line">Atomic mass: <strong class="tabular-nums">${el.mass}</strong> · ${escapeHtml(el.categoryLabel)}</span>
        </div>
        <p style="font-size: 0.9375rem;">${escapeHtml(el.fact)} <strong>Uses:</strong> ${escapeHtml(el.uses)}.</p>
        ${
          quizMode
            ? `<form class="f20-quiz-form" id="f20-quiz-form">
                <label class="sr-only" for="f20-name-input">Type element name for ${el.symbol}</label>
                <input id="f20-name-input" class="table-input" style="max-width: 220px;" type="text" placeholder="Type name for ${el.symbol}..." value="${isSolved ? escapeHtml(el.name) : ''}" autocomplete="off" />
                <button type="submit" class="btn btn-primary btn-sm">Check Name</button>
                <span id="f20-quiz-msg" style="font-size: 0.8125rem; font-weight: 600;">${isSolved ? '✓ Matched!' : ''}</span>
              </form>`
            : ''
        }
      </div>
    `;

    const form = detailEl.querySelector('#f20-quiz-form');
    const input = detailEl.querySelector('#f20-name-input');
    const msg = detailEl.querySelector('#f20-quiz-msg');

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const guess = (input?.value || '').trim().toLowerCase();
      const accepted = [el.name.toLowerCase()];
      if (el.number === 13) accepted.push('aluminum');
      if (el.number === 16) accepted.push('sulphur');

      if (accepted.includes(guess)) {
        solvedSet.add(el.number);
        renderGrid();
        renderDetail();
        persist();
      } else if (msg) {
        msg.style.color = 'var(--error)';
        msg.textContent = `✕ Not quite — hint: starts with "${el.name.slice(0, 2)}..."`;
      }
    });
  }

  quizToggleBtn?.addEventListener('click', () => {
    quizMode = !quizMode;
    quizToggleBtn.textContent = quizMode ? 'Exit Quiz Mode' : 'Toggle Quiz Mode';
    quizToggleBtn.setAttribute('aria-pressed', quizMode ? 'true' : 'false');
    renderGrid();
    renderDetail();
    persist();
  });

  if (quizToggleBtn) {
    quizToggleBtn.textContent = quizMode ? 'Exit Quiz Mode' : 'Toggle Quiz Mode';
    quizToggleBtn.setAttribute('aria-pressed', quizMode ? 'true' : 'false');
  }
  if (scoreBadge) {
    scoreBadge.textContent = quizMode
      ? `Quiz Mode: ${solvedSet.size} / 20 named`
      : `Explored: ${exploredSet.size} / 20`;
  }

  renderGrid();
  renderDetail();
}

export function initParticleMatch(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const cards = Array.from(container.querySelectorAll('[data-particle-card]'));
  const checkBtn = container.querySelector('[data-particle-check]');
  const resetBtn = container.querySelector('[data-particle-reset]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Particle Classification';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const selections = { ...(saved.selections || {}) };

  function syncCardButtons() {
    cards.forEach((card) => {
      const cardId = card.dataset.particleCard;
      const chosen = selections[cardId] || '';
      card.querySelectorAll('[data-choice]').forEach((btn) => {
        const isActive = btn.dataset.choice === chosen;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });
    });
  }

  function persist(completed) {
    const summary = cards
      .map((c) => `${c.dataset.label}: ${selections[c.dataset.particleCard] || 'unanswered'}`)
      .join('; ');
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'particle-match',
        title: titleText,
        selections,
        answerSummary: summary,
        completed: Boolean(completed),
      },
      totalActivities
    );
  }

  function evaluate(save) {
    let correctCount = 0;
    let answeredCount = 0;

    cards.forEach((card) => {
      const cardId = card.dataset.particleCard;
      const target = card.dataset.answer;
      const chosen = selections[cardId];
      card.classList.remove('is-correct', 'is-incorrect');
      if (chosen) {
        answeredCount += 1;
        const ok = chosen === target;
        card.classList.add(ok ? 'is-correct' : 'is-incorrect');
        if (ok) correctCount += 1;
      }
    });

    const allCorrect = answeredCount === cards.length && correctCount === cards.length;
    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allCorrect);
      feedbackEl.classList.toggle('is-error', !allCorrect);
      if (answeredCount < cards.length) {
        feedbackEl.textContent = `Choose an arrangement for all ${cards.length} elements (${answeredCount}/${cards.length} selected).`;
      } else if (allCorrect) {
        feedbackEl.textContent = `✓ Excellent! All 6 elements are classified accurately.`;
      } else {
        feedbackEl.textContent = `✕ ${correctCount} of ${cards.length} correct. Check the hints on any highlighted red cards.`;
      }
    }

    if (save) persist(allCorrect);
  }

  cards.forEach((card) => {
    const cardId = card.dataset.particleCard;
    card.querySelectorAll('[data-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        selections[cardId] = btn.dataset.choice;
        card.classList.remove('is-correct', 'is-incorrect');
        syncCardButtons();
        persist(false);
      });
    });

    const hintBtn = card.querySelector('[data-hint-toggle]');
    const hintBox = card.querySelector('.hint-box');
    hintBtn?.addEventListener('click', () => {
      if (!hintBox) return;
      const hidden = hintBox.hasAttribute('hidden');
      if (hidden) {
        hintBox.removeAttribute('hidden');
        hintBtn.textContent = 'Hide Hint';
      } else {
        hintBox.setAttribute('hidden', '');
        hintBtn.textContent = 'Show Hint';
      }
    });
  });

  checkBtn?.addEventListener('click', () => evaluate(true));
  resetBtn?.addEventListener('click', () => {
    Object.keys(selections).forEach((k) => delete selections[k]);
    cards.forEach((c) => c.classList.remove('is-correct', 'is-incorrect'));
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
    syncCardButtons();
    persist(false);
  });

  syncCardButtons();
  if (saved.completed) evaluate(false);
}

export function initSymbolSpeller(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const input = container.querySelector('#speller-word-input');
  const testBtn = container.querySelector('#speller-test-btn');
  const clearBtn = container.querySelector('#speller-clear-btn');
  const tilesOut = container.querySelector('#speller-tiles-out');
  const feedbackEl = container.querySelector('.activity-feedback');
  const savedListEl = container.querySelector('#speller-saved-words');
  const bestLabelEl = container.querySelector('#speller-best-score');
  const chips = Array.from(container.querySelectorAll('[data-speller-chip]'));
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Spell Words with Element Symbols';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const validWords = Array.isArray(saved.validWords) ? [...saved.validWords] : [];

  function renderSavedWords() {
    if (savedListEl) {
      savedListEl.innerHTML = validWords
        .map((w) => `<span class="speller-saved-item">${escapeHtml(w.formatted)} (${w.length} letters)</span>`)
        .join('');
    }
    if (bestLabelEl) {
      const best = validWords.reduce((max, item) => Math.max(max, item.length), 0);
      bestLabelEl.textContent = best > 0 ? `Longest valid word: ${best} letters` : 'No valid words tested yet';
    }
  }

  function renderMatch(word, matches) {
    if (!tilesOut || !feedbackEl) return;
    feedbackEl.classList.add('is-visible');

    if (!matches) {
      tilesOut.innerHTML = '';
      tilesOut.setAttribute('hidden', '');
      feedbackEl.classList.remove('is-success');
      feedbackEl.classList.add('is-error');
      feedbackEl.textContent = `✕ "${word}" cannot be spelled purely with Periodic Table symbols. Try swapping letters or testing another word!`;
      return;
    }

    const formatted = matches.map((m) => m.symbol).join('-');
    tilesOut.removeAttribute('hidden');
    tilesOut.innerHTML = matches
      .map(
        (m) => `
      <div class="speller-tile">
        <span class="pt-num">${m.number}</span>
        <span class="speller-tile-sym">${m.symbol}</span>
        <span class="speller-tile-name">${escapeHtml(m.name)}</span>
      </div>`
      )
      .join('');

    const lettersLen = matches.map((m) => m.symbol).join('').length;
    feedbackEl.classList.remove('is-error');
    feedbackEl.classList.add('is-success');
    feedbackEl.textContent = `✓ Valid! ${formatted} (${lettersLen} letters using ${matches.length} element symbols).`;

    if (!validWords.some((item) => item.formatted.toLowerCase() === formatted.toLowerCase())) {
      validWords.push({ formatted, length: lettersLen });
      validWords.sort((a, b) => b.length - a.length);
    }
    renderSavedWords();

    const best = validWords[0];
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'symbol-speller',
        title: titleText,
        validWords,
        answerSummary: best
          ? `Best word: ${best.formatted} (${best.length} letters)`
          : formatted,
        completed: validWords.length > 0,
      },
      totalActivities
    );
  }

  function handleTest() {
    const raw = (input?.value || '').trim();
    if (!raw) return;
    const matches = spellWithSymbols(raw);
    renderMatch(raw, matches);
  }

  testBtn?.addEventListener('click', handleTest);
  input?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTest();
    }
  });

  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      if (!input) return;
      input.value = `${input.value}${chip.dataset.spellerChip || ''}`;
      input.focus();
    });
  });

  clearBtn?.addEventListener('click', () => {
    if (input) input.value = '';
    if (tilesOut) {
      tilesOut.innerHTML = '';
      tilesOut.setAttribute('hidden', '');
    }
    feedbackEl?.classList.remove('is-visible', 'is-success', 'is-error');
  });

  renderSavedWords();
}

export function initQuickCheckGrid(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const items = Array.from(container.querySelectorAll('[data-symbol-answer]'));
  const checkBtn = container.querySelector('[data-symbol-quiz-check]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Symbol Quick Check';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};

  function evaluate(save) {
    let correct = 0;
    const answers = {};

    items.forEach((box) => {
      const sym = box.dataset.symbolKey;
      const expectedList = (box.dataset.symbolAnswer || '')
        .toLowerCase()
        .split('|')
        .map((s) => s.trim());
      const input = box.querySelector('input');
      const val = (input?.value || '').trim();
      answers[sym] = val;

      box.classList.remove('is-correct', 'is-incorrect');
      if (val) {
        const ok = expectedList.includes(val.toLowerCase());
        box.classList.add(ok ? 'is-correct' : 'is-incorrect');
        if (ok) correct += 1;
      }
    });

    const allCorrect = correct === items.length;
    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allCorrect);
      feedbackEl.classList.toggle('is-error', !allCorrect);
      feedbackEl.textContent = allCorrect
        ? `✓ All ${items.length} element symbols identified correctly!`
        : `${correct} of ${items.length} correct. Tip: K comes from the Latin name "kalium" (Potassium).`;
    }

    if (save) {
      const summary = Object.entries(answers)
        .map(([k, v]) => `${k}=${v || '?'}`)
        .join(', ');
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'symbol-quiz',
          title: titleText,
          answers,
          answerSummary: summary,
          completed: allCorrect,
        },
        totalActivities
      );
    }
  }

  checkBtn?.addEventListener('click', () => evaluate(true));

  if (saved.answers) {
    items.forEach((box) => {
      const sym = box.dataset.symbolKey;
      const input = box.querySelector('input');
      if (input && typeof saved.answers[sym] === 'string') {
        input.value = saved.answers[sym];
      }
    });
    if (saved.completed) evaluate(false);
  }
}

/* ==========================================================================
   Lesson 2 Interactive Engines:
   1. Reflection Prompt (Starter)
   2. Periodic Table Classification Map (Metals / Metalloids / Non-metals)
   3. Unknown Metal Detective Table + Guided Checklist
   4. Metal Poster Planner
   ========================================================================== */

export function initReflection(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const textarea = container.querySelector('textarea');
  const statusEl = container.querySelector('[data-reflection-status]');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Starter Reflection';

  const saved = getLessonState(lessonId).activities?.[activityId];
  if (saved?.text && textarea) {
    textarea.value = saved.text;
    if (statusEl) statusEl.textContent = 'Saved to your notes';
  }

  let timer = null;
  textarea?.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      const val = textarea.value.trim();
      const words = val ? val.split(/\s+/).length : 0;
      const completed = words >= 3;
      if (statusEl) {
        statusEl.textContent = completed
          ? 'Saved and complete'
          : val
            ? 'Saved (add at least 3 words)'
            : 'Type your response to auto-save';
      }
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'reflection',
          title: titleText,
          text: textarea.value,
          answerSummary: val || 'No response yet',
          completed,
        },
        totalActivities
      );
    }, 180);
  });
}

const PT_CLASS_LAYOUT = [
  // Period 1
  ['H', 1, 1, 'nonmetal', 'Hydrogen'], ['He', 1, 18, 'nonmetal', 'Helium'],
  // Period 2
  ['Li', 2, 1, 'metal', 'Lithium'], ['Be', 2, 2, 'metal', 'Beryllium'],
  ['B', 2, 13, 'metalloid', 'Boron'], ['C', 2, 14, 'nonmetal', 'Carbon'],
  ['N', 2, 15, 'nonmetal', 'Nitrogen'], ['O', 2, 16, 'nonmetal', 'Oxygen'],
  ['F', 2, 17, 'nonmetal', 'Fluorine'], ['Ne', 2, 18, 'nonmetal', 'Neon'],
  // Period 3
  ['Na', 3, 1, 'metal', 'Sodium'], ['Mg', 3, 2, 'metal', 'Magnesium'],
  ['Al', 3, 13, 'metal', 'Aluminium'], ['Si', 3, 14, 'metalloid', 'Silicon'],
  ['P', 3, 15, 'nonmetal', 'Phosphorus'], ['S', 3, 16, 'nonmetal', 'Sulfur'],
  ['Cl', 3, 17, 'nonmetal', 'Chlorine'], ['Ar', 3, 18, 'nonmetal', 'Argon'],
  // Period 4
  ['K', 4, 1, 'metal', 'Potassium'], ['Ca', 4, 2, 'metal', 'Calcium'],
  ['Sc', 4, 3, 'metal', 'Scandium'], ['Ti', 4, 4, 'metal', 'Titanium'],
  ['V', 4, 5, 'metal', 'Vanadium'], ['Cr', 4, 6, 'metal', 'Chromium'],
  ['Mn', 4, 7, 'metal', 'Manganese'], ['Fe', 4, 8, 'metal', 'Iron'],
  ['Co', 4, 9, 'metal', 'Cobalt'], ['Ni', 4, 10, 'metal', 'Nickel'],
  ['Cu', 4, 11, 'metal', 'Copper'], ['Zn', 4, 12, 'metal', 'Zinc'],
  ['Ga', 4, 13, 'metal', 'Gallium'], ['Ge', 4, 14, 'metalloid', 'Germanium'],
  ['As', 4, 15, 'metalloid', 'Arsenic'], ['Se', 4, 16, 'nonmetal', 'Selenium'],
  ['Br', 4, 17, 'nonmetal', 'Bromine'], ['Kr', 4, 18, 'nonmetal', 'Krypton'],
  // Period 5
  ['Rb', 5, 1, 'metal', 'Rubidium'], ['Sr', 5, 2, 'metal', 'Strontium'],
  ['Y', 5, 3, 'metal', 'Yttrium'], ['Zr', 5, 4, 'metal', 'Zirconium'],
  ['Nb', 5, 5, 'metal', 'Niobium'], ['Mo', 5, 6, 'metal', 'Molybdenum'],
  ['Tc', 5, 7, 'metal', 'Technetium'], ['Ru', 5, 8, 'metal', 'Ruthenium'],
  ['Rh', 5, 9, 'metal', 'Rhodium'], ['Pd', 5, 10, 'metal', 'Palladium'],
  ['Ag', 5, 11, 'metal', 'Silver'], ['Cd', 5, 12, 'metal', 'Cadmium'],
  ['In', 5, 13, 'metal', 'Indium'], ['Sn', 5, 14, 'metal', 'Tin'],
  ['Sb', 5, 15, 'metalloid', 'Antimony'], ['Te', 5, 16, 'metalloid', 'Tellurium'],
  ['I', 5, 17, 'nonmetal', 'Iodine'], ['Xe', 5, 18, 'nonmetal', 'Xenon'],
  // Period 6
  ['Cs', 6, 1, 'metal', 'Cesium'], ['Ba', 6, 2, 'metal', 'Barium'],
  ['La*', 6, 3, 'metal', 'Lanthanum'], ['Hf', 6, 4, 'metal', 'Hafnium'],
  ['Ta', 6, 5, 'metal', 'Tantalum'], ['W', 6, 6, 'metal', 'Tungsten'],
  ['Re', 6, 7, 'metal', 'Rhenium'], ['Os', 6, 8, 'metal', 'Osmium'],
  ['Ir', 6, 9, 'metal', 'Iridium'], ['Pt', 6, 10, 'metal', 'Platinum'],
  ['Au', 6, 11, 'metal', 'Gold'], ['Hg', 6, 12, 'metal', 'Mercury'],
  ['Tl', 6, 13, 'metal', 'Thallium'], ['Pb', 6, 14, 'metal', 'Lead'],
  ['Bi', 6, 15, 'metal', 'Bismuth'], ['Po', 6, 16, 'metal', 'Polonium'],
  ['At', 6, 17, 'metalloid', 'Astatine'], ['Rn', 6, 18, 'nonmetal', 'Radon'],
  // Period 7
  ['Fr', 7, 1, 'metal', 'Francium'], ['Ra', 7, 2, 'metal', 'Radium'],
  ['Ac*', 7, 3, 'metal', 'Actinium'], ['Rf', 7, 4, 'metal', 'Rutherfordium'],
  ['Db', 7, 5, 'metal', 'Dubnium'], ['Sg', 7, 6, 'metal', 'Seaborgium'],
  ['Bh', 7, 7, 'metal', 'Bohrium'], ['Hs', 7, 8, 'metal', 'Hassium'],
  ['Mt', 7, 9, 'metal', 'Meitnerium'], ['Ds', 7, 10, 'metal', 'Darmstadtium'],
  ['Rg', 7, 11, 'metal', 'Roentgenium'], ['Cn', 7, 12, 'metal', 'Copernicium'],
  ['Nh', 7, 13, 'metal', 'Nihonium'], ['Fl', 7, 14, 'metal', 'Flerovium'],
  ['Mc', 7, 15, 'metal', 'Moscovium'], ['Lv', 7, 16, 'metal', 'Livermorium'],
  ['Ts', 7, 17, 'nonmetal', 'Tennessine'], ['Og', 7, 18, 'nonmetal', 'Oganesson'],
];

const CLASS_DESCRIPTIONS = {
  all: {
    title: 'All Three Regions',
    body: 'Most elements on the Periodic Table (over 75%) are metals on the left and centre. A diagonal staircase of metalloids separates metals from the non-metals on the upper right.',
  },
  metal: {
    title: 'Metals (Left & Centre)',
    body: 'Metals sit on the left and across the middle of the Periodic Table (Groups 1–12 and lower Groups 13–16). They are typically shiny, solid, malleable, and great conductors of heat and electricity.',
  },
  metalloid: {
    title: 'Metalloids (The Diagonal Staircase)',
    body: 'Metalloids (B, Si, Ge, As, Sb, Te, At) sit along the zig-zag boundary between metals and non-metals. They share properties of both—like silicon, which looks shiny like a metal but conducts electricity as a semiconductor.',
  },
  nonmetal: {
    title: 'Non-Metals (Upper Right + Hydrogen)',
    body: 'Non-metals sit in the upper-right corner (plus Hydrogen at top left). Many are gases at room temperature (O₂, N₂, Cl₂, He), while solids like carbon and sulfur are dull and brittle.',
  },
};

export function initPtClassMap(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const gridEl = container.querySelector('#pt-map-grid');
  const summaryEl = container.querySelector('#pt-map-summary');
  const buttons = Array.from(container.querySelectorAll('[data-class-filter]'));
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Periodic Table Classification Map';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  let activeGroup = saved.activeGroup || 'all';
  const visited = new Set(Array.isArray(saved.visited) ? saved.visited : []);

  function renderSummary(clickedElement = null) {
    if (!summaryEl) return;
    const info = CLASS_DESCRIPTIONS[activeGroup] || CLASS_DESCRIPTIONS.all;
    const extra = clickedElement
      ? `<p style="font-size: 0.875rem; color: var(--accent-accessible); font-weight: 600;">Selected: ${escapeHtml(clickedElement[4])} (${clickedElement[0]}) — classified as ${clickedElement[3].toUpperCase()}.</p>`
      : '';
    summaryEl.innerHTML = `
      <strong>${escapeHtml(info.title)}</strong>
      <p style="font-size: 0.9375rem;">${escapeHtml(info.body)}</p>
      ${extra}
    `;
  }

  function renderGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    PT_CLASS_LAYOUT.forEach((item) => {
      const [sym, period, group, cat, name] = item;
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = `pt-map-cell class-${cat}`;
      if (activeGroup !== 'all' && cat !== activeGroup) {
        cell.classList.add('is-dimmed');
      }
      cell.style.gridRow = `${period}`;
      cell.style.gridColumn = `${group}`;
      cell.textContent = sym;
      cell.title = `${name} (${cat})`;
      cell.setAttribute('aria-label', `${name}, ${cat}`);
      cell.addEventListener('click', () => {
        activeGroup = cat;
        visited.add(cat);
        buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.classFilter === cat));
        renderGrid();
        renderSummary(item);
        persist();
      });
      gridEl.appendChild(cell);
    });
  }

  function persist() {
    const completed = visited.has('metal') && visited.has('metalloid') && visited.has('nonmetal');
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'pt-class-map',
        title: titleText,
        activeGroup,
        visited: Array.from(visited),
        answerSummary: `Explored ${visited.size}/3 element regions (${Array.from(visited).join(', ') || 'none'})`,
        completed,
      },
      totalActivities
    );
  }

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeGroup = btn.dataset.classFilter || 'all';
      if (activeGroup !== 'all') visited.add(activeGroup);
      buttons.forEach((b) => b.classList.toggle('is-active', b === btn));
      renderGrid();
      renderSummary();
      persist();
    });
  });

  buttons.forEach((b) => b.classList.toggle('is-active', b.dataset.classFilter === activeGroup));
  renderGrid();
  renderSummary();
}

export function initDetective(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const choiceBtns = Array.from(container.querySelectorAll('[data-unknown-choice]'));
  const textarea = container.querySelector('#detective-reasoning');
  const saveBtn = container.querySelector('#detective-save-btn');
  const sampleBtn = container.querySelector('#detective-sample-btn');
  const sampleBox = container.querySelector('#detective-sample-box');
  const feedbackEl = container.querySelector('.activity-feedback');
  const checkConduct = container.querySelector('[data-check-keyword="conduct"]');
  const checkLustre = container.querySelector('[data-check-keyword="lustre"]');
  const checkMalleable = container.querySelector('[data-check-keyword="malleable"]');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Unknown Metal Detective';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  let selectedUnknown = saved.selectedUnknown || '';

  if (saved.reasoning && textarea) {
    textarea.value = saved.reasoning;
  }

  function updateChecklist() {
    const text = (textarea?.value || '').toLowerCase();
    const hasConduct = /(conduct|electric|electricity|circuit)/.test(text);
    const hasLustre = /(lustr|shiny|shine|reflect)/.test(text);
    const hasMalleable = /(malleab|bend|bent|break|brittle|shape)/.test(text);

    checkConduct?.classList.toggle('is-met', hasConduct);
    checkLustre?.classList.toggle('is-met', hasLustre);
    checkMalleable?.classList.toggle('is-met', hasMalleable);

    return { hasConduct, hasLustre, hasMalleable };
  }

  function applyChoiceUI() {
    choiceBtns.forEach((btn) => {
      const val = btn.dataset.unknownChoice;
      const isSelected = val === selectedUnknown;
      btn.classList.toggle('is-selected', isSelected);
      btn.classList.toggle('is-correct', isSelected && val === 'B');
      btn.classList.toggle('is-incorrect', isSelected && val !== 'B');
    });
  }

  function persist(showFeedback = true) {
    const { hasConduct, hasLustre, hasMalleable } = updateChecklist();
    const reasoning = (textarea?.value || '').trim();
    const isChoiceRight = selectedUnknown === 'B';
    const hasReasoning = reasoning.length >= 20 && hasConduct && hasMalleable;
    const completed = isChoiceRight && hasReasoning;

    if (showFeedback && feedbackEl) {
      feedbackEl.classList.add('is-visible');
      if (!selectedUnknown) {
        feedbackEl.classList.remove('is-success');
        feedbackEl.classList.add('is-error');
        feedbackEl.textContent = 'Select Unknown A, B, or C first.';
      } else if (!isChoiceRight) {
        feedbackEl.classList.remove('is-success');
        feedbackEl.classList.add('is-error');
        feedbackEl.textContent = `✕ Unknown ${selectedUnknown} is shiny, but it cannot conduct electricity and breaks when bent. Look for the unknown that passes all three metal tests.`;
      } else if (!hasReasoning) {
        feedbackEl.classList.remove('is-error');
        feedbackEl.classList.add('is-success');
        feedbackEl.textContent =
          '✓ Unknown B is indeed the metal! Now write a short paragraph mentioning conductivity, lustre, and malleability to complete this task.';
      } else {
        feedbackEl.classList.remove('is-error');
        feedbackEl.classList.add('is-success');
        feedbackEl.textContent =
          '✓ Great scientific reasoning! Unknown B is the metal, and your explanation covers the key evidence.';
      }
    }

    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'detective',
        title: titleText,
        selectedUnknown,
        reasoning: textarea?.value || '',
        answerSummary: `Selected Unknown ${selectedUnknown || '?'} — ${reasoning || 'No explanation yet'}`,
        completed,
      },
      totalActivities
    );
  }

  choiceBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedUnknown = btn.dataset.unknownChoice || '';
      applyChoiceUI();
      persist(true);
    });
  });

  let timer = null;
  textarea?.addEventListener('input', () => {
    updateChecklist();
    window.clearTimeout(timer);
    timer = window.setTimeout(() => persist(false), 220);
  });

  saveBtn?.addEventListener('click', () => persist(true));

  sampleBtn?.addEventListener('click', () => {
    if (!sampleBox) return;
    const hidden = sampleBox.hasAttribute('hidden');
    if (hidden) {
      sampleBox.removeAttribute('hidden');
      sampleBtn.textContent = 'Hide Model Explanation';
    } else {
      sampleBox.setAttribute('hidden', '');
      sampleBtn.textContent = 'Show Model Explanation';
    }
  });

  applyChoiceUI();
  updateChecklist();
  if (saved.selectedUnknown) {
    persist(false);
  }
}

export function initMetalPoster(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const metalSelect = container.querySelector('#poster-metal-select');
  const useInput = container.querySelector('#poster-use-input');
  const propBtns = Array.from(container.querySelectorAll('[data-poster-prop]'));
  const prop1Input = container.querySelector('#poster-prop1-explain');
  const prop2Input = container.querySelector('#poster-prop2-explain');
  const deepInput = container.querySelector('#poster-deep-explain');
  const statusEl = container.querySelector('#poster-status');
  const hintBtn = container.querySelector('#poster-hint-toggle');
  const hintBox = container.querySelector('#poster-hint-box');
  const propLimitNote = container.querySelector('#poster-prop-limit-note');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Metal Poster Planner';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  let selectedProps = Array.isArray(saved.selectedProps) ? [...saved.selectedProps] : [];

  if (metalSelect && saved.metal) metalSelect.value = saved.metal;
  if (useInput && saved.use) useInput.value = saved.use;
  if (prop1Input && saved.prop1Explain) prop1Input.value = saved.prop1Explain;
  if (prop2Input && saved.prop2Explain) prop2Input.value = saved.prop2Explain;
  if (deepInput && saved.deepExplain) deepInput.value = saved.deepExplain;

  function syncPropButtons() {
    propBtns.forEach((btn) => {
      const prop = btn.dataset.posterProp;
      const active = selectedProps.includes(prop);
      btn.classList.toggle('is-selected', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (propLimitNote) {
      propLimitNote.textContent = `Selected (${selectedProps.length}/2): ${selectedProps.join(' & ') || 'Choose any 2 properties'}`;
    }
  }

  function savePoster() {
    const metal = metalSelect?.value || '';
    const use = (useInput?.value || '').trim();
    const prop1Explain = (prop1Input?.value || '').trim();
    const prop2Explain = (prop2Input?.value || '').trim();
    const deepExplain = (deepInput?.value || '').trim();

    const completed =
      Boolean(metal) &&
      use.length > 0 &&
      selectedProps.length === 2 &&
      prop1Explain.length > 0 &&
      prop2Explain.length > 0 &&
      deepExplain.length > 0;

    if (statusEl) {
      statusEl.textContent = completed
        ? '✓ Poster plan complete and auto-saved'
        : 'All fields auto-save locally';
    }

    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'metal-poster',
        title: titleText,
        metal,
        use,
        selectedProps,
        prop1Explain,
        prop2Explain,
        deepExplain,
        answerSummary: `${metal || 'No metal'} for ${use || 'unspecified use'} (${selectedProps.join(', ') || 'no properties'})`,
        completed,
      },
      totalActivities
    );
  }

  propBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const prop = btn.dataset.posterProp;
      if (selectedProps.includes(prop)) {
        selectedProps = selectedProps.filter((p) => p !== prop);
      } else {
        if (selectedProps.length >= 2) {
          selectedProps.shift();
        }
        selectedProps.push(prop);
      }
      syncPropButtons();
      savePoster();
    });
  });

  let timer = null;
  [metalSelect, useInput, prop1Input, prop2Input, deepInput].forEach((el) => {
    el?.addEventListener('input', () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(savePoster, 200);
    });
    el?.addEventListener('change', savePoster);
  });

  hintBtn?.addEventListener('click', () => {
    if (!hintBox) return;
    const hidden = hintBox.hasAttribute('hidden');
    if (hidden) {
      hintBox.removeAttribute('hidden');
      hintBtn.textContent = 'Hide Particle Explanation Hint';
    } else {
      hintBox.setAttribute('hidden', '');
      hintBtn.textContent = 'Show Particle Explanation Hint';
    }
  });

  syncPropButtons();
  if (saved.completed && statusEl) {
    statusEl.textContent = '✓ Poster plan complete and auto-saved';
  }
}

/* ==========================================================================
   Lesson 2 Interactive Engines:
   0. Build the Atom & Sea of Electrons Simulator (Protons, Neutrons, Stability, Release Electrons)
   1. Label the Atom Hotspots (1-5)
   2. Subatomic Particles Table (Select/Check)
   3. Electron Shell Builder (C, Ne, Ca with 2, 8, 8, 2 rule)
   4. Problem Set Validator (Numeric / Text with worked feedback)
   5. Rubric Keyword Explainer (Reusable for written justifications)
   ========================================================================== */

const STABLE_NEUTRONS_1_TO_20 = {
  1: [0, 1],
  2: [1, 2],
  3: [3, 4],
  4: [5],
  5: [5, 6],
  6: [6, 7],
  7: [7, 8],
  8: [8, 9, 10],
  9: [10],
  10: [10, 11, 12],
  11: [12],
  12: [12, 13, 14],
  13: [14],
  14: [14, 15, 16],
  15: [16],
  16: [16, 17, 18, 20],
  17: [18, 20],
  18: [18, 20, 22],
  19: [20, 22],
  20: [20, 22, 23, 24, 26, 28],
};

function getFirst20Shells(count) {
  const caps = [2, 8, 8, 2];
  const out = [0, 0, 0, 0];
  let left = Math.max(0, Math.min(20, count));
  for (let i = 0; i < caps.length; i += 1) {
    const take = Math.min(left, caps[i]);
    out[i] = take;
    left -= take;
  }
  return out;
}

export function initAtomSeaBuilder(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const svgEl = container.querySelector('#atom-sea-svg');
  const pCountEl = container.querySelector('[data-sea-count="p"]');
  const nCountEl = container.querySelector('[data-sea-count="n"]');
  const eCountEl = container.querySelector('[data-sea-count="e"]');
  const elementNameEl = container.querySelector('[data-sea-readout="element"]');
  const massEl = container.querySelector('[data-sea-readout="mass"]');
  const chargeEl = container.querySelector('[data-sea-readout="charge"]');
  const stabilityEl = container.querySelector('[data-sea-readout="stability"]');
  const stabilityNoteEl = container.querySelector('[data-sea-stability-note]');
  const releaseBtn = container.querySelector('[data-sea-release]');
  const returnSeaBtn = container.querySelector('[data-sea-return]');
  const resetBtn = container.querySelector('[data-sea-reset]');
  const eMinusBtn = container.querySelector('[data-sea-delta="e:-1"]');
  const ePlusBtn = container.querySelector('[data-sea-delta="e:1"]');
  const pMinusBtn = container.querySelector('[data-sea-delta="p:-1"]');
  const pPlusBtn = container.querySelector('[data-sea-delta="p:1"]');
  const nMinusBtn = container.querySelector('[data-sea-delta="n:-1"]');
  const nPlusBtn = container.querySelector('[data-sea-delta="n:1"]');
  const presetBtns = Array.from(container.querySelectorAll('[data-sea-preset]'));
  const statusBanner = container.querySelector('[data-sea-banner]');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Build the Atom & Release Electrons';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  let protons = typeof saved.protons === 'number' ? saved.protons : 1;
  let neutrons = typeof saved.neutrons === 'number' ? saved.neutrons : 0;
  let electronsReleased = Boolean(saved.electronsReleased);
  let capturedElectrons = typeof saved.capturedElectrons === 'number' ? saved.capturedElectrons : 0;
  let hasReleasedOnce = Boolean(saved.hasReleasedOnce);

  let isAnimating = false;
  let animFrameId = null;
  let animState = null;

  const CX = 180;
  const CY = 196;
  const SHELL_RADII = [48, 74, 100, 126];

  // Precomputed sea electron positions drifting in the outer perimeter (outside Shell 4)
  const SEA_PARTICLES = Array.from({ length: 24 }, (_, idx) => {
    const angle = (Math.PI * 2 * idx) / 24 + (idx % 2 === 0 ? 0.08 : -0.06);
    const radius = idx % 3 === 0 ? 154 : idx % 3 === 1 ? 144 : 164;
    return {
      x: CX + radius * Math.cos(angle),
      y: CY + radius * Math.sin(angle),
      angle,
    };
  });

  function cancelAnimation() {
    if (animFrameId !== null) {
      window.cancelAnimationFrame(animFrameId);
      animFrameId = null;
    }
    isAnimating = false;
    animState = null;
  }

  function getStabilityInfo(p, n) {
    if (p === 0) {
      return {
        isStable: false,
        label: 'No Nucleus Yet',
        note: 'Add at least 1 proton to create an atomic nucleus.',
      };
    }
    const stableList = STABLE_NEUTRONS_1_TO_20[p] || [];
    if (stableList.includes(n)) {
      return {
        isStable: true,
        label: '✓ Stable Nucleus',
        note:
          p === 1 && n === 0
            ? 'Hydrogen-1 has only 1 proton, so there is no proton–proton repulsion to overcome.'
            : 'Neutrons and the strong nuclear force balance out proton–proton electrostatic repulsion.',
      };
    }
    const minN = stableList[0] ?? p;
    const maxN = stableList[stableList.length - 1] ?? p;
    if (n < minN) {
      return {
        isStable: false,
        label: '⚠ Unstable (Too Few Neutrons)',
        note: `Proton–proton electrostatic repulsion is too strong with only ${n} neutron${n === 1 ? '' : 's'}. Add neutrons so the strong nuclear force can stabilize the nucleus.`,
      };
    }
    if (n > maxN) {
      return {
        isStable: false,
        label: '⚠ Unstable (Too Many Neutrons)',
        note: `This isotope has ${n} neutrons—too neutron-rich for long-term stability (radioactive).`,
      };
    }
    return {
      isStable: false,
      label: '⚠ Unstable Isotope',
      note: 'This proton–neutron combination is unstable and undergoes radioactive decay.',
    };
  }

  function persist() {
    const elObj = ELEMENTS.find((el) => el.number === protons);
    const nameStr = elObj ? `${elObj.name} (${elObj.symbol})` : 'None';
    const charge = protons - (electronsReleased ? capturedElectrons : 0);
    const chargeStr = charge > 0 ? `+${charge}` : `${charge}`;
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'atom-sea-builder',
        title: titleText,
        protons,
        neutrons,
        electronsReleased,
        capturedElectrons,
        hasReleasedOnce,
        answerSummary: `${nameStr}, Mass ${protons + neutrons}, Net Charge ${chargeStr}`,
        completed: hasReleasedOnce && protons >= 2,
      },
      totalActivities
    );
  }

  function renderNucleons(cx, cy) {
    const nucleons = [];
    const maxCount = Math.max(protons, neutrons);
    for (let i = 0; i < maxCount; i += 1) {
      if (i < protons) nucleons.push('p');
      if (i < neutrons) nucleons.push('n');
    }
    return nucleons
      .map((kind, idx) => {
        const angle = idx * 2.39996;
        const dist = idx === 0 ? 0 : Math.min(24, 5.8 * Math.sqrt(idx));
        const x = cx + dist * Math.cos(angle);
        const y = cy + dist * Math.sin(angle);
        if (kind === 'p') {
          return `
            <g>
              <circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.8" fill="#DC2626" stroke="#FFFFFF" stroke-width="1.2" />
              <text x="${x.toFixed(1)}" y="${(y + 0.4).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="8.2" font-weight="700">+</text>
            </g>`;
        }
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="6.8" fill="#64748B" stroke="#FFFFFF" stroke-width="1.2" />`;
      })
      .join('');
  }

  function buildAttractionTargets(count) {
    const shellCounts = getFirst20Shells(count);
    const targets = [];
    const usedSeaIndices = new Set();

    shellCounts.forEach((sCount, sIdx) => {
      const r = SHELL_RADII[sIdx];
      for (let k = 0; k < sCount; k += 1) {
        const angle = (Math.PI * 2 * k) / sCount - Math.PI / 2;
        const tx = CX + r * Math.cos(angle);
        const ty = CY + r * Math.sin(angle);

        // Pick closest unused sea electron so trajectories stay clean and non-crossing
        let bestIdx = 0;
        let bestDist = Infinity;
        SEA_PARTICLES.forEach((pt, idx) => {
          if (usedSeaIndices.has(idx)) return;
          const dx = pt.x - tx;
          const dy = pt.y - ty;
          const d = dx * dx + dy * dy;
          if (d < bestDist) {
            bestDist = d;
            bestIdx = idx;
          }
        });
        usedSeaIndices.add(bestIdx);
        const src = SEA_PARTICLES[bestIdx];
        targets.push({
          sx: src.x,
          sy: src.y,
          tx,
          ty,
          seaIdx: bestIdx,
          shellIdx: sIdx,
        });
      }
    });

    return targets;
  }

  function render(nowMs = performance.now()) {
    const elObj = ELEMENTS.find((el) => el.number === protons);
    const mass = protons + neutrons;
    const stab = getStabilityInfo(protons, neutrons);

    let launchedSeaIndices = new Set();
    let inFlightElectrons = [];
    let landedSlots = [];
    let activeCaptured = electronsReleased ? capturedElectrons : 0;

    if (isAnimating && animState) {
      const elapsed = Math.max(0, nowMs - animState.startTime);
      let landed = 0;
      animState.targets.forEach((item, idx) => {
        const startT = idx * animState.staggerMs;
        const endT = startT + animState.flightMs;
        if (elapsed >= startT) {
          launchedSeaIndices.add(item.seaIdx);
          if (elapsed >= endT) {
            landed += 1;
            landedSlots.push(item);
          } else {
            const rawU = (elapsed - startT) / animState.flightMs;
            const eased = 1 - Math.pow(1 - rawU, 3);
            const x = item.sx + (item.tx - item.sx) * eased;
            const y = item.sy + (item.ty - item.sy) * eased;
            inFlightElectrons.push({ x, y, tx: item.tx, ty: item.ty });
          }
        }
      });
      activeCaptured = landed;
      capturedElectrons = landed;
    }

    const netCharge = electronsReleased || isAnimating ? protons - activeCaptured : protons;
    const chargeStr = netCharge > 0 ? `+${netCharge}` : `${netCharge}`;

    if (pCountEl) pCountEl.textContent = `${protons}`;
    if (nCountEl) nCountEl.textContent = `${neutrons}`;
    if (eCountEl) eCountEl.textContent = electronsReleased || isAnimating ? `${activeCaptured}` : 'Sea';

    if (elementNameEl) {
      elementNameEl.textContent = elObj ? `${elObj.name} (${elObj.symbol}) · Z = ${elObj.number}` : 'No Element (0 protons)';
    }
    if (massEl) {
      massEl.textContent = `${mass} amu`;
    }
    if (chargeEl) {
      if (!electronsReleased && !isAnimating) {
        chargeEl.textContent = protons === 0 ? '0' : `+${protons} (Nucleus only)`;
      } else if (netCharge === 0) {
        chargeEl.textContent = '0 (Neutral Atom)';
      } else if (netCharge > 0) {
        chargeEl.textContent = `${chargeStr} (Net Positive — attracting e⁻)`;
      } else {
        chargeEl.textContent = `${chargeStr} (Negative Ion / Anion)`;
      }
    }
    if (stabilityEl) {
      stabilityEl.textContent = stab.label;
      stabilityEl.classList.toggle('is-stable', stab.isStable);
      stabilityEl.classList.toggle('is-unstable', !stab.isStable);
    }
    if (stabilityNoteEl) {
      stabilityNoteEl.textContent = stab.note;
    }

    if (releaseBtn) {
      releaseBtn.disabled = protons === 0 || isAnimating;
      releaseBtn.hidden = electronsReleased || isAnimating;
    }
    if (returnSeaBtn) {
      returnSeaBtn.hidden = !electronsReleased && !isAnimating;
    }
    if (pMinusBtn) pMinusBtn.disabled = isAnimating || protons <= 0;
    if (pPlusBtn) pPlusBtn.disabled = isAnimating || protons >= 20;
    if (nMinusBtn) nMinusBtn.disabled = isAnimating || neutrons <= 0;
    if (nPlusBtn) nPlusBtn.disabled = isAnimating || neutrons >= 28;
    presetBtns.forEach((btn) => {
      btn.disabled = isAnimating;
    });
    if (eMinusBtn) eMinusBtn.disabled = isAnimating || !electronsReleased || capturedElectrons <= 0;
    if (ePlusBtn) ePlusBtn.disabled = isAnimating || !electronsReleased || capturedElectrons >= 20;

    if (statusBanner) {
      if (protons === 0) {
        statusBanner.textContent = 'Add protons and neutrons to build a nucleus inside the sea of electrons.';
      } else if (isAnimating) {
        statusBanner.textContent = `Attracting electrons (${activeCaptured}/${protons})… Net charge is ${chargeStr} (> 0), so positive nucleus keeps pulling e⁻ from the sea.`;
      } else if (!electronsReleased) {
        statusBanner.textContent = `A sea of free electrons surrounds your +${protons} nucleus. Click "Release Electrons" to watch them get pulled in until net charge = 0.`;
      } else if (netCharge === 0) {
        statusBanner.textContent = `✓ Net Charge = 0! The atom is no longer net positive, so electrostatic attraction stops (${capturedElectrons} e⁻ in shells; extra electrons remain in the sea).`;
      } else {
        statusBanner.textContent = `Ion Mode: ${protons} p⁺ and ${capturedElectrons} e⁻ gives a net charge of ${chargeStr}.`;
      }
    }

    if (svgEl) {
      let shellsSvg = '';
      let electronsSvg = '';
      let vectorsSvg = '';

      if (!electronsReleased && !isAnimating) {
        shellsSvg = `
          <circle cx="${CX}" cy="${CY}" r="136" fill="none" stroke="#93C5FD" stroke-width="1.8" stroke-dasharray="6 5" />
          <text x="${CX}" y="16" text-anchor="middle" fill="#0369A1" font-size="11.5" font-weight="700">Surrounding Sea of Free Electrons (e⁻)</text>
        `;
        electronsSvg = SEA_PARTICLES.map(
          (pt, idx) => `
          <g class="sea-electron" style="--sea-delay: ${(idx % 6) * 0.25}s;">
            <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="6" fill="#0284C7" opacity="0.82" stroke="#FFFFFF" stroke-width="1.3" />
            <text x="${pt.x.toFixed(1)}" y="${(pt.y + 0.3).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="8" font-weight="700">−</text>
          </g>`
        ).join('');
      } else if (isAnimating && animState) {
        // Guide shell rings for the target neutral atom
        const targetShellCounts = getFirst20Shells(protons);
        SHELL_RADII.forEach((r, sIdx) => {
          if (targetShellCounts[sIdx] > 0) {
            shellsSvg += `<circle cx="${CX}" cy="${CY}" r="${r}" fill="none" stroke="#94A3B8" stroke-width="1.6" stroke-dasharray="4 4" />`;
          }
        });
        shellsSvg += `<text x="${CX}" y="16" text-anchor="middle" fill="#0369A1" font-size="11.5" font-weight="700">Attracting e⁻ into Shells · Net Charge: ${chargeStr}</text>`;

        // Unlaunched sea electrons remain in the outer sea
        SEA_PARTICLES.forEach((pt, idx) => {
          if (launchedSeaIndices.has(idx)) return;
          electronsSvg += `
            <g>
              <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="5.6" fill="#0284C7" opacity="0.65" stroke="#FFFFFF" stroke-width="1.2" />
              <text x="${pt.x.toFixed(1)}" y="${(pt.y + 0.3).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="7.5" font-weight="700">−</text>
            </g>`;
        });

        // Landed electrons locked in shells
        landedSlots.forEach((slot) => {
          electronsSvg += `
            <g>
              <circle cx="${slot.tx.toFixed(1)}" cy="${slot.ty.toFixed(1)}" r="6.6" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.5" />
              <text x="${slot.tx.toFixed(1)}" y="${(slot.ty + 0.3).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="8.8" font-weight="700">−</text>
            </g>`;
        });

        // In-flight attracted electrons with electrostatic pull line toward nucleus
        inFlightElectrons.forEach((fly) => {
          const dx = CX - fly.x;
          const dy = CY - fly.y;
          const dist = Math.hypot(dx, dy) || 1;
          const stopDist = Math.max(0, dist - 34);
          const ax = fly.x + (dx / dist) * stopDist;
          const ay = fly.y + (dy / dist) * stopDist;
          vectorsSvg += `<line x1="${fly.x.toFixed(1)}" y1="${fly.y.toFixed(1)}" x2="${ax.toFixed(1)}" y2="${ay.toFixed(1)}" stroke="#38BDF8" stroke-width="1.8" stroke-dasharray="3 3" opacity="0.9" />`;
          electronsSvg += `
            <g>
              <circle cx="${fly.x.toFixed(1)}" cy="${fly.y.toFixed(1)}" r="9.5" fill="#38BDF8" opacity="0.28" />
              <circle cx="${fly.x.toFixed(1)}" cy="${fly.y.toFixed(1)}" r="6.8" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.6" />
              <text x="${fly.x.toFixed(1)}" y="${(fly.y + 0.3).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="9" font-weight="700">−</text>
            </g>`;
        });
      } else {
        // Post-release settled shells (+ excess sea electrons softly outside when neutral/anion)
        const shellCounts = getFirst20Shells(capturedElectrons);
        SHELL_RADII.forEach((r, sIdx) => {
          const count = shellCounts[sIdx];
          if (count > 0 || (sIdx === 0 && capturedElectrons === 0)) {
            shellsSvg += `<circle cx="${CX}" cy="${CY}" r="${r}" fill="none" stroke="#64748B" stroke-width="1.8" />`;
          }
          for (let k = 0; k < count; k += 1) {
            const angle = (Math.PI * 2 * k) / count - Math.PI / 2;
            const ex = CX + r * Math.cos(angle);
            const ey = CY + r * Math.sin(angle);
            electronsSvg += `
              <g>
                <circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="6.6" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.5" />
                <text x="${ex.toFixed(1)}" y="${(ey + 0.3).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="8.8" font-weight="700">−</text>
              </g>`;
          }
        });

        // Show unattracted excess sea electrons faintly outside once neutral
        const settledUsed = new Set(buildAttractionTargets(capturedElectrons).map((t) => t.seaIdx));
        SEA_PARTICLES.forEach((pt, idx) => {
          if (settledUsed.has(idx)) return;
          electronsSvg += `
            <g class="sea-electron" style="--sea-delay: ${(idx % 6) * 0.25}s;" opacity="0.32">
              <circle cx="${pt.x.toFixed(1)}" cy="${pt.y.toFixed(1)}" r="5.2" fill="#0284C7" stroke="#FFFFFF" stroke-width="1" />
              <text x="${pt.x.toFixed(1)}" y="${(pt.y + 0.3).toFixed(1)}" text-anchor="middle" dominant-baseline="central" fill="#FFFFFF" font-size="7" font-weight="700">−</text>
            </g>`;
        });

        const captionText =
          netCharge === 0
            ? `Neutral (${capturedElectrons} e⁻ bound) · Remaining sea e⁻ unattracted`
            : `Captured Electrons in Shells (${capturedElectrons} e⁻ · Net ${chargeStr})`;
        shellsSvg += `<text x="${CX}" y="16" text-anchor="middle" fill="${netCharge === 0 ? '#047857' : '#0369A1'}" font-size="11.2" font-weight="700">${captionText}</text>`;
      }

      svgEl.innerHTML = `
        ${shellsSvg}
        ${vectorsSvg}
        <circle cx="${CX}" cy="${CY}" r="32" fill="${stab.isStable || protons === 0 ? '#FEF2F2' : '#FFFBEB'}" stroke="${stab.isStable ? '#10B981' : '#F59E0B'}" stroke-width="2" />
        ${renderNucleons(CX, CY)}
        ${electronsSvg}
      `;
    }
  }

  function startAttractionAnimation() {
    if (protons <= 0) return;
    cancelAnimation();

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      electronsReleased = true;
      capturedElectrons = protons;
      hasReleasedOnce = true;
      render();
      persist();
      return;
    }

    const targets = buildAttractionTargets(protons);
    const staggerMs = protons <= 4 ? 260 : protons <= 10 ? 180 : 120;
    const flightMs = 420;
    const totalDuration = Math.max(0, (targets.length - 1) * staggerMs + flightMs);

    isAnimating = true;
    electronsReleased = true;
    capturedElectrons = 0;
    hasReleasedOnce = true;

    const startTime = performance.now();
    animState = { startTime, staggerMs, flightMs, targets };

    function tick(now) {
      if (!isAnimating || !animState) return;
      render(now);
      if (now - startTime < totalDuration) {
        animFrameId = window.requestAnimationFrame(tick);
      } else {
        isAnimating = false;
        animFrameId = null;
        animState = null;
        capturedElectrons = protons;
        render(now);
        persist();
      }
    }

    render(startTime);
    animFrameId = window.requestAnimationFrame(tick);
  }

  container.querySelectorAll('[data-sea-delta]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (isAnimating) return;
      const [kind, deltaStr] = (btn.dataset.seaDelta || '').split(':');
      const delta = Number.parseInt(deltaStr, 10);
      if (kind === 'p') {
        const next = Math.max(0, Math.min(20, protons + delta));
        if (next !== protons) {
          protons = next;
          electronsReleased = false;
          capturedElectrons = 0;
        }
      } else if (kind === 'n') {
        const next = Math.max(0, Math.min(28, neutrons + delta));
        if (next !== neutrons) {
          neutrons = next;
        }
      } else if (kind === 'e' && electronsReleased) {
        const next = Math.max(0, Math.min(20, capturedElectrons + delta));
        if (next !== capturedElectrons) {
          capturedElectrons = next;
        }
      }
      render();
      persist();
    });
  });

  presetBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      cancelAnimation();
      const [pStr, nStr] = (btn.dataset.seaPreset || '1:0').split(':');
      protons = Number.parseInt(pStr, 10);
      neutrons = Number.parseInt(nStr, 10);
      electronsReleased = false;
      capturedElectrons = 0;
      render();
      persist();
    });
  });

  releaseBtn?.addEventListener('click', () => {
    startAttractionAnimation();
  });

  returnSeaBtn?.addEventListener('click', () => {
    cancelAnimation();
    electronsReleased = false;
    capturedElectrons = 0;
    render();
    persist();
  });

  resetBtn?.addEventListener('click', () => {
    cancelAnimation();
    protons = 1;
    neutrons = 0;
    electronsReleased = false;
    capturedElectrons = 0;
    render();
    persist();
  });

  render();
}

/* ==========================================================================
   Lesson 2 Interactive Engines:
   1. Label the Atom Hotspots (1-5)
   2. Subatomic Particles Table (Select/Check)
   3. Electron Shell Builder (C, Ne, Ca with 2, 8, 8, 2 rule)
   4. Problem Set Validator (Numeric / Text with worked feedback)
   5. Rubric Keyword Explainer (Reusable for written justifications)
   ========================================================================== */

export function initAtomLabeler(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const pins = Array.from(container.querySelectorAll('[data-atom-pin]'));
  const rows = Array.from(container.querySelectorAll('[data-hotspot-row]'));
  const selects = Array.from(container.querySelectorAll('[data-hotspot-select]'));
  const checkBtn = container.querySelector('[data-atom-check]');
  const resetBtn = container.querySelector('[data-atom-reset]');
  const detailEl = container.querySelector('[data-atom-detail]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Label the Atom';

  const PIN_HINTS = {
    '1': 'Pin 1 points to the tiny negatively charged particle orbiting outside the nucleus.',
    '2': 'Pin 2 points to an uncharged (neutral) nucleon packed inside the central core.',
    '3': 'Pin 3 brackets the dense central core made of both protons and neutrons.',
    '4': 'Pin 4 points to a positively charged nucleon inside the central core.',
    '5': 'Pin 5 points to the concentric circular energy ring where electrons move.',
  };

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const values = { ...(saved.values || {}) };
  let activePin = '1';

  function setActivePin(pinId) {
    activePin = pinId;
    pins.forEach((p) => p.classList.toggle('is-active', p.dataset.atomPin === pinId));
    rows.forEach((r) => r.classList.toggle('is-active', r.dataset.hotspotRow === pinId));
    if (detailEl) {
      detailEl.textContent = PIN_HINTS[pinId] || '';
    }
  }

  function persist(completed) {
    const summary = selects
      .map((s) => `#${s.dataset.hotspotSelect}=${s.value || '?'}`)
      .join(', ');
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'atom-label',
        title: titleText,
        values,
        answerSummary: summary,
        completed: Boolean(completed),
      },
      totalActivities
    );
  }

  function evaluate(save) {
    let correct = 0;
    let answered = 0;

    selects.forEach((sel) => {
      const pinId = sel.dataset.hotspotSelect;
      const expected = sel.dataset.answer;
      const chosen = sel.value;
      values[pinId] = chosen;

      const row = rows.find((r) => r.dataset.hotspotRow === pinId);
      const pin = pins.find((p) => p.dataset.atomPin === pinId);
      row?.classList.remove('is-correct', 'is-incorrect');
      pin?.classList.remove('is-correct', 'is-incorrect');

      if (chosen) {
        answered += 1;
        const ok = chosen === expected;
        row?.classList.add(ok ? 'is-correct' : 'is-incorrect');
        pin?.classList.add(ok ? 'is-correct' : 'is-incorrect');
        if (ok) correct += 1;
      }
    });

    const allCorrect = answered === selects.length && correct === selects.length;
    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allCorrect);
      feedbackEl.classList.toggle('is-error', !allCorrect);
      if (answered < selects.length) {
        feedbackEl.textContent = `Label all 5 parts (${answered}/5 selected) before checking.`;
      } else if (allCorrect) {
        feedbackEl.textContent = '✓ All 5 parts of the atom labeled accurately!';
      } else {
        feedbackEl.textContent = `✕ ${correct} of ${selects.length} correct. Click any red pin to read its hint and try again.`;
      }
    }

    if (save) persist(allCorrect);
  }

  pins.forEach((pin) => {
    pin.addEventListener('click', () => {
      const id = pin.dataset.atomPin;
      setActivePin(id);
      const sel = selects.find((s) => s.dataset.hotspotSelect === id);
      sel?.focus();
    });
  });

  selects.forEach((sel) => {
    const pinId = sel.dataset.hotspotSelect;
    if (typeof values[pinId] === 'string') {
      sel.value = values[pinId];
    }
    sel.addEventListener('focus', () => setActivePin(pinId));
    sel.addEventListener('change', () => {
      values[pinId] = sel.value;
      const row = rows.find((r) => r.dataset.hotspotRow === pinId);
      const pin = pins.find((p) => p.dataset.atomPin === pinId);
      row?.classList.remove('is-correct', 'is-incorrect');
      pin?.classList.remove('is-correct', 'is-incorrect');
      persist(false);
    });
  });

  checkBtn?.addEventListener('click', () => evaluate(true));
  resetBtn?.addEventListener('click', () => {
    selects.forEach((s) => {
      s.value = '';
      values[s.dataset.hotspotSelect] = '';
    });
    rows.forEach((r) => r.classList.remove('is-correct', 'is-incorrect'));
    pins.forEach((p) => p.classList.remove('is-correct', 'is-incorrect'));
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
    setActivePin('1');
    persist(false);
  });

  setActivePin(activePin);
  if (saved.completed) evaluate(false);
}

export function initSubatomicTable(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const selects = Array.from(container.querySelectorAll('[data-sub-cell]'));
  const checkBtn = container.querySelector('[data-sub-check]');
  const resetBtn = container.querySelector('[data-sub-reset]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Subatomic Particles Table';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const values = { ...(saved.values || {}) };

  function persist(completed) {
    const summary = selects.map((s) => `${s.dataset.subCell}=${s.value || '?'}`).join(', ');
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'subatomic-table',
        title: titleText,
        values,
        answerSummary: summary,
        completed: Boolean(completed),
      },
      totalActivities
    );
  }

  function evaluate(save) {
    let correct = 0;
    let answered = 0;

    selects.forEach((sel) => {
      const key = sel.dataset.subCell;
      const expected = sel.dataset.answer;
      const chosen = sel.value;
      values[key] = chosen;
      sel.classList.remove('is-correct', 'is-incorrect');

      if (chosen) {
        answered += 1;
        const ok = chosen === expected;
        sel.classList.add(ok ? 'is-correct' : 'is-incorrect');
        if (ok) correct += 1;
      }
    });

    const allCorrect = answered === selects.length && correct === selects.length;
    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allCorrect);
      feedbackEl.classList.toggle('is-error', !allCorrect);
      if (answered < selects.length) {
        feedbackEl.textContent = `Complete all ${selects.length} cells (${answered}/${selects.length} filled) then check.`;
      } else if (allCorrect) {
        feedbackEl.textContent =
          '✓ Perfect! Protons (+1, 1 amu) and Neutrons (0, 1 amu) sit in the nucleus; Electrons (-1, ~1/1836 amu) orbit in shells.';
      } else {
        feedbackEl.textContent = `✕ ${correct} of ${selects.length} cells correct. Remember: protons and neutrons have ~1 amu mass in the nucleus, while electrons are tiny (~1/1836 amu) in shells.`;
      }
    }

    if (save) persist(allCorrect);
  }

  selects.forEach((sel) => {
    const key = sel.dataset.subCell;
    if (typeof values[key] === 'string') sel.value = values[key];
    sel.addEventListener('change', () => {
      values[key] = sel.value;
      sel.classList.remove('is-correct', 'is-incorrect');
      persist(false);
    });
  });

  checkBtn?.addEventListener('click', () => evaluate(true));
  resetBtn?.addEventListener('click', () => {
    selects.forEach((sel) => {
      sel.value = '';
      sel.classList.remove('is-correct', 'is-incorrect');
      values[sel.dataset.subCell] = '';
    });
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
    persist(false);
  });

  if (saved.completed) evaluate(false);
}

export function initShellBuilder(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const tabBtns = Array.from(container.querySelectorAll('[data-shell-target]'));
  const svgEl = container.querySelector('#shell-builder-svg');
  const readoutEl = container.querySelector('#shell-live-readout');
  const checkBtn = container.querySelector('[data-shell-check]');
  const clearBtn = container.querySelector('[data-shell-clear]');
  const autofillBtn = container.querySelector('[data-shell-autofill]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Electron Shell Builder';

  const TARGETS = {
    C: { symbol: 'C', name: 'Carbon', protons: 6, neutrons: 6, expected: [2, 4, 0, 0] },
    Ne: { symbol: 'Ne', name: 'Neon', protons: 10, neutrons: 10, expected: [2, 8, 0, 0] },
    Ca: { symbol: 'Ca', name: 'Calcium', protons: 20, neutrons: 20, expected: [2, 8, 8, 2] },
  };
  const MAX_CAPS = [2, 8, 8, 2];
  const SHELL_RADII = [46, 74, 102, 130];

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  let activeKey = saved.activeKey && TARGETS[saved.activeKey] ? saved.activeKey : 'C';
  const configs = {
    C: Array.isArray(saved.configs?.C) ? [...saved.configs.C] : [0, 0, 0, 0],
    Ne: Array.isArray(saved.configs?.Ne) ? [...saved.configs.Ne] : [0, 0, 0, 0],
    Ca: Array.isArray(saved.configs?.Ca) ? [...saved.configs.Ca] : [0, 0, 0, 0],
  };
  const solvedSet = new Set(Array.isArray(saved.solved) ? saved.solved : []);

  function formatArrangement(arr) {
    let lastNonZero = -1;
    for (let i = arr.length - 1; i >= 0; i -= 1) {
      if (arr[i] > 0) {
        lastNonZero = i;
        break;
      }
    }
    if (lastNonZero === -1) return '0';
    return arr.slice(0, lastNonZero + 1).join(', ');
  }

  function persist() {
    const allSolved = Object.keys(TARGETS).every((k) => solvedSet.has(k));
    const summary = Object.keys(TARGETS)
      .map((k) => `${k}: [${formatArrangement(configs[k])}]${solvedSet.has(k) ? ' ✓' : ''}`)
      .join(' | ');
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'shell-builder',
        title: titleText,
        activeKey,
        configs,
        solved: Array.from(solvedSet),
        answerSummary: summary,
        completed: allSolved,
      },
      totalActivities
    );
  }

  function addElectron(shellIdx, delta) {
    const arr = configs[activeKey];
    const next = arr[shellIdx] + delta;
    if (next < 0 || next > MAX_CAPS[shellIdx]) return;
    arr[shellIdx] = next;
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
    render();
    persist();
  }

  function render() {
    const target = TARGETS[activeKey];
    const arr = configs[activeKey];
    const totalPlaced = arr.reduce((a, b) => a + b, 0);

    tabBtns.forEach((btn) => {
      const key = btn.dataset.shellTarget;
      btn.classList.toggle('is-active', key === activeKey);
      btn.classList.toggle('is-done', solvedSet.has(key));
      btn.setAttribute('aria-pressed', key === activeKey ? 'true' : 'false');
    });

    for (let i = 0; i < 4; i += 1) {
      const countEl = container.querySelector(`[data-shell-count="${i}"]`);
      if (countEl) countEl.textContent = `${arr[i]}`;
      const minusBtn = container.querySelector(`[data-shell-delta="${i}:-1"]`);
      const plusBtn = container.querySelector(`[data-shell-delta="${i}:1"]`);
      if (minusBtn) minusBtn.disabled = arr[i] <= 0;
      if (plusBtn) plusBtn.disabled = arr[i] >= MAX_CAPS[i];
    }

    if (readoutEl) {
      readoutEl.innerHTML = `
        <strong>${target.name} (${target.symbol})</strong> · Target:
        <span class="tabular-nums">${target.protons} e⁻</span> · Placed:
        <span class="tabular-nums">${totalPlaced}</span> · Arrangement:
        <span class="tabular-nums">[${formatArrangement(arr)}]</span>
      `;
    }

    if (svgEl) {
      const cx = 150;
      const cy = 150;
      let ringsSvg = '';
      let electronsSvg = '';

      SHELL_RADII.forEach((r, sIdx) => {
        ringsSvg += `
          <circle
            class="shell-ring-hit"
            data-ring-click="${sIdx}"
            cx="${cx}"
            cy="${cy}"
            r="${r}"
            fill="none"
            stroke="#94A3B8"
            stroke-width="1.8"
            stroke-dasharray="${arr[sIdx] > 0 ? 'none' : '4 4'}"
          />
        `;
        const count = arr[sIdx];
        for (let k = 0; k < count; k += 1) {
          const angle = (Math.PI * 2 * k) / count - Math.PI / 2;
          const ex = cx + r * Math.cos(angle);
          const ey = cy + r * Math.sin(angle);
          electronsSvg += `<circle cx="${ex.toFixed(1)}" cy="${ey.toFixed(1)}" r="5.5" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.5" />`;
        }
      });

      svgEl.innerHTML = `
        ${ringsSvg}
        <circle cx="${cx}" cy="${cy}" r="22" fill="#FEF2F2" stroke="#C93336" stroke-width="2.2" />
        <text x="${cx}" y="${cy - 3}" text-anchor="middle" fill="#0F172A" font-family="IBM Plex Mono, monospace" font-weight="700" font-size="11">${target.protons}p⁺</text>
        <text x="${cx}" y="${cy + 10}" text-anchor="middle" fill="#475569" font-family="IBM Plex Mono, monospace" font-weight="600" font-size="10">${target.neutrons}n⁰</text>
        ${electronsSvg}
      `;

      svgEl.querySelectorAll('[data-ring-click]').forEach((ring) => {
        ring.addEventListener('click', () => {
          const idx = Number.parseInt(ring.dataset.ringClick || '0', 10);
          addElectron(idx, 1);
        });
      });
    }
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      activeKey = btn.dataset.shellTarget || 'C';
      if (feedbackEl) {
        feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
        feedbackEl.textContent = '';
      }
      render();
      persist();
    });
  });

  container.querySelectorAll('[data-shell-delta]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [idxStr, deltaStr] = (btn.dataset.shellDelta || '0:0').split(':');
      addElectron(Number.parseInt(idxStr, 10), Number.parseInt(deltaStr, 10));
    });
  });

  checkBtn?.addEventListener('click', () => {
    const target = TARGETS[activeKey];
    const arr = configs[activeKey];
    const isMatch = target.expected.every((val, i) => val === arr[i]);
    const total = arr.reduce((a, b) => a + b, 0);

    if (isMatch) {
      solvedSet.add(activeKey);
    }

    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', isMatch);
      feedbackEl.classList.toggle('is-error', !isMatch);
      if (isMatch) {
        const extra =
          activeKey === 'Ca'
            ? ' Notice Shell 4 starts filling after Shell 3 reaches 8 (2, 8, 8, 2)!'
            : '';
        feedbackEl.textContent = `✓ Correct! ${target.name} (${target.symbol}) has arrangement [${formatArrangement(target.expected)}].${extra} (${solvedSet.size}/3 elements completed)`;
      } else if (total !== target.protons) {
        feedbackEl.textContent = `✕ Neutral ${target.name} needs ${target.protons} electrons total (currently ${total}). Fill inner shells completely first (2, 8, 8, 2).`;
      } else {
        feedbackEl.textContent =
          '✕ Fill from the inside out using the 2, 8, 8, 2 pattern (2 in Shell 1, 8 in Shell 2, 8 in Shell 3, 2 in Shell 4).';
      }
    }

    render();
    persist();
  });

  clearBtn?.addEventListener('click', () => {
    configs[activeKey] = [0, 0, 0, 0];
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
    render();
    persist();
  });

  autofillBtn?.addEventListener('click', () => {
    const target = TARGETS[activeKey];
    configs[activeKey] = [...target.expected];
    solvedSet.add(activeKey);
    if (feedbackEl) {
      feedbackEl.classList.add('is-visible', 'is-success');
      feedbackEl.classList.remove('is-error');
      feedbackEl.textContent = `✓ ${target.name} (${target.symbol}) filled: [${formatArrangement(target.expected)}].`;
    }
    render();
    persist();
  });

  render();
}

export function initProblemSet(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const inputs = Array.from(container.querySelectorAll('[data-prob-id]'));
  const checkBtn = container.querySelector('[data-prob-check]');
  const resetBtn = container.querySelector('[data-prob-reset]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const workedNotes = Array.from(container.querySelectorAll('[data-worked-note]'));
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Problem Set';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const values = { ...(saved.values || {}) };

  function normalize(str, mode) {
    const raw = String(str || '').trim().toLowerCase();
    if (mode === 'shells') {
      return raw.replace(/[\s.,;-]+/g, ',').replace(/^,|,$/g, '');
    }
    if (mode === 'charge') {
      return raw.replace(/\s+/g, '');
    }
    return raw.replace(/\s+/g, ' ');
  }

  function evaluate(save) {
    let correct = 0;
    let filled = 0;

    inputs.forEach((input) => {
      const id = input.dataset.probId;
      const mode = input.dataset.norm || 'text';
      const accepted = (input.dataset.answer || '')
        .split('|')
        .map((a) => normalize(a, mode));
      const val = input.value;
      values[id] = val;

      input.classList.remove('is-correct', 'is-incorrect');
      if (val.trim()) {
        filled += 1;
        const ok = accepted.includes(normalize(val, mode));
        input.classList.add(ok ? 'is-correct' : 'is-incorrect');
        if (ok) correct += 1;
      }
    });

    const allCorrect = filled === inputs.length && correct === inputs.length;
    workedNotes.forEach((note) => {
      if (filled > 0) note.removeAttribute('hidden');
    });

    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allCorrect);
      feedbackEl.classList.toggle('is-error', !allCorrect);
      if (filled < inputs.length) {
        feedbackEl.textContent = `Fill in all ${inputs.length} fields (${filled}/${inputs.length} entered) then check.`;
      } else if (allCorrect) {
        feedbackEl.textContent = `✓ All ${inputs.length} calculations correct! Review the worked notes below.`;
      } else {
        feedbackEl.textContent = `✕ ${correct} of ${inputs.length} correct. Check any red boxes using the worked hints.`;
      }
    }

    if (save) {
      const summary = inputs.map((i) => `${i.dataset.probId}=${i.value.trim() || '?'}`).join(', ');
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'problem-set',
          title: titleText,
          values,
          answerSummary: summary,
          completed: allCorrect,
        },
        totalActivities
      );
    }
  }

  inputs.forEach((input) => {
    const id = input.dataset.probId;
    if (typeof values[id] === 'string') input.value = values[id];
    input.addEventListener('input', () => {
      input.classList.remove('is-correct', 'is-incorrect');
      values[id] = input.value;
    });
  });

  checkBtn?.addEventListener('click', () => evaluate(true));
  resetBtn?.addEventListener('click', () => {
    inputs.forEach((input) => {
      input.value = '';
      input.classList.remove('is-correct', 'is-incorrect');
      values[input.dataset.probId] = '';
    });
    workedNotes.forEach((note) => note.setAttribute('hidden', ''));
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'problem-set',
        title: titleText,
        values,
        answerSummary: 'Reset',
        completed: false,
      },
      totalActivities
    );
  });

  if (saved.completed) evaluate(false);
}

export function initRubricExplain(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const cards = Array.from(container.querySelectorAll('[data-rubric-card]'));
  const checkBtn = container.querySelector('[data-rubric-check]');
  const modelBtn = container.querySelector('[data-rubric-model-btn]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Written Explanations';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const texts = { ...(saved.texts || {}) };
  let showingModels = false;

  function evaluateCard(card) {
    const textarea = card.querySelector('textarea');
    const text = (textarea?.value || '').toLowerCase();
    const checks = Array.from(card.querySelectorAll('[data-kw-pattern]'));
    let metCount = 0;

    checks.forEach((item) => {
      const pattern = new RegExp(item.dataset.kwPattern || '', 'i');
      const met = pattern.test(text);
      item.classList.toggle('is-met', met);
      if (met) metCount += 1;
    });

    return text.trim().length >= 25 && metCount === checks.length;
  }

  function persist(showFeedback) {
    let cardsMet = 0;
    cards.forEach((card) => {
      const id = card.dataset.rubricCard;
      const textarea = card.querySelector('textarea');
      texts[id] = textarea?.value || '';
      if (evaluateCard(card)) cardsMet += 1;
    });

    const allDone = cards.length > 0 && cardsMet === cards.length;
    if (showFeedback && feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allDone);
      feedbackEl.classList.toggle('is-error', !allDone);
      feedbackEl.textContent = allDone
        ? '✓ Both scientific explanations include all key force mechanisms!'
        : `${cardsMet} of ${cards.length} explanations complete. Include all listed rubric concepts in full sentences.`;
    }

    const summary = cards
      .map((c) => `${c.dataset.rubricCard}: ${(texts[c.dataset.rubricCard] || '').trim() || 'empty'}`)
      .join(' | ');

    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'rubric-explain',
        title: titleText,
        texts,
        answerSummary: summary,
        completed: allDone,
      },
      totalActivities
    );
  }

  cards.forEach((card) => {
    const id = card.dataset.rubricCard;
    const textarea = card.querySelector('textarea');
    if (textarea && typeof texts[id] === 'string') {
      textarea.value = texts[id];
    }
    evaluateCard(card);
    let timer = null;
    textarea?.addEventListener('input', () => {
      evaluateCard(card);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => persist(false), 220);
    });
  });

  checkBtn?.addEventListener('click', () => persist(true));
  modelBtn?.addEventListener('click', () => {
    showingModels = !showingModels;
    modelBtn.textContent = showingModels ? 'Hide Model Answers' : 'Show Model Answers';
    cards.forEach((card) => {
      const box = card.querySelector('[data-rubric-model]');
      if (!box) return;
      if (showingModels) box.removeAttribute('hidden');
      else box.setAttribute('hidden', '');
    });
  });

  if (saved.completed) persist(false);
}

/* ==========================================================================
   Stage 3 Initializers (Lesson 3 & Lesson 4)
   ========================================================================== */

export function initCosmicTimeline(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const tabBtns = Array.from(container.querySelectorAll('[data-cosmic-stage]'));
  const svg = container.querySelector('#cosmic-timeline-svg');
  const badge = container.querySelector('[data-cosmic-badge]');
  const title = container.querySelector('[data-cosmic-title]');
  const explanation = container.querySelector('[data-cosmic-explanation]');
  const question = container.querySelector('[data-cosmic-question]');
  const reveal = container.querySelector('[data-cosmic-reveal]');
  const progressBadge = container.querySelector('[data-cosmic-visited]');
  const titleText = container.querySelector('.activity-title').textContent.trim();

  function nucleus(x, y, protons, neutrons, label, details, motion = '') {
    const count = protons + neutrons;
    const columns = Math.ceil(Math.sqrt(count));
    const rows = Math.ceil(count / columns);
    const dots = Array.from({ length: count }, (_, i) => {
      const row = Math.floor(i / columns);
      const rowLength = Math.min(columns, count - row * columns);
      const cx = (i % columns - (rowLength - 1) / 2) * 15;
      const cy = (row - (rows - 1) / 2) * 15;
      const isProton = i < protons;
      return `<circle cx="${cx}" cy="${cy}" r="7.5" fill="${isProton ? '#DC2626' : '#64748B'}" stroke="white" />
        ${isProton ? `<text class="cosmic-proton-mark" x="${cx}" y="${cy + 4}">+</text>` : ''}`;
    }).join('');
    return `<g transform="translate(${x} ${y})">
      <g class="${motion}">${dots}</g>
      <text y="51">${escapeHtml(label)}</text>
      <text class="cosmic-svg-detail" y="71">${escapeHtml(details)}</text>
    </g>`;
  }

  function reaction(inputs, product, isFusion) {
    const combining = product && isFusion ? 'cosmic-fusion-input' : '';
    return `<g class="cosmic-svg-label">
      ${inputs.map(([x, ...model]) => nucleus(x, 74, ...model, combining)).join('')}
      <text x="317" y="80" font-size="24">→</text>
      ${product
        ? nucleus(414, 74, ...product, isFusion ? 'cosmic-fusion-product' : '')
        : '<text x="414" y="85" font-size="32">?</text><text x="414" y="125">Product</text>'}
    </g>`;
  }

  const helium = [2, 2, 'Helium-4', '2 protons'];
  const carbon = [6, 6, 'Carbon-12', '6 protons'];
  const oxygen = [8, 8, 'Oxygen-16', '8 protons'];
  const threeHelium = [48, 142, 236].map((x) => [x, ...helium]);
  const carbonAndHelium = [[72, ...carbon], [211, ...helium]];
  const capture = [[72, ...carbon], [211, 0, 1, 'Neutron', '0 protons']];
  const stages = {
    'big-bang': {
      badge: 'First few minutes',
      title: 'The first nuclei',
      steps: [
        {
          question: 'Think back to the atom builder. Which particle determines the element? Name the elements with one and two protons.',
          button: 'Reveal the elements and their mass shares',
          imageLabel: 'Two mystery nuclei. The first contains one proton. The second contains two protons and two neutrons.',
          graphic: `<g class="cosmic-svg-label">
            ${nucleus(145, 74, 1, 0, 'Which element?', '1 proton')}
            ${nucleus(335, 74, 2, 2, 'Which element?', '2 protons')}
          </g>`,
        },
        {
          explanation: 'One proton identifies hydrogen. Two identify helium. After the first few minutes, the early universe contained about 75% hydrogen and 25% helium by mass, with traces of lithium. Electrons joined nuclei to form atoms much later.',
          imageLabel: 'Early universe by mass. Hydrogen about 75 percent, helium about 25 percent. Trace lithium is too small to show.',
          graphic: `<g class="cosmic-svg-label">
            <text x="240" y="46">Early universe · Share by mass</text>
            <rect x="20" y="66" width="330" height="49" rx="4" fill="#0E7490" />
            <rect x="350" y="66" width="110" height="49" rx="4" fill="#6D28D9" />
            <text x="185" y="97">Hydrogen ≈ 75%</text>
            <text x="405" y="88">Helium</text><text x="405" y="106">≈ 25%</text>
            <text x="240" y="149" class="cosmic-svg-detail">Trace lithium is too small to show</text>
          </g>`,
        },
      ],
    },
    stars: {
      badge: 'In helium-burning stars',
      title: 'Fusion builds new elements',
      steps: [
        {
          question: 'Each helium nucleus has two protons. If three helium nuclei end up in one nucleus, how many protons will it have? Which element is that?',
          button: 'Fuse the three helium nuclei',
          imageLabel: 'Three helium-4 nuclei, each with two protons and two neutrons. Predict the product.',
          graphic: reaction(threeHelium, null, true),
        },
        {
          explanation: '2 + 2 + 2 = 6 protons. The product is carbon-12. This model shows the starting nuclei and the final product.',
          button: 'Prepare carbon and helium',
          imageLabel: 'Three helium-4 nuclei form carbon-12, with six protons and six neutrons.',
          graphic: reaction(threeHelium, carbon, true),
        },
        {
          question: 'Carbon has six protons and helium has two. Predict the new element and whether its atomic number will be odd or even.',
          button: 'Fuse carbon and helium',
          imageLabel: 'Carbon-12 has six protons. Helium-4 has two protons. Predict the product.',
          graphic: reaction(carbonAndHelium, null, true),
        },
        {
          explanation: '6 + 2 = 8 protons. The product is oxygen-16. Adding two protons to an even number gives another even number. This helps explain why even atomic numbers often form peaks in the abundance chart.',
          imageLabel: 'Carbon-12 plus helium-4 makes oxygen-16, with eight protons and eight neutrons.',
          graphic: reaction(carbonAndHelium, oxygen, true),
        },
      ],
    },
    supernova: {
      badge: 'In ageing stars and stellar events',
      title: 'Nuclei can capture neutrons',
      steps: [
        {
          question: 'If this carbon nucleus captures one neutron, will its element change straight away? Use the proton-count rule to explain.',
          button: 'Add one neutron',
          imageLabel: 'Carbon-12, with six protons and six neutrons, and one free neutron. Predict the product.',
          graphic: reaction(capture, null, false),
        },
        {
          explanation: 'The nucleus still has six protons, so it is still carbon. It now has seven neutrons. In other cases, a nucleus that captures a neutron can later decay and change its proton count. Neutron capture can build heavier nuclei slowly in ageing stars or rapidly in events such as neutron-star mergers.',
          imageLabel: 'Carbon-12 captures a neutron and becomes carbon-13, with six protons and seven neutrons.',
          graphic: reaction(capture, [6, 7, 'Carbon-13', '6 protons · 7 neutrons'], false),
        },
      ],
    },
  };

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const stageIds = Object.keys(stages);
  const steps = Object.fromEntries(stageIds.map((id) => {
    const savedStep = saved.steps?.[id];
    return [id, Number.isInteger(savedStep) && savedStep >= 0 && savedStep < stages[id].steps.length ? savedStep : 0];
  }));
  const completedStages = new Set(Array.isArray(saved.completedStages)
    ? saved.completedStages.filter((id) => stageIds.includes(id))
    : saved.completed ? stageIds : []);
  let currentStage = stageIds.includes(saved.currentStage) ? saved.currentStage : 'big-bang';

  function render() {
    const stage = stages[currentStage];
    const step = stage.steps[steps[currentStage]];
    tabBtns.forEach((btn) => {
      const active = btn.dataset.cosmicStage === currentStage;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    badge.textContent = stage.badge;
    title.textContent = stage.title;
    svg.setAttribute('aria-label', step.imageLabel);
    svg.innerHTML = step.graphic;
    explanation.textContent = step.explanation || '';
    explanation.hidden = !step.explanation;
    question.textContent = step.question || '';
    question.hidden = !step.question;
    reveal.textContent = step.button || 'Replay this stage';
    progressBadge.textContent = `Completed: ${completedStages.size} / ${stageIds.length} stages`;
  }

  function persist() {
    setActivityResult(lessonId, activityId, {
      type: 'cosmic-timeline',
      title: titleText,
      currentStage,
      steps,
      completedStages: Array.from(completedStages),
      answerSummary: `${completedStages.size}/${stageIds.length} stages completed`,
      completed: completedStages.size === stageIds.length,
    }, totalActivities);
  }

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      currentStage = btn.dataset.cosmicStage;
      render();
      persist();
    });
  });

  reveal.addEventListener('click', () => {
    const lastStep = stages[currentStage].steps.length - 1;
    steps[currentStage] = steps[currentStage] === lastStep ? 0 : steps[currentStage] + 1;
    if (steps[currentStage] === lastStep) completedStages.add(currentStage);
    render();
    persist();
  });

  render();
}

export function initAbundanceChart(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const svgEl = container.querySelector('#abundance-svg');
  const reveal = container.querySelector('[data-abundance-reveal]');
  const prompt = container.querySelector('[data-abundance-prompt]');
  const frame = container.querySelector('.abundance-chart-frame');
  const inspectorRow = container.querySelector('.abundance-inspector-row');
  const check = container.querySelector('.abundance-check-box');
  const oddoToggle = container.querySelector('[data-abundance-oddo]');
  const inspectorEl = container.querySelector('[data-abundance-inspector]');
  const checkBtns = Array.from(container.querySelectorAll('[data-abundance-choice]'));
  const checkFeedback = container.querySelector('[data-abundance-feedback]');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Cosmic Abundance Chart';

  const first30 = ELEMENTS.filter((e) => e.number >= 1 && e.number <= 30 && e.cosmicAbundance != null);
  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const views = [
    {
      prompt: 'Predict which two elements will have the tallest bars.',
      button: 'Reveal the two tallest bars',
      elements: [],
    },
    {
      prompt: 'Hydrogen and helium have the tallest bars. Now predict which is most abundant: nitrogen (7), oxygen (8) or fluorine (9).',
      button: 'Compare nitrogen, oxygen and fluorine',
      elements: [1, 2],
    },
    {
      prompt: 'Oxygen (8) is higher than both neighbours. How does adding a helium nucleus to carbon help explain that peak?',
      button: 'Show all 30 elements',
      elements: [7, 8, 9],
    },
    {
      prompt: 'Inspect more neighbours. Then highlight even and odd atomic numbers to see how often the pattern repeats.',
      button: 'Replay predictions',
      elements: first30.map((el) => el.number),
    },
  ];
  const fullView = views.length - 1;
  let view = Number.isInteger(saved.view) && views[saved.view] ? saved.view : saved.completed ? fullView : 0;
  let highlightOddo = Boolean(saved.highlightOddo);
  let selectedZ = Number.isInteger(saved.selectedZ) ? saved.selectedZ : null;
  let answerChoice = saved.answerChoice || '';

  const originNotes = {
    1: 'Most hydrogen dates to the early universe.',
    2: 'Most helium dates to the early universe. Stars also make helium.',
    3: 'Some lithium dates to the early universe. Later processes also produce it.',
    6: 'Helium fusion inside stars makes carbon-12.',
    8: 'Stars can make oxygen-16 by fusing carbon-12 with helium-4.',
  };

  function renderChart() {
    const elements = first30.filter((el) => views[view].elements.includes(el.number));
    if (elements.length === 0) {
      svgEl.replaceChildren();
      return;
    }
    const width = 760;
    const height = 225;
    const padL = 48;
    const padR = 14;
    const padT = 18;
    const padB = 34;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;
    const minLog = -1; // Be = 0.60 -> log10 = -0.22
    const maxLog = 11; // H = 2.43e10 -> log10 = 10.39
    const barStep = plotW / elements.length;
    const barW = Math.min(96, barStep - 4);

    const gridLines = [0, 3, 6, 9].map((exp) => {
      const y = padT + plotH - ((exp - minLog) / (maxLog - minLog)) * plotH;
      const label = exp === 0 ? '1' : `10^${exp}`;
      return `
        <line x1="${padL}" y1="${y.toFixed(1)}" x2="${width - padR}" y2="${y.toFixed(1)}" stroke="#E2E8F0" stroke-width="1" />
        <text x="${padL - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" fill="#64748B" font-size="9.5" font-family="IBM Plex Mono, monospace">${label}</text>
      `;
    });

    const bars = elements.map((el, idx) => {
      const logVal = Math.log10(el.cosmicAbundance);
      const frac = Math.max(0.03, (logVal - minLog) / (maxLog - minLog));
      const barH = frac * plotH;
      const x = padL + idx * barStep + (barStep - barW) / 2;
      const y = padT + plotH - barH;
      const isEven = el.number % 2 === 0;

      let fill = '#64748B';
      if (view === fullView && highlightOddo) {
        fill = isEven ? '#0284C7' : '#F25C5E';
      } else if (el.number <= 2) {
        fill = '#D97706';
      }

      const isSel = el.number === selectedZ;
      return `
        <g class="abundance-bar-group ${isSel ? 'is-selected' : ''}" data-ab-z="${el.number}" tabindex="0" role="button" aria-pressed="${isSel}" aria-label="${escapeHtml(el.name)} Z=${el.number}">
          <rect class="abundance-bar-rect" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${barW.toFixed(1)}" height="${barH.toFixed(1)}" rx="2.5" fill="${fill}" />
          <text x="${(x + barW / 2).toFixed(1)}" y="${height - 16}" text-anchor="middle" fill="#0F172A" font-size="${view === fullView ? 9 : 13}" font-weight="${isSel ? '800' : '600'}">${view === fullView ? el.symbol : el.name}</text>
          <text x="${(x + barW / 2).toFixed(1)}" y="${height - 5}" text-anchor="middle" fill="#64748B" font-size="8" font-family="IBM Plex Mono, monospace">${el.number}</text>
        </g>
      `;
    });

    svgEl.innerHTML = `
      ${gridLines.join('')}
      <line x1="${padL}" y1="${padT + plotH}" x2="${width - padR}" y2="${padT + plotH}" stroke="#94A3B8" stroke-width="1.2" />
      ${bars.join('')}
    `;

    svgEl.querySelectorAll('[data-ab-z]').forEach((group) => {
      const choose = () => {
        selectedZ = Number(group.dataset.abZ);
        svgEl.querySelectorAll('[data-ab-z]').forEach((bar) => {
          const selected = bar === group;
          bar.classList.toggle('is-selected', selected);
          bar.setAttribute('aria-pressed', String(selected));
        });
        renderInspector();
        persist();
      };
      group.addEventListener('click', choose);
      group.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          e.stopPropagation();
          choose();
        }
      });
    });
  }

  function renderInspector() {
    if (!inspectorEl) return;
    const el = first30.find((item) => item.number === selectedZ && views[view].elements.includes(item.number));
    if (!el) {
      inspectorEl.textContent = 'Select a bar to inspect its abundance.';
      return;
    }
    const parity = el.number % 2 === 0 ? 'Even atomic number' : 'Odd atomic number';
    const formatted =
      el.cosmicAbundance >= 1e6
        ? `${(el.cosmicAbundance / 1e6).toFixed(2)} million`
        : el.cosmicAbundance.toLocaleString();

    inspectorEl.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px;">
        <strong style="font-size:1.05rem; color:var(--text-heading);">${escapeHtml(el.name)} (${el.symbol}) · Z = ${el.number}</strong>
        <span class="tabular-nums" style="font-size:0.8125rem; color:var(--accent-accessible); font-weight:700;">${parity}</span>
      </div>
      <div style="font-size:0.875rem; color:var(--text-body);">
        Relative abundance: <strong class="tabular-nums">${formatted}</strong> (per 1,000,000 Si atoms)
      </div>
      ${originNotes[el.number] ? `<p class="abundance-origin-note">${escapeHtml(originNotes[el.number])}</p>` : ''}
    `;
  }

  function applyCheckUI() {
    const isCorrect = answerChoice === 'even';
    checkBtns.forEach((btn) => {
      const val = btn.dataset.abundanceChoice;
      const active = val === answerChoice;
      btn.classList.toggle('is-correct', active && isCorrect);
      btn.classList.toggle('is-incorrect', active && !isCorrect);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (checkFeedback && answerChoice) {
      checkFeedback.classList.add('is-visible');
      checkFeedback.classList.toggle('is-success', isCorrect);
      checkFeedback.classList.toggle('is-error', !isCorrect);
      checkFeedback.textContent = isCorrect
        ? 'Correct. Even atomic numbers often form peaks. Adding helium-4 in some fusion reactions increases the proton count by two and helps explain the pattern.'
        : 'Compare carbon (6), oxygen (8) and iron (26) with the bars on either side.';
    }
  }

  function persist() {
    if (!lessonId || !activityId) return;
    const completed = answerChoice === 'even' && highlightOddo;
    setActivityResult(
      lessonId,
      activityId,
      {
        type: 'abundance-chart',
        title: titleText,
        view,
        highlightOddo,
        selectedZ,
        answerChoice,
        answerSummary: completed ? 'Oddo–Harkins pattern verified' : views[view].button,
        completed,
      },
      totalActivities
    );
  }

  function renderView() {
    const showFull = view === fullView;
    reveal.textContent = views[view].button;
    prompt.textContent = views[view].prompt;
    frame.hidden = view === 0;
    inspectorRow.hidden = view === 0;
    check.hidden = !showFull;
    oddoToggle.hidden = !showFull;
    oddoToggle.setAttribute('aria-pressed', String(highlightOddo));
    oddoToggle.textContent = highlightOddo
      ? 'Showing Even (Blue) vs Odd (Coral)'
      : 'Highlight Even vs. Odd Z (Oddo–Harkins)';
    renderChart();
    renderInspector();
    applyCheckUI();
  }

  reveal.addEventListener('click', () => {
    view = (view + 1) % views.length;
    selectedZ = null;
    renderView();
    persist();
  });

  oddoToggle.addEventListener('click', () => {
    highlightOddo = !highlightOddo;
    renderView();
    persist();
  });

  checkBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      answerChoice = btn.dataset.abundanceChoice;
      highlightOddo = true;
      renderView();
      persist();
    });
  });

  renderView();
}

export function initBindingEnergyCurve(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const svgEl = container.querySelector('#binding-curve-svg');
  const zoneBtns = Array.from(container.querySelectorAll('[data-be-zone]'));
  const zoneTitle = container.querySelector('[data-be-title]');
  const zoneEq = container.querySelector('[data-be-equation]');
  const zoneDesc = container.querySelector('[data-be-desc]');
  const visitedBadge = container.querySelector('[data-be-visited]');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Nuclear Binding Energy Curve';

  const POINTS = [
    { a: 1, meV: 0.0, label: '¹H' },
    { a: 2, meV: 1.11, label: '²H' },
    { a: 4, meV: 7.07, label: '⁴He' },
    { a: 6, meV: 5.33, label: '⁶Li' },
    { a: 12, meV: 7.68, label: '¹²C' },
    { a: 16, meV: 7.98, label: '¹⁶O' },
    { a: 28, meV: 8.45, label: '²⁸Si' },
    { a: 40, meV: 8.55, label: '⁴⁰Ca' },
    { a: 56, meV: 8.79, label: '⁵⁶Fe' },
    { a: 90, meV: 8.71, label: '⁹⁰Zr' },
    { a: 120, meV: 8.51, label: '¹²⁰Sn' },
    { a: 180, meV: 8.04, label: '¹⁸⁰Hf' },
    { a: 208, meV: 7.87, label: '²⁰⁸Pb' },
    { a: 235, meV: 7.59, label: '²³⁵U' },
  ];

  const ZONES = {
    fusion: {
      title: 'Fusion Zone (Left of Iron-56)',
      equation: 'Light Nuclei (H → He → C → Fe)  ⇒  Move UP Curve  ⇒  Energy Released (E = mc²)',
      desc: 'Fusing very light nuclei creates a more tightly bound nucleus with slightly less total mass. That missing mass becomes huge energy—this is why stars shine!',
    },
    peak: {
      title: 'Iron-56 Peak (⁵⁶Fe · 8.79 MeV/nucleon)',
      equation: 'Iron-56 = Maximum Stability  ⇒  Fusing Fe Absorbs Energy Instead',
      desc: 'Iron-56 sits at the top of the curve as the most tightly bound nucleus. Once a massive star builds an Iron core, fusion stops paying energy—triggering collapse and a supernova!',
    },
    fission: {
      title: 'Fission Zone (Right of Iron-56)',
      equation: 'Heavy Nucleus (²³⁵U) → Smaller Fragments (closer to Fe)  ⇒  Move UP Curve  ⇒  Energy Released',
      desc: 'Splitting a heavy unstable nucleus like Uranium-235 moves fragments UP toward the Iron peak, releasing huge energy. This powers nuclear fission plants.',
    },
  };

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  let activeZone = ZONES[saved.activeZone] ? saved.activeZone : 'fusion';
  const visited = new Set(Array.isArray(saved.visited) ? saved.visited : ['fusion']);

  function render(save = false) {
    const W = 520;
    const H = 265;
    const padL = 48;
    const padR = 18;
    const padT = 22;
    const padB = 38;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;

    const toX = (a) => padL + (a / 245) * plotW;
    const toY = (m) => padT + plotH - (m / 9.6) * plotH;

    const pathD = POINTS.map((p, i) => `${i === 0 ? 'M' : 'L'} ${toX(p.a).toFixed(1)} ${toY(p.meV).toFixed(1)}`).join(' ');
    const feX = toX(56);

    const fusionHighlight = activeZone === 'fusion' ? '0.20' : '0.06';
    const fissionHighlight = activeZone === 'fission' ? '0.20' : '0.06';

    if (svgEl) {
      svgEl.innerHTML = `
        <rect x="${padL}" y="${padT}" width="${(feX - padL).toFixed(1)}" height="${plotH}" fill="#0284C7" opacity="${fusionHighlight}" />
        <rect x="${feX.toFixed(1)}" y="${padT}" width="${(W - padR - feX).toFixed(1)}" height="${plotH}" fill="#D97706" opacity="${fissionHighlight}" />
        <line x1="${feX.toFixed(1)}" y1="${padT}" x2="${feX.toFixed(1)}" y2="${padT + plotH}" stroke="#047857" stroke-width="1.8" stroke-dasharray="4 3" />
        <line x1="${padL}" y1="${padT + plotH}" x2="${W - padR}" y2="${padT + plotH}" stroke="#64748B" stroke-width="1.4" />
        <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="#64748B" stroke-width="1.4" />

        <path d="${pathD}" fill="none" stroke="#0F172A" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />

        <circle cx="${toX(4).toFixed(1)}" cy="${toY(7.07).toFixed(1)}" r="4.5" fill="#0284C7" stroke="#FFFFFF" stroke-width="1.5" />
        <text x="${(toX(4) + 8).toFixed(1)}" y="${(toY(7.07) - 4).toFixed(1)}" fill="#0369A1" font-size="10.5" font-weight="700">⁴He</text>

        <circle cx="${feX.toFixed(1)}" cy="${toY(8.79).toFixed(1)}" r="6" fill="#047857" stroke="#FFFFFF" stroke-width="1.8" />
        <text x="${(feX + 8).toFixed(1)}" y="${(toY(8.79) - 8).toFixed(1)}" fill="#047857" font-size="11.5" font-weight="800">⁵⁶Fe Peak (8.79)</text>

        <circle cx="${toX(235).toFixed(1)}" cy="${toY(7.59).toFixed(1)}" r="5" fill="#D97706" stroke="#FFFFFF" stroke-width="1.5" />
        <text x="${(toX(235) - 34).toFixed(1)}" y="${(toY(7.59) - 9).toFixed(1)}" fill="#B45309" font-size="10.5" font-weight="700">²³⁵U</text>

        ${
          activeZone === 'fusion'
            ? `<path d="M ${toX(14).toFixed(1)} ${toY(3.5).toFixed(1)} L ${toX(44).toFixed(1)} ${toY(7.4).toFixed(1)}" stroke="#0284C7" stroke-width="3" marker-end="url(#be-arrow-blue)" />`
            : ''
        }
        ${
          activeZone === 'fission'
            ? `<path d="M ${toX(225).toFixed(1)} ${toY(6.5).toFixed(1)} L ${toX(115).toFixed(1)} ${toY(7.8).toFixed(1)}" stroke="#B45309" stroke-width="3" marker-end="url(#be-arrow-amber)" />`
            : ''
        }

        <defs>
          <marker id="be-arrow-blue" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
          </marker>
          <marker id="be-arrow-amber" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 1 L 10 5 L 0 9 z" fill="#B45309" />
          </marker>
        </defs>

        <text x="${padL + 10}" y="${padT + 16}" fill="#0369A1" font-size="10.5" font-weight="700">FUSION ZONE</text>
        <text x="${W - padR - 86}" y="${padT + 16}" fill="#B45309" font-size="10.5" font-weight="700">FISSION ZONE</text>
        <text x="${W / 2}" y="${H - 8}" text-anchor="middle" fill="#475569" font-size="10.5" font-weight="600">Mass Number (A = protons + neutrons)</text>
        <text x="14" y="${H / 2}" text-anchor="middle" fill="#475569" font-size="10" font-weight="600" transform="rotate(-90 14 ${H / 2})">Binding Energy / Nucleon (MeV)</text>
      `;
    }

    zoneBtns.forEach((btn) => {
      const active = btn.dataset.beZone === activeZone;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });

    const info = ZONES[activeZone];
    if (zoneTitle) zoneTitle.textContent = info.title;
    if (zoneEq) zoneEq.textContent = info.equation;
    if (zoneDesc) zoneDesc.textContent = info.desc;
    if (visitedBadge) visitedBadge.textContent = `Zones explored: ${visited.size} / 3`;

    if (save && lessonId && activityId) {
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'binding-energy',
          title: titleText,
          activeZone,
          visited: Array.from(visited),
          answerSummary: `${visited.size}/3 curve zones explored`,
          completed: visited.size >= 3,
        },
        totalActivities
      );
    }
  }

  zoneBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const z = btn.dataset.beZone;
      if (!ZONES[z]) return;
      activeZone = z;
      visited.add(z);
      render(true);
    });
  });

  render(false);
}

export function initMultiQuiz(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const cards = Array.from(container.querySelectorAll('[data-q-id]'));
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Concept Check Quiz';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const answers = { ...(saved.answers || {}) };

  function render(save = false) {
    let correctCount = 0;
    let answeredCount = 0;

    cards.forEach((card) => {
      const qId = card.dataset.qId;
      const correctVal = card.dataset.answer;
      const chosen = answers[qId];
      const opts = Array.from(card.querySelectorAll('[data-option]'));
      const noteEl = card.querySelector('[data-q-note]');

      if (chosen) answeredCount += 1;
      const isRight = chosen === correctVal;
      if (isRight) correctCount += 1;

      let chosenExp = '';
      opts.forEach((btn) => {
        const val = btn.dataset.option;
        const active = val === chosen;
        btn.classList.toggle('is-correct', active && isRight);
        btn.classList.toggle('is-incorrect', active && !isRight);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
        if (active) chosenExp = btn.dataset.explanation || '';
      });

      if (noteEl) {
        if (!chosen) {
          noteEl.textContent = '';
          noteEl.hidden = true;
        } else {
          noteEl.hidden = false;
          noteEl.textContent = `${isRight ? '✓' : '✕'} ${chosenExp}`;
          noteEl.style.color = isRight ? 'var(--success)' : 'var(--error)';
        }
      }
    });

    const allDone = cards.length > 0 && correctCount === cards.length;
    if (feedbackEl && answeredCount > 0) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allDone);
      feedbackEl.classList.toggle('is-error', !allDone);
      feedbackEl.textContent = allDone
        ? `✓ All ${cards.length} concept checks mastered!`
        : `${correctCount} of ${cards.length} correct so far.`;
    }

    if (save && lessonId && activityId) {
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'multi-quiz',
          title: titleText,
          answers,
          answerSummary: `${correctCount}/${cards.length} correct`,
          completed: allDone,
        },
        totalActivities
      );
    }
  }

  cards.forEach((card) => {
    const qId = card.dataset.qId;
    card.querySelectorAll('[data-option]').forEach((btn) => {
      btn.addEventListener('click', () => {
        answers[qId] = btn.dataset.option || '';
        render(true);
      });
    });
  });

  render(false);
}

export function initTrendVisualizer(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const gridEl = container.querySelector('#trend-pt-grid');
  const modeBtns = Array.from(container.querySelectorAll('[data-trend-mode]'));
  const bannerEl = container.querySelector('[data-trend-banner]');
  const inspectorEl = container.querySelector('[data-trend-inspector]');
  const exploredBadge = container.querySelector('[data-trend-explored]');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Periodic Trend Visualizer';

  const MAIN_GROUP_MAP = { 1: 1, 2: 2, 13: 3, 14: 4, 15: 5, 16: 6, 17: 7, 18: 8 };
  const TREND_ELEMENTS = ELEMENTS.filter(
    (e) =>
      (e.number >= 1 && e.number <= 20) ||
      e.number === 35 ||
      e.number === 36 ||
      e.number === 37 ||
      e.number === 53 ||
      e.number === 54
  );

  const MODES = {
    mass: 'Atomic Mass increases steadily left-to-right across a Period and down every Group as atoms gain more protons and neutrons.',
    radius: 'Atomic Radius SHRINKS left-to-right across a Period (more protons pull the same shells tighter) and GROWS down a Group (new electron shells added).',
    electronegativity: 'Electronegativity (pull on bonding electrons) increases UP and RIGHT toward Fluorine (3.98). Noble Gases (Group 18) are excluded—their outer shells are already full.',
    reactivity: 'Reactivity splits by side: Group 1 Alkali Metals get MORE reactive going DOWN (outer electron is farther out & easier to lose); Group 17 Halogens get MORE reactive going UP (smaller atoms pull electrons harder).',
  };

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  let mode = MODES[saved.mode] ? saved.mode : 'radius';
  let selectedZ = Number.isInteger(saved.selectedZ) ? saved.selectedZ : 11;
  const visited = new Set(Array.isArray(saved.visited) ? saved.visited : ['radius']);

  function getHeatmapBg(en) {
    if (en == null) return '';
    const t = Math.min(1, Math.max(0, (en - 0.75) / (4.0 - 0.75)));
    const alpha = (0.1 + t * 0.52).toFixed(2);
    return `rgba(242, 92, 94, ${alpha})`;
  }

  function renderGrid() {
    if (!gridEl) return;
    gridEl.innerHTML = '';

    [1, 2, 13, 14, 15, 16, 17, 18].forEach((g) => {
      const head = document.createElement('div');
      head.className = 'trend-col-head';
      head.textContent = `G${g}`;
      gridEl.appendChild(head);
    });

    const lookup = new Map();
    TREND_ELEMENTS.forEach((el) => {
      const col = MAIN_GROUP_MAP[el.group];
      if (col) lookup.set(`${el.period}-${col}`, el);
    });

    for (let p = 1; p <= 5; p += 1) {
      for (let c = 1; c <= 8; c += 1) {
        const el = lookup.get(`${p}-${c}`);
        if (!el) {
          const spacer = document.createElement('div');
          spacer.style.gridRow = `${p + 1}`;
          spacer.style.gridColumn = `${c}`;
          gridEl.appendChild(spacer);
          continue;
        }

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `trend-pt-tile ${el.number === selectedZ ? 'is-selected' : ''}`;
        btn.style.gridRow = `${p + 1}`;
        btn.style.gridColumn = `${c}`;

        let midContent = '';
        let valText = '';

        if (mode === 'mass') {
          valText = `${el.mass} u`;
          const m = Number.parseFloat(el.mass) || 1;
          const tint = Math.min(0.42, 0.05 + (m / 132) * 0.35).toFixed(2);
          btn.style.backgroundColor = `rgba(15, 23, 42, ${tint})`;
          if (m > 70) btn.style.color = '#FFFFFF';
        } else if (mode === 'radius') {
          const rPx = Math.max(8, Math.min(28, Math.round((el.radiusPm / 265) * 28)));
          midContent = `<div class="trend-radius-dot" style="width:${rPx}px; height:${rPx}px;"></div>`;
          valText = `${el.radiusPm} pm`;
        } else if (mode === 'electronegativity') {
          if (el.group === 18) {
            btn.classList.add('is-muted');
            valText = 'Full shell';
          } else {
            btn.style.backgroundColor = getHeatmapBg(el.electronegativity);
            valText = el.electronegativity != null ? el.electronegativity.toFixed(2) : '—';
          }
        } else if (mode === 'reactivity') {
          if (el.group === 1 && el.period >= 2) {
            const ranks = { 2: 'Reactive', 3: 'More', 4: 'Very', 5: 'Violent ↓' };
            btn.style.backgroundColor = 'rgba(242, 92, 94, 0.16)';
            btn.style.borderColor = '#C93336';
            valText = ranks[el.period] || '';
          } else if (el.group === 17) {
            const ranks = { 2: 'Most ↑', 3: 'Very', 4: 'Moderate', 5: 'Less' };
            btn.style.backgroundColor = 'rgba(2, 132, 199, 0.14)';
            btn.style.borderColor = '#0284C7';
            valText = ranks[el.period] || '';
          } else if (el.group === 18) {
            btn.classList.add('is-muted');
            valText = 'Unreactive';
          } else {
            valText = el.simpleLabel;
          }
        }

        btn.innerHTML = `
          <div class="trend-tile-top"><span>${el.number}</span><span>P${el.period}</span></div>
          ${midContent || `<span class="trend-tile-sym">${el.symbol}</span>`}
          <span class="trend-tile-val">${midContent ? `${el.symbol} · ${valText}` : valText}</span>
        `;

        btn.addEventListener('click', () => {
          selectedZ = el.number;
          renderGrid();
          renderInspector();
        });

        gridEl.appendChild(btn);
      }
    }
  }

  function renderInspector() {
    if (!inspectorEl) return;
    const el = TREND_ELEMENTS.find((item) => item.number === selectedZ) || TREND_ELEMENTS[0];
    const shellsStr = el.shells ? el.shells.join(', ') : '—';
    const enStr =
      el.group === 18
        ? 'Excluded (full outer shell)'
        : el.electronegativity != null
          ? `${el.electronegativity.toFixed(2)} (Pauling)`
          : '—';

    inspectorEl.innerHTML = `
      <div style="display:flex; align-items:baseline; justify-content:space-between; gap:8px;">
        <h3 style="font-size:1.15rem;">${escapeHtml(el.name)} (${el.symbol})</h3>
        <span class="tabular-nums" style="font-size:0.8125rem; color:var(--accent-accessible); font-weight:700;">Z = ${el.number}</span>
      </div>
      <div class="sea-readout-grid">
        <div class="sea-stat-box">
          <span class="sea-stat-label">Position</span>
          <span class="sea-stat-val">Group ${el.group} · Period ${el.period}</span>
        </div>
        <div class="sea-stat-box">
          <span class="sea-stat-label">Electron Shells</span>
          <span class="sea-stat-val">${shellsStr}</span>
        </div>
        <div class="sea-stat-box">
          <span class="sea-stat-label">Atomic Radius</span>
          <span class="sea-stat-val">${el.radiusPm} pm</span>
        </div>
        <div class="sea-stat-box">
          <span class="sea-stat-label">Electronegativity</span>
          <span class="sea-stat-val">${enStr}</span>
        </div>
      </div>
      <p style="font-size:0.85rem; color:var(--text-body); margin:0;">
        <strong>Atomic Mass:</strong> ${escapeHtml(el.mass)} amu · ${escapeHtml(el.fact)}
      </p>
    `;
  }

  function renderAll(save = false) {
    modeBtns.forEach((btn) => {
      const active = btn.dataset.trendMode === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (bannerEl) bannerEl.textContent = MODES[mode];
    if (exploredBadge) exploredBadge.textContent = `Overlays viewed: ${visited.size} / 4`;
    renderGrid();
    renderInspector();

    if (save && lessonId && activityId) {
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'trend-visualizer',
          title: titleText,
          mode,
          selectedZ,
          visited: Array.from(visited),
          answerSummary: `${visited.size}/4 trend overlays viewed`,
          completed: visited.size >= 4,
        },
        totalActivities
      );
    }
  }

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nextMode = btn.dataset.trendMode;
      if (!MODES[nextMode]) return;
      mode = nextMode;
      visited.add(nextMode);
      renderAll(true);
    });
  });

  renderAll(false);
}

export function initTrendChallenge(container, lessonId, totalActivities) {
  const activityId = container.dataset.activityId;
  const pairCards = Array.from(container.querySelectorAll('[data-pair-id]'));
  const puzzleCards = Array.from(container.querySelectorAll('[data-puzzle-id]'));
  const checkBtn = container.querySelector('[data-trend-check]');
  const resetBtn = container.querySelector('[data-trend-reset]');
  const feedbackEl = container.querySelector('.activity-feedback');
  const titleText =
    container.querySelector('.activity-title')?.textContent?.trim() || 'Trend Predictor Challenge';

  const saved = getLessonState(lessonId).activities?.[activityId] || {};
  const pairChoices = { ...(saved.pairChoices || {}) };
  const puzzleInputs = { ...(saved.puzzleInputs || {}) };

  function syncUI() {
    pairCards.forEach((card) => {
      const id = card.dataset.pairId;
      const chosen = pairChoices[id];
      card.querySelectorAll('[data-pair-choice]').forEach((btn) => {
        const active = btn.dataset.pairChoice === chosen;
        btn.classList.toggle('is-selected', active);
        btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    });

    puzzleCards.forEach((card) => {
      const pId = card.dataset.puzzleId;
      const savedP = puzzleInputs[pId] || {};
      card.querySelectorAll('[data-puzzle-field]').forEach((input) => {
        const fKey = input.dataset.puzzleField;
        if (typeof savedP[fKey] === 'string') {
          input.value = savedP[fKey];
        }
      });
    });
  }

  function evaluate(save = true) {
    let correctCount = 0;
    let totalChecks = 0;

    pairCards.forEach((card) => {
      totalChecks += 1;
      const id = card.dataset.pairId;
      const ans = card.dataset.answer;
      const chosen = pairChoices[id];
      const ok = chosen === ans;
      if (ok) correctCount += 1;
      card.querySelectorAll('[data-pair-choice]').forEach((btn) => {
        const active = btn.dataset.pairChoice === chosen;
        btn.classList.toggle('is-correct', active && ok);
        btn.classList.toggle('is-incorrect', active && !ok);
      });
    });

    puzzleCards.forEach((card) => {
      const pId = card.dataset.puzzleId;
      puzzleInputs[pId] = puzzleInputs[pId] || {};
      card.querySelectorAll('[data-puzzle-field]').forEach((input) => {
        totalChecks += 1;
        const fKey = input.dataset.puzzleField;
        const val = input.value.trim().replace(/\s+/g, '');
        puzzleInputs[pId][fKey] = input.value;
        const expected = (input.dataset.answer || '').trim();
        const ok = val.toLowerCase() === expected.toLowerCase();
        input.classList.toggle('is-correct', ok);
        input.classList.toggle('is-incorrect', !ok);
        if (ok) correctCount += 1;
      });
    });

    const allDone = totalChecks > 0 && correctCount === totalChecks;
    if (feedbackEl) {
      feedbackEl.classList.add('is-visible');
      feedbackEl.classList.toggle('is-success', allDone);
      feedbackEl.classList.toggle('is-error', !allDone);
      feedbackEl.textContent = allDone
        ? `✓ Perfect! All ${totalChecks} periodic trend predictions verified.`
        : `${correctCount} of ${totalChecks} predictions correct. Check red fields using Group = valence e⁻ and Period = shells.`;
    }

    if (save && lessonId && activityId) {
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'trend-challenge',
          title: titleText,
          pairChoices,
          puzzleInputs,
          answerSummary: `${correctCount}/${totalChecks} trend checks solved`,
          completed: allDone,
        },
        totalActivities
      );
    }
  }

  pairCards.forEach((card) => {
    const id = card.dataset.pairId;
    card.querySelectorAll('[data-pair-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        pairChoices[id] = btn.dataset.pairChoice || '';
        card.querySelectorAll('[data-pair-choice]').forEach((b) => {
          b.classList.remove('is-correct', 'is-incorrect');
        });
        syncUI();
      });
    });
  });

  checkBtn?.addEventListener('click', () => evaluate(true));

  resetBtn?.addEventListener('click', () => {
    Object.keys(pairChoices).forEach((k) => delete pairChoices[k]);
    Object.keys(puzzleInputs).forEach((k) => delete puzzleInputs[k]);
    pairCards.forEach((c) => {
      c.querySelectorAll('[data-pair-choice]').forEach((b) =>
        b.classList.remove('is-selected', 'is-correct', 'is-incorrect')
      );
    });
    puzzleCards.forEach((c) => {
      c.querySelectorAll('[data-puzzle-field]').forEach((inp) => {
        inp.value = '';
        inp.classList.remove('is-correct', 'is-incorrect');
      });
    });
    if (feedbackEl) {
      feedbackEl.classList.remove('is-visible', 'is-success', 'is-error');
      feedbackEl.textContent = '';
    }
    if (lessonId && activityId) {
      setActivityResult(
        lessonId,
        activityId,
        {
          type: 'trend-challenge',
          title: titleText,
          pairChoices: {},
          puzzleInputs: {},
          answerSummary: 'Reset',
          completed: false,
        },
        totalActivities
      );
    }
  });

  syncUI();
  if (saved.completed) evaluate(false);
}

/* ==========================================================================
   Interactive Classroom Slideshow Engine (Dark-Bezel Projector Shell)
   ========================================================================== */

export function initSlideshow(lessonId) {
  const workspace = document.querySelector('.slideshow-workspace');
  const stage = workspace?.querySelector('.slideshow-stage');
  const slides = Array.from(document.querySelectorAll('.slide'));
  if (!workspace || !stage || slides.length === 0) return;

  const state = loadProgress();
  let viewMode = state.viewMode === 'scroll' ? 'scroll' : 'slideshow';
  let currentIndex = 0;

  // Restore from URL hash (#slide-N) first, else localStorage
  const hashMatch = window.location.hash.match(/^#slide-(\d+)$/);
  if (hashMatch) {
    const parsed = Number.parseInt(hashMatch[1], 10) - 1;
    if (parsed >= 0 && parsed < slides.length) currentIndex = parsed;
  } else if (lessonId && typeof state.lessons?.[lessonId]?.activeSlideIndex === 'number') {
    const savedIdx = state.lessons[lessonId].activeSlideIndex;
    if (savedIdx >= 0 && savedIdx < slides.length) currentIndex = savedIdx;
  }

  // Track revealed step indices per slide (supports out-of-order ghost clicks + sequential Space/Next Step)
  const savedRevealed = (lessonId && state.lessons?.[lessonId]?.revealedSteps) || {};
  const revealedSets = slides.map((slide, idx) => {
    const totalSteps = slide.querySelectorAll('[data-reveal-step]').length;
    const stored = savedRevealed[idx];
    const set = new Set();
    if (Array.isArray(stored)) {
      stored.forEach((n) => {
        if (typeof n === 'number' && n >= 0 && n < totalSteps) set.add(n);
      });
    } else if (typeof stored === 'number' && stored > 0) {
      const cap = Math.min(stored, totalSteps);
      for (let i = 0; i < cap; i += 1) set.add(i);
    }
    return set;
  });

  // Add subtle top-right "X / N" counter inside each slide's header metadata
  slides.forEach((slide, idx) => {
    const meta = slide.querySelector('.slide-header-meta');
    if (meta && !meta.querySelector('.slide-counter-top')) {
      const counter = document.createElement('span');
      counter.className = 'slide-counter-top';
      counter.textContent = `${idx + 1} / ${slides.length}`;
      meta.appendChild(counter);
    }
  });

  // Resolve lesson title for slim top presenter bar
  const lessonMeta = LESSONS.find((l) => l.id === lessonId);
  const lessonTitleText = lessonMeta
    ? `Lesson ${lessonMeta.number}: ${lessonMeta.title}`
    : document.querySelector('.topbar-lesson-title')?.textContent?.trim() || 'Interactive Lesson';

  // Build Slim Dark Projector Top Bar (inside .slideshow-workspace so it persists in Fullscreen)
  const topBar = document.createElement('div');
  topBar.className = 'projector-topbar';
  topBar.setAttribute('role', 'region');
  topBar.setAttribute('aria-label', 'Projector presenter toolbar');
  topBar.innerHTML = `
    <div class="projector-topbar-left">
      <a class="proj-hub-link" href="./index.html" title="Back to Unit Hub">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M15 18l-6-6 6-6" />
        </svg>
        <span>Unit Hub</span>
      </a>
      <span class="proj-slash" aria-hidden="true">/</span>
      <span class="proj-lesson-title">${escapeHtml(lessonTitleText)}</span>
    </div>

    <div class="projector-topbar-center">
      <div class="proj-progress-wrap" title="Lesson activity completion">
        <div class="proj-progress-track" aria-hidden="true">
          <div class="proj-progress-fill" data-progress-fill></div>
        </div>
        <span class="proj-meta-text" data-progress-label>0 / 0 completed</span>
      </div>
      <span class="proj-meta-text" id="proj-slide-meta">Slide 1 / ${slides.length}</span>
    </div>

    <div class="projector-topbar-right">
      <button type="button" class="proj-btn" id="proj-pt-btn" title="Open Periodic Table">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M3 10h18M9 4v16M15 4v16" />
        </svg>
        <span class="proj-btn-label-desktop">Periodic Table</span>
      </button>
      <button type="button" class="proj-btn" id="proj-timer-toggle" aria-expanded="false" title="Classroom Timer (T)">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <circle cx="12" cy="13" r="8" />
          <path d="M12 9v4l2.5 2.5M9 2h6" />
        </svg>
        <span class="tabular-nums" id="proj-timer-chip">Timer</span>
      </button>
      <button type="button" class="proj-btn" id="proj-reveal-all-btn" hidden>
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span id="proj-reveal-all-label">Reveal All</span>
      </button>
      <button type="button" class="proj-btn proj-btn-accent" id="proj-next-step-btn" hidden>
        Next Step
      </button>
      <button type="button" class="proj-btn" id="proj-view-toggle" title="Switch to Scroll View">
        Scroll View
      </button>
      <button type="button" class="proj-btn" id="proj-fullscreen-btn" title="Toggle Fullscreen (F)">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
        <span id="proj-fullscreen-label">Fullscreen</span>
      </button>
    </div>

    <div class="timer-popover" id="timer-popover" role="dialog" aria-label="Classroom countdown timer">
      <div class="timer-display-row">
        <span class="timer-readout" id="timer-readout">02:00</span>
        <button type="button" class="btn btn-ghost btn-sm" id="timer-close-btn" aria-label="Close timer">Close</button>
      </div>
      <div class="timer-presets">
        <button type="button" class="pt-filter-btn" data-timer-preset="60">1 min</button>
        <button type="button" class="pt-filter-btn" data-timer-preset="120">2 min</button>
        <button type="button" class="pt-filter-btn" data-timer-preset="300">5 min</button>
        <button type="button" class="pt-filter-btn" id="timer-add-30">+30s</button>
      </div>
      <div class="timer-actions-row">
        <button type="button" class="btn btn-primary btn-sm" id="timer-start-pause">Start</button>
        <button type="button" class="btn btn-secondary btn-sm" id="timer-reset-btn">Reset</button>
      </div>
    </div>
  `;

  workspace.insertBefore(topBar, stage);

  // Build Slim Dark Projector Bottom Strip (Numbered slide buttons + Previous / Next)
  const bottomBar = document.createElement('div');
  bottomBar.className = 'projector-bottombar';
  bottomBar.setAttribute('role', 'region');
  bottomBar.setAttribute('aria-label', 'Slide pagination');

  const slideButtonsHtml = slides
    .map((slide, idx) => {
      const title =
        slide.dataset.slideTitle ||
        slide.querySelector('h1, h2, h3')?.textContent?.trim() ||
        `Slide ${idx + 1}`;
      return `<button type="button" class="slide-num-btn" data-slide-idx="${idx}" title="${escapeHtml(title)}" aria-label="Go to slide ${idx + 1}">${idx + 1}</button>`;
    })
    .join('');

  bottomBar.innerHTML = `
    <div class="proj-bottom-left">
      <button type="button" class="proj-nav-btn" id="proj-prev-slide" aria-label="Previous slide">
        ‹ Previous
      </button>
    </div>

    <div class="proj-bottom-center" role="navigation" aria-label="Jump to slide">
      ${slideButtonsHtml}
      <button type="button" class="slide-num-btn" id="proj-overview-btn" title="Open Slide Overview (G)" aria-label="Open Slide Overview">
        Grid
      </button>
    </div>

    <div class="proj-bottom-right">
      <span class="proj-keys-hint">Keys: →/Space/↓ Reveal &amp; Next · ← Prev · ↑ Hide · F Fullscreen</span>
      <button type="button" class="proj-nav-btn" id="proj-next-slide" aria-label="Next slide">
        Next ›
      </button>
    </div>
  `;

  workspace.appendChild(bottomBar);

  // Add "Slideshow View" return button into Scroll View .site-header
  const siteHeaderActions = document.querySelector('.site-header .topbar-actions');
  let headerSlideshowBtn = null;
  if (siteHeaderActions && !siteHeaderActions.querySelector('#header-slideshow-btn')) {
    headerSlideshowBtn = document.createElement('button');
    headerSlideshowBtn.type = 'button';
    headerSlideshowBtn.id = 'header-slideshow-btn';
    headerSlideshowBtn.className = 'btn btn-primary btn-sm header-slideshow-btn';
    headerSlideshowBtn.textContent = 'Slideshow View';
    siteHeaderActions.insertBefore(headerSlideshowBtn, siteHeaderActions.firstChild);
  }

  const prevBtn = bottomBar.querySelector('#proj-prev-slide');
  const nextBtn = bottomBar.querySelector('#proj-next-slide');
  const slideNumBtns = Array.from(bottomBar.querySelectorAll('.slide-num-btn[data-slide-idx]'));
  const overviewBtn = bottomBar.querySelector('#proj-overview-btn');
  const slideMetaEl = topBar.querySelector('#proj-slide-meta');
  const ptBtn = topBar.querySelector('#proj-pt-btn');
  const revealAllBtn = topBar.querySelector('#proj-reveal-all-btn');
  const revealAllLabel = topBar.querySelector('#proj-reveal-all-label');
  const nextStepBtn = topBar.querySelector('#proj-next-step-btn');
  const viewToggleBtn = topBar.querySelector('#proj-view-toggle');
  const fullscreenBtn = topBar.querySelector('#proj-fullscreen-btn');
  const fullscreenLabel = topBar.querySelector('#proj-fullscreen-label');

  // Create clickable in-place ghost placeholders for every [data-reveal-step]
  const slideStepControls = slides.map((slide, slideIdx) => {
    const steps = Array.from(slide.querySelectorAll('[data-reveal-step]'));
    return steps.map((stepEl, stepIdx) => {
      const customLabel = stepEl.dataset.revealLabel;
      const defaultLabel = `Step ${stepIdx + 1}: Hidden — click, press Space, or Down arrow to reveal`;
      const labelText = customLabel || defaultLabel;

      const ghostBtn = document.createElement('button');
      ghostBtn.type = 'button';
      ghostBtn.className = 'reveal-ghost-btn';
      ghostBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        <span>${escapeHtml(labelText)}</span>
      `;
      ghostBtn.addEventListener('click', () => revealSpecificStep(slideIdx, stepIdx));

      let ghostContainer = ghostBtn;
      if (stepEl.tagName === 'LI') {
        const li = document.createElement('li');
        li.className = 'reveal-ghost-li';
        li.appendChild(ghostBtn);
        ghostContainer = li;
      }

      if (stepEl.dataset.gridSpan === 'full') {
        stepEl.classList.add('is-grid-span-full');
        ghostContainer.classList.add('is-grid-span-full');
      }

      stepEl.insertAdjacentElement('afterend', ghostContainer);
      return { stepEl, ghostContainer };
    });
  });

  function persistSlideState() {
    const latest = loadProgress();
    latest.viewMode = viewMode;
    if (lessonId) {
      if (!latest.lessons[lessonId]) {
        latest.lessons[lessonId] = { totalActivities: 0, activities: {} };
      }
      latest.lessons[lessonId].activeSlideIndex = currentIndex;
      latest.lessons[lessonId].revealedSteps = revealedSets.map((set) => Array.from(set));
    }
    saveProgress(latest);
  }

  function applyRevealsForSlide(idx) {
    const items = slideStepControls[idx];
    const set = revealedSets[idx];

    items.forEach(({ stepEl, ghostContainer }, sIdx) => {
      const visible = viewMode === 'scroll' || set.has(sIdx);
      stepEl.classList.toggle('is-reveal-hidden', !visible);
      stepEl.classList.toggle('is-revealed', visible && viewMode === 'slideshow');
      ghostContainer.hidden = visible;
    });

    if (idx === currentIndex && revealAllBtn && nextStepBtn) {
      const total = items.length;
      const shown = set.size;
      const remaining = Math.max(0, total - shown);

      if (viewMode === 'scroll' || total === 0) {
        revealAllBtn.hidden = true;
        nextStepBtn.hidden = true;
      } else {
        revealAllBtn.hidden = false;
        nextStepBtn.hidden = false;

        if (revealAllLabel) {
          revealAllLabel.textContent =
            remaining === 0 ? `Hide All (${shown}/${total})` : `Reveal All (${shown}/${total})`;
        }
        revealAllBtn.classList.toggle('is-active', remaining === 0);

        if (remaining > 0) {
          nextStepBtn.disabled = false;
          nextStepBtn.textContent = 'Next Step';
        } else {
          nextStepBtn.disabled = true;
          nextStepBtn.textContent = 'All Revealed';
        }
      }
    }
  }

  function revealSpecificStep(slideIdx, stepIdx) {
    const items = slideStepControls[slideIdx];
    if (!items || stepIdx < 0 || stepIdx >= items.length) return;
    revealedSets[slideIdx].add(stepIdx);
    applyRevealsForSlide(slideIdx);
    persistSlideState();
  }

  function revealNextOnSlide(idx = currentIndex) {
    const items = slideStepControls[idx];
    const set = revealedSets[idx];
    for (let i = 0; i < items.length; i += 1) {
      if (!set.has(i)) {
        set.add(i);
        applyRevealsForSlide(idx);
        persistSlideState();
        return true;
      }
    }
    return false;
  }

  function hideLastOnSlide(idx = currentIndex) {
    const set = revealedSets[idx];
    if (!set || set.size === 0) return false;
    let lastStep = null;
    for (const val of set) lastStep = val;
    if (lastStep === null) return false;
    set.delete(lastStep);
    applyRevealsForSlide(idx);
    persistSlideState();
    return true;
  }

  function toggleRevealAllOnSlide(idx = currentIndex) {
    const items = slideStepControls[idx];
    const set = revealedSets[idx];
    if (set.size < items.length) {
      for (let i = 0; i < items.length; i += 1) set.add(i);
    } else {
      set.clear();
    }
    applyRevealsForSlide(idx);
    persistSlideState();
  }

  function applyViewMode() {
    document.body.classList.toggle('is-slideshow-mode', viewMode === 'slideshow');
    document.body.classList.toggle('is-scroll-mode', viewMode === 'scroll');
    if (viewToggleBtn) {
      viewToggleBtn.textContent = viewMode === 'slideshow' ? 'Scroll View' : 'Slideshow View';
    }
    slides.forEach((_, idx) => applyRevealsForSlide(idx));
  }

  function goToSlide(idx, updateHash = true) {
    if (idx < 0 || idx >= slides.length) return;
    currentIndex = idx;

    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === currentIndex);
      if (i === currentIndex) slide.scrollTop = 0;
    });

    slideNumBtns.forEach((btn, i) => {
      btn.classList.toggle('is-current', i === currentIndex);
      btn.setAttribute('aria-current', i === currentIndex ? 'page' : 'false');
    });

    if (slideMetaEl) {
      slideMetaEl.textContent = `Slide ${currentIndex + 1} / ${slides.length}`;
    }
    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === slides.length - 1;

    applyRevealsForSlide(currentIndex);
    persistSlideState();

    if (updateHash && window.history?.replaceState) {
      window.history.replaceState(null, '', `#slide-${currentIndex + 1}`);
    }
  }

  prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));
  slideNumBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetIdx = Number.parseInt(btn.dataset.slideIdx || '0', 10);
      goToSlide(targetIdx);
    });
  });

  nextStepBtn?.addEventListener('click', () => revealNextOnSlide(currentIndex));
  revealAllBtn?.addEventListener('click', () => toggleRevealAllOnSlide(currentIndex));

  ptBtn?.addEventListener('click', () => {
    const modal = ensurePeriodicTableModal();
    openModal(modal);
  });

  function switchToScrollView() {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    viewMode = 'scroll';
    applyViewMode();
    persistSlideState();
    slides[currentIndex]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function switchToSlideshowView() {
    viewMode = 'slideshow';
    applyViewMode();
    goToSlide(currentIndex);
    persistSlideState();
  }

  viewToggleBtn?.addEventListener('click', () => {
    if (viewMode === 'slideshow') switchToScrollView();
    else switchToSlideshowView();
  });

  headerSlideshowBtn?.addEventListener('click', switchToSlideshowView);

  // Fullscreen Projector Support
  async function toggleFullscreen() {
    try {
      if (!document.fullscreenElement) {
        if (viewMode !== 'slideshow') {
          viewMode = 'slideshow';
          applyViewMode();
          persistSlideState();
        }
        await workspace.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      if (fullscreenLabel) fullscreenLabel.textContent = 'Unavailable';
      window.setTimeout(() => {
        if (fullscreenLabel) {
          fullscreenLabel.textContent = document.fullscreenElement ? 'Exit' : 'Fullscreen';
        }
      }, 2000);
    }
  }

  fullscreenBtn?.addEventListener('click', toggleFullscreen);

  document.addEventListener('fullscreenchange', () => {
    if (fullscreenLabel) {
      fullscreenLabel.textContent = document.fullscreenElement ? 'Exit' : 'Fullscreen';
    }
  });

  // Slide Overview Modal
  function openOverviewModal() {
    let modal = document.getElementById('slide-overview-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'slide-overview-modal';
      modal.className = 'modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'overview-modal-title');
      modal.innerHTML = `
        <div class="modal-dialog modal-dialog-wide">
          <div class="modal-header">
            <div>
              <h2 id="overview-modal-title">Slide Overview</h2>
              <p class="meta-line">Select any slide to jump directly to it</p>
            </div>
            <button type="button" class="btn btn-secondary btn-sm" data-close-modal="slide-overview-modal">
              Close
            </button>
          </div>
          <div class="modal-body">
            <div class="overview-grid" id="slide-overview-grid"></div>
          </div>
        </div>
      `;
      workspace.appendChild(modal);
      wireModalClose(modal);
    }

    const grid = modal.querySelector('#slide-overview-grid');
    if (grid) {
      const lessonState = lessonId ? getLessonState(lessonId) : { activities: {} };
      grid.innerHTML = '';

      slides.forEach((slide, idx) => {
        const title =
          slide.dataset.slideTitle ||
          slide.querySelector('h1, h2, h3')?.textContent?.trim() ||
          `Slide ${idx + 1}`;
        const actId = slide.dataset.activityId || slide.querySelector('[data-activity]')?.dataset?.activityId;
        let statusHtml = '<span class="overview-card-status">Concept Slide</span>';
        if (actId) {
          const isDone = Boolean(lessonState.activities?.[actId]?.completed);
          statusHtml = isDone
            ? '<span class="overview-card-status is-done">✓ Activity Done</span>'
            : '<span class="overview-card-status">○ Interactive Activity</span>';
        }

        const card = document.createElement('button');
        card.type = 'button';
        card.className = `overview-card ${idx === currentIndex ? 'is-current' : ''}`;
        card.innerHTML = `
          <div class="overview-card-top">
            <span>Slide ${String(idx + 1).padStart(2, '0')}</span>
            <span>${idx === currentIndex ? 'Current' : ''}</span>
          </div>
          <div class="overview-card-title">${escapeHtml(title)}</div>
          ${statusHtml}
        `;
        card.addEventListener('click', () => {
          closeModal(modal);
          if (viewMode !== 'slideshow') {
            viewMode = 'slideshow';
            applyViewMode();
          }
          goToSlide(idx);
        });
        grid.appendChild(card);
      });
    }

    openModal(modal);
  }

  overviewBtn?.addEventListener('click', openOverviewModal);

  // Classroom Countdown Timer
  const timerToggle = topBar.querySelector('#proj-timer-toggle');
  const timerChip = topBar.querySelector('#proj-timer-chip');
  const timerPopover = topBar.querySelector('#timer-popover');
  const timerReadout = topBar.querySelector('#timer-readout');
  const timerClose = topBar.querySelector('#timer-close-btn');
  const timerStartPause = topBar.querySelector('#timer-start-pause');
  const timerReset = topBar.querySelector('#timer-reset-btn');
  const timerAdd30 = topBar.querySelector('#timer-add-30');
  const timerPresets = Array.from(topBar.querySelectorAll('[data-timer-preset]'));

  let timerBaseSeconds = 120;
  let timerRemaining = 120;
  let timerInterval = null;

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function renderTimer() {
    const formatted = formatTime(timerRemaining);
    if (timerReadout) {
      timerReadout.textContent = formatted;
      timerReadout.classList.toggle('is-finished', timerRemaining === 0);
    }
    if (timerChip) {
      timerChip.textContent =
        timerInterval || timerRemaining !== timerBaseSeconds ? formatted : 'Timer';
    }
    if (timerToggle) {
      timerToggle.classList.toggle('is-active', Boolean(timerInterval));
    }
    if (timerStartPause) {
      timerStartPause.textContent = timerInterval ? 'Pause' : 'Start';
    }
  }

  function stopTimer() {
    if (timerInterval) {
      window.clearInterval(timerInterval);
      timerInterval = null;
    }
    renderTimer();
  }

  function startTimer() {
    if (timerRemaining <= 0) timerRemaining = timerBaseSeconds;
    stopTimer();
    timerInterval = window.setInterval(() => {
      if (timerRemaining > 0) {
        timerRemaining -= 1;
        renderTimer();
      }
      if (timerRemaining === 0) {
        stopTimer();
      }
    }, 1000);
    renderTimer();
  }

  function toggleTimerPopover() {
    const isOpen = timerPopover?.classList.toggle('is-open');
    timerToggle?.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }

  timerToggle?.addEventListener('click', toggleTimerPopover);

  timerClose?.addEventListener('click', () => {
    timerPopover?.classList.remove('is-open');
    timerToggle?.setAttribute('aria-expanded', 'false');
  });

  timerPresets.forEach((btn) => {
    btn.addEventListener('click', () => {
      stopTimer();
      timerBaseSeconds = Number.parseInt(btn.dataset.timerPreset || '120', 10);
      timerRemaining = timerBaseSeconds;
      renderTimer();
    });
  });

  timerAdd30?.addEventListener('click', () => {
    timerRemaining += 30;
    renderTimer();
  });

  timerStartPause?.addEventListener('click', () => {
    if (timerInterval) stopTimer();
    else startTimer();
  });

  timerReset?.addEventListener('click', () => {
    stopTimer();
    timerRemaining = timerBaseSeconds;
    renderTimer();
  });

  // Safe Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    const target = e.target;
    const isTyping =
      target instanceof HTMLElement &&
      (target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable);

    if (isTyping) return;
    if (document.querySelector('.modal-backdrop.is-open')) return;

    if (e.key === 'g' || e.key === 'G') {
      e.preventDefault();
      openOverviewModal();
      return;
    }

    if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
      return;
    }

    if (e.key === 't' || e.key === 'T') {
      if (viewMode === 'slideshow') {
        e.preventDefault();
        toggleTimerPopover();
      }
      return;
    }

    if (viewMode !== 'slideshow') return;

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (!revealNextOnSlide(currentIndex)) {
        goToSlide(currentIndex + 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goToSlide(currentIndex - 1);
    } else if (e.key === 'ArrowDown') {
      if (revealNextOnSlide(currentIndex)) {
        e.preventDefault();
      }
    } else if (e.key === 'ArrowUp') {
      if (hideLastOnSlide(currentIndex)) {
        e.preventDefault();
      }
    } else if (e.key === ' ') {
      const activeTag = document.activeElement?.tagName;
      if (activeTag === 'BUTTON' || activeTag === 'A') return;
      e.preventDefault();
      if (!revealNextOnSlide(currentIndex)) {
        goToSlide(currentIndex + 1);
      }
    }
  });

  applyViewMode();
  goToSlide(currentIndex, false);
  renderTimer();
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
    else if (type === 'first20') initFirst20Explorer(el, lessonId, totalActivities);
    else if (type === 'particle-match') initParticleMatch(el, lessonId, totalActivities);
    else if (type === 'symbol-speller') initSymbolSpeller(el, lessonId, totalActivities);
    else if (type === 'symbol-quiz') initQuickCheckGrid(el, lessonId, totalActivities);
    else if (type === 'reflection') initReflection(el, lessonId, totalActivities);
    else if (type === 'pt-class-map') initPtClassMap(el, lessonId, totalActivities);
    else if (type === 'detective') initDetective(el, lessonId, totalActivities);
    else if (type === 'metal-poster') initMetalPoster(el, lessonId, totalActivities);
    else if (type === 'atom-sea-builder') initAtomSeaBuilder(el, lessonId, totalActivities);
    else if (type === 'atom-label') initAtomLabeler(el, lessonId, totalActivities);
    else if (type === 'subatomic-table') initSubatomicTable(el, lessonId, totalActivities);
    else if (type === 'shell-builder') initShellBuilder(el, lessonId, totalActivities);
    else if (type === 'problem-set') initProblemSet(el, lessonId, totalActivities);
    else if (type === 'rubric-explain') initRubricExplain(el, lessonId, totalActivities);
    else if (type === 'cosmic-timeline') initCosmicTimeline(el, lessonId, totalActivities);
    else if (type === 'abundance-chart') initAbundanceChart(el, lessonId, totalActivities);
    else if (type === 'binding-energy') initBindingEnergyCurve(el, lessonId, totalActivities);
    else if (type === 'multi-quiz') initMultiQuiz(el, lessonId, totalActivities);
    else if (type === 'trend-visualizer') initTrendVisualizer(el, lessonId, totalActivities);
    else if (type === 'trend-challenge') initTrendChallenge(el, lessonId, totalActivities);
  });

  initSlideshow(lessonId);
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
