const WIDTH = 520;
const HEIGHT = 210;
const TAU = 2 * Math.PI;
const DEFAULT_YAW = 0.59;
const DEFAULT_PITCH = 0.14;

const SCENES = {
  dense: { model: 'universe', expansion: 0.62, label: 'Hot, dense patch of space' },
  cooling: { model: 'universe', expansion: 1, label: 'Space expands and cools' },
  nuclei: { model: 'universe', expansion: 1.36, label: 'Light nuclei can stay together' },
  hotCore: { model: 'star', radius: 1, core: 0.36, shock: 0, ejecta: 0, label: 'Hydrogen fusion in the core' },
  heliumCore: { model: 'star', radius: 1, core: 0.32, shock: 0, ejecta: 0, label: 'Helium fusion in the core' },
  ironCore: { model: 'star', radius: 1, core: 0.25, shock: 0, ejecta: 0, label: 'Iron-rich core' },
  collapse: { model: 'star', radius: 1, core: 0.09, shock: 0, ejecta: 0, label: 'Iron-rich core collapses inward' },
  shock: { model: 'star', radius: 1, core: 0.09, shock: 0.96, ejecta: 0.17, label: 'Shock travels through the outer layers' },
  ejecta: { model: 'star', radius: 0.66, core: 0.09, shock: 1.61, ejecta: 1, label: 'Outer material is ejected into space' },
};

const STELLAR_GEOMETRY = [];
function spherePoint(radius, latitude, longitude) {
  return [
    radius * Math.sin(latitude) * Math.sin(longitude),
    radius * Math.cos(latitude),
    radius * Math.sin(latitude) * Math.cos(longitude),
  ];
}

// The missing longitude quadrant exposes two radial cut faces.
for (let row = 0; row < 16; row += 1) {
  const high = row * Math.PI / 16;
  const low = (row + 1) * Math.PI / 16;
  for (let column = 0; column < 36; column += 1) {
    const start = Math.PI / 2 + column * (3 * Math.PI / 2) / 36;
    const end = Math.PI / 2 + (column + 1) * (3 * Math.PI / 2) / 36;
    const corners = [
      spherePoint(1, high, start), spherePoint(1, high, end),
      spherePoint(1, low, end), spherePoint(1, low, start),
    ];
    const [x, y, z] = spherePoint(1, (high + low) / 2, (start + end) / 2);
    const light = Math.max(0, -0.46 * x + 0.63 * y + 0.62 * z);
    STELLAR_GEOMETRY.push({ corners, color: `hsl(${23 + 11 * light} 86% ${25 + 43 * light}%)` });
  }
}

const TRACERS = [[-0.73, 0.02, 0.32], [0.86, -0.23, 0.76]];
const PARTICLES = Array.from({ length: 35 }, (_, i) => [
  (i % 9 - 4) * 0.43 + Math.sin(i * 2.8) * 0.16,
  (i % 5 - 2) * 0.24 + Math.cos(i * 1.4) * 0.15,
  Math.sin(i * 3.33) * 1.45,
]);
const PARCELS = [
  { label: 'O-rich', color: '#7dd3fc', latitude: 1.12, longitude: 0.15, layer: 0.55, travel: 0.82 },
  { label: 'Si-rich', color: '#c4b5fd', latitude: 1.94, longitude: 1.42, layer: 0.39, travel: 0.8 },
];

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const mix = (from, to, progress) => from + (to - from) * progress;

