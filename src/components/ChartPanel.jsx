import { forwardRef } from "react";
import { clamp, formatCompactNumber, formatDetailedNumber, getExtent, SERIES_COLORS } from "../lib/chartUtils";

const CHART_WIDTH = 900;
const CHART_HEIGHT = 520;
const MARGIN = { top: 48, right: 32, bottom: 118, left: 92 };
const LEGEND_COLUMNS = 3;
const LEGEND_ROW_HEIGHT = 22;

function shortenLegendLabel(label, maxLength = 28) {
  if (!label || label.length <= maxLength) {
    return label;
  }

  return `${label.slice(0, maxLength - 1)}...`;
}

function ChartFrame({ title, subtitle, legend, children }, ref) {
  const legendRows = legend.length ? Math.ceil(legend.length / LEGEND_COLUMNS) : 0;
  const legendWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
  const legendItemWidth = legendWidth / LEGEND_COLUMNS;
  const chartHeight = CHART_HEIGHT + Math.max(0, legendRows - 1) * LEGEND_ROW_HEIGHT;
  const legendTop = chartHeight - 28 - (legendRows - 1) * LEGEND_ROW_HEIGHT;

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${CHART_WIDTH} ${chartHeight}`}
      role="img"
      aria-label={title}
      className="chart-svg"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="chart-surface" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#132238" />
        </linearGradient>
      </defs>
      <rect width={CHART_WIDTH} height={chartHeight} rx="30" fill="url(#chart-surface)" />
      <text x="42" y="48" fill="#f8fafc" fontSize="28" fontWeight="700">
        {title}
      </text>
      <text x="42" y="74" fill="#94a3b8" fontSize="14">
        {subtitle}
      </text>
      <g transform={`translate(${MARGIN.left}, ${MARGIN.top + 32})`}>{children}</g>
      {legend.length ? (
        <g transform={`translate(${MARGIN.left}, ${legendTop})`}>
          {legend.map((item, index) => (
            <g
              key={`${item.label}-${index}`}
              transform={`translate(${(index % LEGEND_COLUMNS) * legendItemWidth}, ${Math.floor(index / LEGEND_COLUMNS) * LEGEND_ROW_HEIGHT})`}
            >
              <circle cx="0" cy="-5" r="6" fill={item.color} />
              <text x="14" y="0" fill="#cbd5e1" fontSize="12">
                {shortenLegendLabel(item.label)}
              </text>
              <title>{item.label}</title>
            </g>
          ))}
        </g>
      ) : null}
    </svg>
  );
}

const ForwardChartFrame = forwardRef(ChartFrame);

function renderYAxisTicks(min, max, plotWidth, plotHeight, formatTick) {
  return Array.from({ length: 5 }, (_, index) => {
    const ratio = index / 4;
    const value = max - (max - min) * ratio;
    const y = plotHeight * ratio;

    return (
      <g key={value}>
        <line x1="0" x2={plotWidth} y1={y} y2={y} stroke="rgba(148, 163, 184, 0.18)" />
        <text x="-16" y={y + 4} fill="#94a3b8" fontSize="12" textAnchor="end">
          {formatTick(value)}
        </text>
      </g>
    );
  });
}

export function LineChart({ title, subtitle, data, seriesLabels, seriesDetailLabels }, ref) {
  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom - 36;
  const years = [...new Set(data.map((point) => point.year))].sort((a, b) => a - b);
  const [minValue, maxValue] = getExtent(data.map((point) => point.value));

  const grouped = data.reduce((accumulator, point) => {
    const key = `${point.countryId}-${point.indicatorId}`;
    accumulator[key] ??= [];
    accumulator[key].push(point);
    return accumulator;
  }, {});

  const series = Object.entries(grouped).map(([key, points], index) => ({
    key,
    color: SERIES_COLORS[index % SERIES_COLORS.length],
    label: seriesLabels[key],
    points: points.sort((left, right) => left.year - right.year),
  }));

  return (
    <ForwardChartFrame
      ref={ref}
      title={title}
      subtitle={subtitle}
      legend={series.map((entry) => ({ label: entry.label, color: entry.color }))}
    >
      {renderYAxisTicks(minValue, maxValue, plotWidth, plotHeight, formatCompactNumber)}
      {series.map((entry) => {
        const path = entry.points
          .map((point, index) => {
            const x = years.length === 1 ? plotWidth / 2 : ((point.year - years[0]) / (years[years.length - 1] - years[0])) * plotWidth;
            const y = plotHeight - ((point.value - minValue) / (maxValue - minValue)) * plotHeight;
            return `${index === 0 ? "M" : "L"} ${x} ${y}`;
          })
          .join(" ");

        return (
          <g key={entry.key}>
            <path d={path} fill="none" stroke={entry.color} strokeWidth="3.5" strokeLinecap="round" />
            {entry.points.map((point) => {
              const x = years.length === 1 ? plotWidth / 2 : ((point.year - years[0]) / (years[years.length - 1] - years[0])) * plotWidth;
              const y = plotHeight - ((point.value - minValue) / (maxValue - minValue)) * plotHeight;
              return (
                <g key={`${entry.key}-${point.year}`}>
                  <circle cx={x} cy={y} r="4.5" fill={entry.color} />
                  <title>{`${seriesDetailLabels[entry.key] ?? entry.label} | ${point.year}: ${formatDetailedNumber(point.value)}`}</title>
                </g>
              );
            })}
          </g>
        );
      })}
      {years.map((year) => {
        const x = years.length === 1 ? plotWidth / 2 : ((year - years[0]) / (years[years.length - 1] - years[0])) * plotWidth;
        return (
          <g key={year}>
            <text
              x={x}
              y={plotHeight + 18}
              fill="#94a3b8"
              fontSize="12"
              textAnchor="end"
              transform={`rotate(-90 ${x} ${plotHeight + 18})`}
            >
              {year}
            </text>
          </g>
        );
      })}
    </ForwardChartFrame>
  );
}

export const ForwardLineChart = forwardRef(LineChart);

export function BarChart({ title, subtitle, data, seriesLabels, seriesDetailLabels }, ref) {
  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom - 36;
  const latestBySeries = Object.values(
    data.reduce((accumulator, point) => {
      const key = `${point.countryId}-${point.indicatorId}`;
      const current = accumulator[key];

      if (!current || point.year > current.year) {
        accumulator[key] = point;
      }

      return accumulator;
    }, {}),
  );
  const [minValue, maxValue] = getExtent([...latestBySeries.map((point) => point.value), 0]);
  const categories = latestBySeries.map((row, index) => ({
    ...row,
    label: seriesLabels[`${row.countryId}-${row.indicatorId}`],
    color: SERIES_COLORS[index % SERIES_COLORS.length],
  }));
  const bandWidth = plotWidth / Math.max(categories.length, 1);
  const barWidth = Math.min(52, bandWidth * 0.66);
  const baseline = plotHeight - ((0 - minValue) / (maxValue - minValue || 1)) * plotHeight;

  return (
    <ForwardChartFrame
      ref={ref}
      title={title}
      subtitle={`${subtitle} Each bar uses the latest available year for its selected series.`}
      legend={categories.map((entry) => ({ label: entry.label, color: entry.color }))}
    >
      {renderYAxisTicks(minValue, maxValue, plotWidth, plotHeight, formatCompactNumber)}
      <line x1="0" x2={plotWidth} y1={baseline} y2={baseline} stroke="rgba(248, 250, 252, 0.35)" />
      {categories.map((entry, index) => {
        const x = bandWidth * index + (bandWidth - barWidth) / 2;
        const valueY = plotHeight - ((entry.value - minValue) / (maxValue - minValue || 1)) * plotHeight;
        const y = Math.min(valueY, baseline);
        const height = Math.max(Math.abs(baseline - valueY), 1);

        return (
          <g key={`${entry.countryId}-${entry.indicatorId}`}>
            <rect x={x} y={y} width={barWidth} height={height} rx="10" fill={entry.color} opacity="0.92" />
            <text x={x + barWidth / 2} y={plotHeight + 28} fill="#cbd5e1" fontSize="11" textAnchor="middle">
              {entry.countryName.slice(0, 12)}
            </text>
            <text x={x + barWidth / 2} y={y - 10} fill="#e2e8f0" fontSize="11" textAnchor="middle">
              {formatCompactNumber(entry.value)}
            </text>
            <title>{`${seriesDetailLabels[`${entry.countryId}-${entry.indicatorId}`] ?? entry.label} | ${entry.year}: ${formatDetailedNumber(entry.value)}`}</title>
          </g>
        );
      })}
    </ForwardChartFrame>
  );
}

export const ForwardBarChart = forwardRef(BarChart);

function getHeatColor(value, min, max) {
  const ratio = clamp((value - min) / (max - min || 1), 0, 1);
  const hue = 212 - ratio * 165;
  const lightness = 28 + ratio * 36;
  return `hsl(${hue}, 86%, ${lightness}%)`;
}

export function HeatMap({ title, subtitle, data, seriesLabels }, ref) {
  const countryIds = [...new Set(data.map((point) => point.countryId))];
  const years = [...new Set(data.map((point) => point.year))].sort((a, b) => a - b);
  const focusIndicatorId = data[0]?.indicatorId;
  const filtered = data.filter((point) => point.indicatorId === focusIndicatorId);
  const [minValue, maxValue] = getExtent(filtered.map((point) => point.value));
  const plotWidth = CHART_WIDTH - MARGIN.left - MARGIN.right;
  const plotHeight = CHART_HEIGHT - MARGIN.top - MARGIN.bottom - 36;
  const cellWidth = plotWidth / Math.max(years.length, 1);
  const cellHeight = plotHeight / Math.max(countryIds.length, 1);
  const grid = new Map(filtered.map((point) => [`${point.countryId}-${point.year}`, point]));
  return (
    <ForwardChartFrame
      ref={ref}
      title={title}
      subtitle={`${subtitle} Heat map uses the first selected indicator across countries and years.`}
      legend={[]}
    >
      {countryIds.map((countryId, rowIndex) => {
        const rowPoint = filtered.find((point) => point.countryId === countryId);
        return (
          <text
            key={countryId}
            x="-16"
            y={rowIndex * cellHeight + cellHeight / 2 + 4}
            fill="#cbd5e1"
            fontSize="11"
            textAnchor="end"
          >
            {rowPoint?.countryName ?? countryId}
          </text>
        );
      })}
      {years.map((year, columnIndex) => (
        <text
          key={year}
          x={columnIndex * cellWidth + cellWidth / 2}
          y={plotHeight + 18}
          fill="#94a3b8"
          fontSize="12"
          textAnchor="end"
          transform={`rotate(-90 ${columnIndex * cellWidth + cellWidth / 2} ${plotHeight + 18})`}
        >
          {year}
        </text>
      ))}
      {countryIds.map((countryId, rowIndex) =>
        years.map((year, columnIndex) => {
          const point = grid.get(`${countryId}-${year}`);
          const fill = point ? getHeatColor(point.value, minValue, maxValue) : "rgba(30, 41, 59, 0.75)";
          return (
            <g key={`${countryId}-${year}`}>
              <rect
                x={columnIndex * cellWidth + 2}
                y={rowIndex * cellHeight + 2}
                width={Math.max(cellWidth - 4, 8)}
                height={Math.max(cellHeight - 4, 8)}
                rx="8"
                fill={fill}
              />
              {point ? <title>{`${point.countryName} | ${year}: ${formatDetailedNumber(point.value)}`}</title> : null}
            </g>
          );
        }),
      )}
    </ForwardChartFrame>
  );
}

export const ForwardHeatMap = forwardRef(HeatMap);
