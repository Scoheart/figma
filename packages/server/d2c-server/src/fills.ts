export const getBackgroundColor = (fills) => {
  const fill = retrieveTopFill(fills);
  if (!fill) return '';
  switch (fill.type) {
    case 'SOLID':
      return htmlColor(fill.color, fill.opacity);
  }
};

const htmlColor = (color, alpha) => {
  if (color.r === 1 && color.g === 1 && color.b === 1 && alpha === 1) {
    return 'white';
  }

  if (color.r === 0 && color.g === 0 && color.b === 0 && alpha === 1) {
    return 'black';
  }

  if (alpha === 1) {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);

    const toHex = (num) => num.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  const r = sliceNum(color.r * 255);
  const g = sliceNum(color.g * 255);
  const b = sliceNum(color.b * 255);
  const a = sliceNum(alpha);

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const sliceNum = (num) => {
  return num.toFixed(2).replace(/\.00$/, '');
};

const retrieveTopFill = (fills) => {
  if (fills.length > 0) {
    return [...fills].reverse().find((d) => d.visible !== false);
  }
};

// const fills = [
//   {
//     type: 'SOLID',
//     visible: true,
//     opacity: 1,
//     blendMode: 'NORMAL',
//     color: {
//       r: 0.3843137323856354,
//       g: 0.301960796117782,
//       b: 0.3843137323856354,
//     },
//     boundVariables: {},
//   },
// ];