export function createCosmicScenes(canvas) {
  let ctx;
  try {
    ctx = canvas?.getContext('2d');
  } catch {
    return null;
  }
  if (!ctx) return null;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let sceneId;
  let state;
  let frame = 0;
  let yaw = DEFAULT_YAW;
  let pitch = DEFAULT_PITCH;
  let drag;

  function line(a, b, color, width = 1) {
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.lineWidth = width;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  function dot(point, size, fill, outline) {
    ctx.beginPath();
    ctx.arc(point.x, point.y, size, 0, TAU);
    ctx.fillStyle = fill;
    ctx.fill();
    if (outline) {
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = outline;
      ctx.stroke();
    }
  }

  function text(value, x, y, color = '#f8fafc', align = 'left', font = '700 14px system-ui') {
    ctx.font = font;
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  }

  function arrow(from, to, color, width = 2) {
    line(from, to, color, width);
    const angle = Math.atan2(to.y - from.y, to.x - from.x);
    for (const offset of [-0.48, 0.48]) {
      line(to, { x: to.x - 9 * Math.cos(angle + offset), y: to.y - 9 * Math.sin(angle + offset) }, color, width);
    }
  }

  function renderUniverse(view, project) {
    const space = (point) => project(point.map((coordinate) => coordinate * view.expansion));
    for (let i = -9; i <= 9; i += 1) {
      const distance = i * 0.43;
      line(space([distance, -0.71, -4]), space([distance, -0.71, 2.65]), '#29445e');
      line(space([-4, -0.71, distance]), space([4, -0.71, distance]), '#29445e');
    }

    const bodies = PARTICLES.map((point, i) => ({ point: space(point), i })).sort((a, b) => a.point.depth - b.point.depth);
    bodies.forEach(({ point, i }) => {
      const radius = 3.35 * point.scale;
      const proton = i % 3 !== 1;
      dot(point, radius, proton ? '#ef6565' : '#94a3b8', '#cbd5e1');
      if (proton) {
        line({ x: point.x - 1.6, y: point.y }, { x: point.x + 1.6, y: point.y }, '#35161e');
        line({ x: point.x, y: point.y - 1.6 }, { x: point.x, y: point.y + 1.6 }, '#35161e');
      }
    });

    const [a, b] = TRACERS.map(space);
    ctx.setLineDash([5, 4]);
    line(a, b, '#fcd34d', 2);
    ctx.setLineDash([]);
    [a, b].forEach((point, i) => {
      dot(point, 9, '#25241d', '#fcd34d');
      text(i === 0 ? 'A' : 'B', point.x, point.y + 4, '#fef3c7', 'center', '700 11px system-ui');
    });

    if (sceneId === 'nuclei') {
      const helium = space([0.15, 0.31, -0.22]);
      [[-4.5, -4.5], [4.5, -4.5], [-4.5, 4.5], [4.5, 4.5]].forEach(([dx, dy], i) => {
        dot({ x: helium.x + dx, y: helium.y + dy }, 4.8, i % 2 ? '#94a3b8' : '#ef6565', '#f8fafc');
      });
      text('Light nucleus', helium.x + 17, helium.y - 9, '#f1f5f9', 'left', '700 13px system-ui');
    }
    text('A and B mark the same pair in each view', 15, 195, '#fef3c7', 'left', '600 12px system-ui');
  }

  function renderStar(view, project) {
    const layers = sceneId === 'hotCore' ? ['#df7224', '#f6a63b', '#ffe28a']
      : sceneId === 'heliumCore' ? ['#df7224', '#ee8334', '#bdebf4']
        : ['#df7224', '#6baac3', '#9a8cbf', '#cbd5e1'];
    const radii = layers.length === 3
      ? [view.radius, view.radius * 0.66, view.core, 0]
      : [view.radius, view.radius * 0.7, view.radius * 0.49, view.core, 0];

    const faces = STELLAR_GEOMETRY.map(({ corners, color }) => ({
      points: corners.map((point) => project(point.map((coord) => coord * view.radius))), color,
    }));
    for (const longitude of [0, Math.PI / 2]) {
      layers.forEach((color, layer) => {
        const outer = radii[layer];
        const inner = radii[layer + 1];
        for (let row = 0; row < 32; row += 1) {
          const start = row * Math.PI / 32;
          const end = (row + 1) * Math.PI / 32;
          const points = [[outer, start], [outer, end], [inner, end], [inner, start]]
            .map(([radius, latitude]) => project(spherePoint(radius, latitude, longitude)));
          faces.push({ points, color, dark: longitude === 0 });
        }
      });
    }

    faces.forEach((face) => {
      face.depth = face.points.reduce((sum, point) => sum + point.depth, 0) / face.points.length;
    });
    faces.sort((a, b) => a.depth - b.depth);
    faces.forEach(({ points, color, dark }) => {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      points.slice(1).forEach((point) => ctx.lineTo(point.x, point.y));
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.65;
      ctx.fill();
      ctx.stroke();
      if (dark) {
        ctx.fillStyle = '#0f172a30';
        ctx.fill();
      }
    });

    if (view.shock > 0.03) {
      ctx.setLineDash([4, 5]);
      for (let axis = 0; axis < 3; axis += 1) {
        ctx.beginPath();
        for (let i = 0; i <= 64; i += 1) {
          const angle = i * TAU / 64;
          const vector = [view.shock * Math.cos(angle), view.shock * Math.sin(angle)];
          vector.splice(axis, 0, 0);
          const p = project(vector);
          if (i) ctx.lineTo(p.x, p.y);
          else ctx.moveTo(p.x, p.y);
        }
        ctx.strokeStyle = axis === 0 ? '#ffc96e' : '#ffc96eaa';
        ctx.lineWidth = axis === 0 ? 1.9 : 1.1;
        ctx.stroke();
      }
      ctx.setLineDash([]);
    }

    const centre = project([0, 0, 0]);
    if (sceneId === 'collapse') {
      [-1, 1].forEach((side) => arrow(
        { x: centre.x + side * 66, y: centre.y - 2 },
        { x: centre.x + side * 16, y: centre.y - 2 }, '#f8fafc',
      ));
    }
    const coreLabel = sceneId === 'hotCore' || sceneId === 'heliumCore' ? 'Fusion zone' : 'Central core';
    line(centre, { x: 116, y: 116 }, '#f8fafc');
    dot(centre, 3, '#fff');
    text(coreLabel, 15, 121);
    if (layers.length !== 4) return;

    PARCELS.forEach((parcel, i) => {
      const start = project(spherePoint(parcel.layer, parcel.latitude, parcel.longitude));
      const point = project(spherePoint(parcel.layer + view.ejecta * parcel.travel, parcel.latitude, parcel.longitude));
      if (view.ejecta > 0.05) arrow(start, point, parcel.color, 1.4);
      const label = { x: 424, y: i === 0 ? 66 : 143 };
      line(point, { x: label.x - 8, y: label.y - 5 }, parcel.color);
      dot(point, 4.2, parcel.color, '#172033');
      text(parcel.label, label.x, label.y, parcel.color);
    });
    if (view.shock > 0.03) text('Dashed rings · shock front', 15, 195, '#ffc96e', 'left', '600 12px system-ui');
  }

  function draw() {
    if (!state) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = WIDTH * ratio;
    const height = HEIGHT * ratio;
    if (canvas.width !== Math.round(width) || canvas.height !== Math.round(height)) {
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);
    }
    ctx.setTransform(canvas.width / WIDTH, 0, 0, canvas.height / HEIGHT, 0, 0);
    const space = state.model === 'universe';
    const sky = ctx.createLinearGradient(0, 0, 0, HEIGHT);
    sky.addColorStop(0, '#080e20');
    sky.addColorStop(1, '#182940');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    const sinYaw = Math.sin(yaw);
    const cosYaw = Math.cos(yaw);
    const sinPitch = Math.sin(pitch);
    const cosPitch = Math.cos(pitch);
    function project([x, y, z]) {
      const horizontal = cosYaw * x - sinYaw * z;
      const forward = sinYaw * x + cosYaw * z;
      const vertical = cosPitch * y - sinPitch * forward;
      const depth = sinPitch * y + cosPitch * forward;
      const scale = 5.7 / Math.max(1.8, 5.7 - depth);
      const zoom = space ? 92 : mix(69, 54, clamp((state.shock - 0.96) / 0.65, 0, 1));
      return { x: WIDTH / 2 + horizontal * scale * zoom, y: 103 - vertical * scale * zoom, depth, scale };
    }
    if (space) renderUniverse(state, project);
    else renderStar(state, project);
    ctx.fillStyle = '#080e20cc';
    ctx.fillRect(0, 0, WIDTH, 25);
    text(state.label, 15, 18, '#f1f5f9', 'left', '700 13px system-ui');
  }

  function show(id) {
    const next = SCENES[id];
    cancelAnimationFrame(frame);
    if (!next) return;
    const previous = state;
    sceneId = id;
    if (!previous || previous.model !== next.model || reducedMotion.matches) {
      state = next;
      draw();
      return;
    }
    const changes = Object.keys(next).filter((property) =>
      typeof next[property] === 'number' && next[property] !== previous[property]);
    if (!changes.length) {
      state = next;
      draw();
      return;
    }
    const start = performance.now();
    const animate = (now) => {
      const time = clamp((now - start) / 960, 0, 1);
      const progress = reducedMotion.matches ? 1 : 1 - (1 - time) ** 3;
      state = { ...next };
      changes.forEach((property) => {
        state[property] = mix(previous[property], next[property], progress);
      });
      draw();
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
  }

  function rotate(horizontal, vertical = 0) {
    yaw = clamp(yaw + horizontal, -0.05, Math.PI / 2 + 0.05);
    pitch = clamp(pitch + vertical, -0.3, 0.49);
    draw();
  }

  canvas.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    canvas.setPointerCapture(event.pointerId);
    drag = event;
  });
  canvas.addEventListener('pointermove', (event) => {
    if (drag?.pointerId !== event.pointerId) return;
    rotate((event.clientX - drag.clientX) * 0.008, (event.clientY - drag.clientY) * 0.008);
    drag = event;
  });
  canvas.addEventListener('lostpointercapture', () => { drag = undefined; });

  return {
    show,
    rotate,
    resetView() {
      yaw = DEFAULT_YAW;
      pitch = DEFAULT_PITCH;
      draw();
    },
  };
}
