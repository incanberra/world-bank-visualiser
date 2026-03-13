const API_ROOT = "https://api.worldbank.org/v2";

async function fetchJson(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();

  if (!Array.isArray(payload)) {
    throw new Error("Unexpected World Bank response format");
  }

  return payload;
}

export async function fetchCountries() {
  const [meta, rows] = await fetchJson(
    `${API_ROOT}/country?format=json&per_page=400&source=2`,
  );

  const pages = meta?.pages ?? 1;
  let allRows = rows ?? [];

  if (pages > 1) {
    const requests = [];

    for (let page = 2; page <= pages; page += 1) {
      requests.push(fetchJson(`${API_ROOT}/country?format=json&per_page=400&page=${page}&source=2`));
    }

    const results = await Promise.all(requests);
    results.forEach(([, pageRows]) => {
      allRows = allRows.concat(pageRows ?? []);
    });
  }

  return allRows
    .filter((country) => country.region?.id !== "NA" && country.capitalCity)
    .map((country) => ({
      id: country.id,
      name: country.name,
      region: country.region.value,
      incomeLevel: country.incomeLevel?.value ?? "Unknown",
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export async function fetchIndicatorData({
  indicatorIds,
  countryIds,
  startYear,
  endYear,
}) {
  const requests = indicatorIds.flatMap((indicatorId) =>
    countryIds.map(async (countryId) => {
      const [meta, rows] = await fetchJson(
        `${API_ROOT}/country/${countryId}/indicator/${indicatorId}?format=json&per_page=200&date=${startYear}:${endYear}`,
      );

      return {
        indicatorId,
        countryId,
        total: meta?.total ?? 0,
        rows: (rows ?? [])
          .filter((row) => row.value !== null)
          .map((row) => ({
            indicatorId,
            countryId,
            countryName: row.country?.value ?? countryId,
            year: Number(row.date),
            value: Number(row.value),
          })),
      };
    }),
  );

  const results = await Promise.all(requests);
  return results.flatMap((result) => result.rows);
}
