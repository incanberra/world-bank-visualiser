export const SERIES_COLORS = [
  "#0a84ff",
  "#ff6b35",
  "#2a9d8f",
  "#b5179e",
  "#ffb703",
  "#6a4c93",
  "#8ac926",
  "#ef476f",
];

export function formatCompactNumber(value) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatDetailedNumber(value) {
  return new Intl.NumberFormat("en", {
    maximumFractionDigits: Math.abs(value) >= 100 ? 0 : 2,
  }).format(value);
}

export function getExtent(values) {
  const numeric = values.filter((value) => Number.isFinite(value));

  if (!numeric.length) {
    return [0, 1];
  }

  const min = Math.min(...numeric);
  const max = Math.max(...numeric);

  if (min === max) {
    return [min === 0 ? -1 : min * 0.9, max === 0 ? 1 : max * 1.1];
  }

  return [min, max];
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function downloadSvg(svgNode, fileName) {
  if (!svgNode) {
    return;
  }

  const serializer = new XMLSerializer();
  const svgText = serializer.serializeToString(svgNode);
  const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
