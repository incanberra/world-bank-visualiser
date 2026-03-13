import { useEffect, useMemo, useRef, useState } from "react";
import { ForwardBarChart, ForwardHeatMap, ForwardLineChart } from "./components/ChartPanel";
import { INDICATOR_GROUPS, indicatorMap } from "./data/indicators";
import { downloadSvg } from "./lib/chartUtils";
import { fetchCountries, fetchIndicatorData } from "./lib/worldBankApi";

const DEFAULT_COUNTRIES = ["USA", "CHN", "IND", "AUS"];
const DEFAULT_YEAR_RANGE = [2014, 2024];
const DEFAULT_GROUP = "economic";

function formatSeriesDetail(country, indicator) {
  return `${country.name} - ${indicator.label}`;
}

export default function App() {
  const [countries, setCountries] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(DEFAULT_GROUP);
  const [selectedCountries, setSelectedCountries] = useState(DEFAULT_COUNTRIES);
  const [selectedIndicators, setSelectedIndicators] = useState(
    INDICATOR_GROUPS[DEFAULT_GROUP].defaultSelected,
  );
  const [yearRange, setYearRange] = useState(DEFAULT_YEAR_RANGE);
  const [chartType, setChartType] = useState("line");
  const [status, setStatus] = useState({ loading: true, error: "" });
  const [rows, setRows] = useState([]);
  const chartRef = useRef(null);
  const activeGroup = INDICATOR_GROUPS[selectedGroup];

  useEffect(() => {
    let active = true;

    async function loadCountries() {
      try {
        setStatus({ loading: true, error: "" });
        const nextCountries = await fetchCountries();

        if (!active) {
          return;
        }

        setCountries(nextCountries);
        setStatus({ loading: false, error: "" });
      } catch (error) {
        if (!active) {
          return;
        }

        setStatus({
          loading: false,
          error: error.message || "Unable to load country metadata.",
        });
      }
    }

    loadCountries();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selectedCountries.length || !selectedIndicators.length) {
      setRows([]);
      return;
    }

    let active = true;

    async function loadSeries() {
      try {
        setStatus({ loading: true, error: "" });
        const nextRows = await fetchIndicatorData({
          indicatorIds: selectedIndicators,
          countryIds: selectedCountries,
          startYear: yearRange[0],
          endYear: yearRange[1],
        });

        if (!active) {
          return;
        }

        setRows(nextRows.sort((left, right) => left.year - right.year));
        setStatus({ loading: false, error: "" });
      } catch (error) {
        if (!active) {
          return;
        }

        setStatus({
          loading: false,
          error: error.message || "Unable to load indicator data.",
        });
      }
    }

    loadSeries();

    return () => {
      active = false;
    };
  }, [selectedCountries, selectedIndicators, yearRange]);

  const selectedCountryRecords = useMemo(
    () => countries.filter((country) => selectedCountries.includes(country.id)),
    [countries, selectedCountries],
  );

  const legendLabels = useMemo(() => {
    const labels = {};

    selectedCountryRecords.forEach((country) => {
      selectedIndicators.forEach((indicatorId) => {
        labels[`${country.id}-${indicatorId}`] = country.name;
      });
    });

    return labels;
  }, [selectedCountryRecords, selectedIndicators]);

  const seriesDetailLabels = useMemo(() => {
    const labels = {};

    selectedCountryRecords.forEach((country) => {
      selectedIndicators.forEach((indicatorId) => {
        const indicator = indicatorMap.get(indicatorId);

        if (indicator) {
          labels[`${country.id}-${indicatorId}`] = formatSeriesDetail(country, indicator);
        }
      });
    });

    return labels;
  }, [selectedCountryRecords, selectedIndicators]);

  const subtitle = useMemo(() => {
    const indicatorText = selectedIndicators
      .map((indicatorId) => indicatorMap.get(indicatorId)?.label ?? indicatorId)
      .join(", ");

    return `${indicatorText} | ${yearRange[0]}-${yearRange[1]}`;
  }, [selectedIndicators, yearRange]);

  const visibleRows = useMemo(() => {
    if (chartType !== "heatmap") {
      return rows;
    }

    const [firstIndicator] = selectedIndicators;
    return rows.filter((row) => row.indicatorId === firstIndicator);
  }, [chartType, rows, selectedIndicators]);

  const canRender = visibleRows.length > 0;

  function handleMultiSelect(event, setter) {
    const values = Array.from(event.target.selectedOptions, (option) => option.value);
    setter(values);
  }

  function exportCurrentChart() {
    const svgNode = chartRef.current;
    const stamp = `${chartType}-${selectedIndicators[0] ?? "series"}-${yearRange[0]}-${yearRange[1]}`.replaceAll(".", "-");
    downloadSvg(svgNode, `${stamp}.svg`);
  }

  function handleGroupChange(groupId) {
    setSelectedGroup(groupId);
    setSelectedIndicators(INDICATOR_GROUPS[groupId].defaultSelected);
  }

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">World Bank Data API Visual Explorer</p>
          <h1>Global Pulse Charts</h1>
          <p className="hero-copy">
            Compare countries across economic and climate indicator sets with polished SVG charts you can export and reuse.
          </p>
        </div>
        <div className="hero-card">
          <div className="stat">
            <span>{selectedCountries.length}</span>
            <label>Countries</label>
          </div>
          <div className="stat">
            <span>{selectedIndicators.length}</span>
            <label>Series</label>
          </div>
          <div className="stat">
            <span>{yearRange[1] - yearRange[0] + 1}</span>
            <label>Years</label>
          </div>
        </div>
      </header>

      <main className="dashboard">
        <section className="control-panel">
          <div className="panel-heading">
            <h2>Build your chart</h2>
            <p>Choose an indicator family first, then compare countries and shape the time window.</p>
          </div>

          <div className="field">
            <span>Indicator family</span>
            <div className="segmented two-choice">
              {Object.values(INDICATOR_GROUPS).map((group) => (
                <button
                  key={group.id}
                  type="button"
                  className={selectedGroup === group.id ? "active" : ""}
                  onClick={() => handleGroupChange(group.id)}
                >
                  {group.label}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span>{activeGroup.label}</span>
            <select
              multiple
              value={selectedIndicators}
              onChange={(event) => handleMultiSelect(event, setSelectedIndicators)}
            >
              {activeGroup.indicators.map((indicator) => (
                <option key={indicator.id} value={indicator.id}>
                  {indicator.label}
                </option>
              ))}
            </select>
            <small>{activeGroup.description} Heat map uses the first selected indicator.</small>
          </label>

          <label className="field">
            <span>Countries</span>
            <select
              multiple
              value={selectedCountries}
              onChange={(event) => handleMultiSelect(event, setSelectedCountries)}
            >
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name} ({country.region})
                </option>
              ))}
            </select>
            <small>Tip: hold Ctrl or Cmd to select multiple countries.</small>
          </label>

          <div className="field two-up">
            <label>
              <span>Start year</span>
              <input
                type="number"
                min="1960"
                max={yearRange[1]}
                value={yearRange[0]}
                onChange={(event) =>
                  setYearRange(([_, endYear]) => [
                    Math.min(Number(event.target.value), endYear),
                    endYear,
                  ])
                }
              />
            </label>
            <label>
              <span>End year</span>
              <input
                type="number"
                min={yearRange[0]}
                max="2025"
                value={yearRange[1]}
                onChange={(event) =>
                  setYearRange(([startYear]) => [
                    startYear,
                    Math.max(Number(event.target.value), startYear),
                  ])
                }
              />
            </label>
          </div>

          <div className="field">
            <span>Chart type</span>
            <div className="segmented">
              {[
                ["line", "Line chart"],
                ["bar", "Bar chart"],
                ["heatmap", "Heat map"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  className={chartType === value ? "active" : ""}
                  onClick={() => setChartType(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="export-button" onClick={exportCurrentChart} disabled={!canRender}>
            Export SVG
          </button>
        </section>

        <section className="chart-panel">
          <div className="panel-heading">
            <h2>Chart preview</h2>
            <p>Live data source: World Bank API</p>
          </div>

          {status.error ? <div className="message error">{status.error}</div> : null}
          {status.loading ? <div className="message">Loading World Bank data...</div> : null}
          {!status.loading && !status.error && !canRender ? (
            <div className="message">Choose at least one country and indicator to generate a chart.</div>
          ) : null}

          {!status.loading && !status.error && canRender ? (
            <div className="chart-card">
              {chartType === "line" ? (
                <ForwardLineChart
                  ref={chartRef}
                  title="Trend Explorer"
                  subtitle={subtitle}
                  data={visibleRows}
                  seriesLabels={legendLabels}
                  seriesDetailLabels={seriesDetailLabels}
                />
              ) : null}
              {chartType === "bar" ? (
                <ForwardBarChart
                  ref={chartRef}
                  title="Country Snapshot"
                  subtitle={subtitle}
                  data={visibleRows}
                  seriesLabels={legendLabels}
                  seriesDetailLabels={seriesDetailLabels}
                />
              ) : null}
              {chartType === "heatmap" ? (
                <ForwardHeatMap
                  ref={chartRef}
                  title="Intensity Map"
                  subtitle={subtitle}
                  data={visibleRows}
                  seriesLabels={legendLabels}
                />
              ) : null}
            </div>
          ) : null}
        </section>
      </main>
    </div>
  );
}
