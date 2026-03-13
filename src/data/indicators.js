export const ECONOMIC_INDICATORS = [
  {
    id: "NY.GDP.MKTP.CD",
    label: "GDP (current US$)",
    unit: "USD",
    description: "Gross domestic product at purchaser's prices.",
  },
  {
    id: "NY.GDP.PCAP.CD",
    label: "GDP per capita (current US$)",
    unit: "USD",
    description: "GDP divided by midyear population.",
  },
  {
    id: "NY.GDP.MKTP.KD.ZG",
    label: "GDP growth (annual %)",
    unit: "%",
    description: "Annual percentage growth rate of GDP at market prices.",
  },
  {
    id: "SP.POP.TOTL",
    label: "Population, total",
    unit: "people",
    description: "Midyear population estimate.",
  },
  {
    id: "SL.TLF.TOTL.IN",
    label: "Labor force, total",
    unit: "people",
    description: "People ages 15 and older who meet the ILO definition of the labor force.",
  },
  {
    id: "SP.URB.TOTL.IN.ZS",
    label: "Urban population (% of total population)",
    unit: "%",
    description: "Share of people living in urban areas.",
  },
  {
    id: "FP.CPI.TOTL.ZG",
    label: "Inflation, consumer prices (%)",
    unit: "%",
    description: "Annual percentage change in the cost to the average consumer.",
  },
  {
    id: "SL.UEM.TOTL.ZS",
    label: "Unemployment (% of total labor force)",
    unit: "%",
    description: "Share of the labor force that is without work.",
  },
  {
    id: "NE.TRD.GNFS.ZS",
    label: "Trade (% of GDP)",
    unit: "%",
    description: "Sum of exports and imports of goods and services measured as share of GDP.",
  },
  {
    id: "NE.EXP.GNFS.ZS",
    label: "Exports of goods and services (% of GDP)",
    unit: "%",
    description: "Value of exports relative to the size of the economy.",
  },
  {
    id: "BX.KLT.DINV.WD.GD.ZS",
    label: "Foreign direct investment, net inflows (% of GDP)",
    unit: "%",
    description: "Net inflows of investment to acquire a lasting management interest.",
  },
  {
    id: "GC.DOD.TOTL.GD.ZS",
    label: "Central government debt, total (% of GDP)",
    unit: "%",
    description: "Gross debt position of the central government relative to GDP.",
  },
  {
    id: "NV.IND.MANF.ZS",
    label: "Manufacturing, value added (% of GDP)",
    unit: "%",
    description: "Contribution of manufacturing output to the economy.",
  },
  {
    id: "EG.ELC.ACCS.ZS",
    label: "Access to electricity (% of population)",
    unit: "%",
    description: "Share of population with access to electricity.",
  },
  {
    id: "EG.USE.PCAP.KG.OE",
    label: "Energy use (kg of oil equivalent per capita)",
    unit: "kg oil equivalent",
    description: "Per capita energy use across economic activity.",
  },
  {
    id: "IT.NET.USER.ZS",
    label: "Individuals using the Internet (% of population)",
    unit: "%",
    description: "Digital connectivity across the population.",
  },
  {
    id: "IS.AIR.GOOD.MT.K1",
    label: "Air transport, freight (million ton-km)",
    unit: "million ton-km",
    description: "Air cargo carried on each stage of flight multiplied by stage distance.",
  },
  {
    id: "SP.DYN.LE00.IN",
    label: "Life expectancy at birth, total (years)",
    unit: "years",
    description: "Average number of years a newborn is expected to live.",
  },
  {
    id: "SE.ADT.LITR.ZS",
    label: "Literacy rate, adult total (% of people ages 15 and above)",
    unit: "%",
    description: "Share of adults who can read and write with understanding.",
  },
  {
    id: "MS.MIL.TOTL.P1",
    label: "Armed forces personnel, total",
    unit: "people",
    description: "Total military personnel, including active service members.",
  },
];

export const CLIMATE_INDICATORS = [
  {
    id: "EN.GHG.ALL.LU.MT.CE.AR5",
    label: "Total greenhouse gas emissions including LULUCF (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Economy-wide greenhouse gas emissions including land use, land-use change, and forestry.",
  },
  {
    id: "EN.GHG.ALL.MT.CE.AR5",
    label: "Total greenhouse gas emissions excluding LULUCF (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Economy-wide greenhouse gas emissions excluding land-use change and forestry effects.",
  },
  {
    id: "EN.GHG.ALL.PC.CE.AR5",
    label: "Total greenhouse gas emissions excluding LULUCF per capita (t CO2e/capita)",
    unit: "t CO2e/capita",
    description: "Greenhouse gas emissions per person, excluding land-use change and forestry.",
  },
  {
    id: "EN.GHG.TOT.ZG.AR5",
    label: "Total greenhouse gas emissions excluding LULUCF (% change from 1990)",
    unit: "%",
    description: "Long-run change in greenhouse gas emissions relative to 1990 levels.",
  },
  {
    id: "EN.GHG.CO2.MT.CE.AR5",
    label: "Carbon dioxide (CO2) emissions excluding LULUCF (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Total carbon dioxide emissions excluding land-use change and forestry.",
  },
  {
    id: "EN.GHG.CO2.PC.CE.AR5",
    label: "Carbon dioxide (CO2) emissions excluding LULUCF per capita (t CO2e/capita)",
    unit: "t CO2e/capita",
    description: "Per-capita carbon dioxide emissions excluding land-use change and forestry.",
  },
  {
    id: "EN.GHG.CO2.RT.GDP.KD",
    label: "Carbon intensity of GDP (kg CO2e per constant 2015 US$ of GDP)",
    unit: "kg CO2e / GDP",
    description: "Greenhouse gas emissions intensity relative to economic output.",
  },
  {
    id: "EN.GHG.CO2.ZG.AR5",
    label: "Carbon dioxide (CO2) emissions excluding LULUCF (% change from 1990)",
    unit: "%",
    description: "Long-run change in carbon dioxide emissions relative to 1990.",
  },
  {
    id: "EN.GHG.CH4.MT.CE.AR5",
    label: "Methane (CH4) emissions excluding LULUCF (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Total methane emissions excluding land-use change and forestry.",
  },
  {
    id: "EN.GHG.CH4.ZG.AR5",
    label: "Methane (CH4) emissions excluding LULUCF (% change from 1990)",
    unit: "%",
    description: "Long-run change in methane emissions relative to 1990.",
  },
  {
    id: "EN.GHG.N2O.MT.CE.AR5",
    label: "Nitrous oxide (N2O) emissions excluding LULUCF (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Total nitrous oxide emissions excluding land-use change and forestry.",
  },
  {
    id: "EN.GHG.N2O.ZG.AR5",
    label: "Nitrous oxide (N2O) emissions excluding LULUCF (% change from 1990)",
    unit: "%",
    description: "Long-run change in nitrous oxide emissions relative to 1990.",
  },
  {
    id: "EN.GHG.FGAS.IP.MT.CE.AR5",
    label: "F-gases emissions from industrial processes (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Fluorinated gas emissions from industrial processes.",
  },
  {
    id: "EN.GHG.CO2.PI.MT.CE.AR5",
    label: "CO2 emissions from power industry (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Carbon dioxide emissions from power generation and energy supply.",
  },
  {
    id: "EN.GHG.CO2.TR.MT.CE.AR5",
    label: "CO2 emissions from transport (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Carbon dioxide emissions attributed to transport energy use.",
  },
  {
    id: "EN.GHG.CO2.IC.MT.CE.AR5",
    label: "CO2 emissions from industrial combustion (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Carbon dioxide emissions from industrial combustion energy use.",
  },
  {
    id: "EN.GHG.CO2.IP.MT.CE.AR5",
    label: "CO2 emissions from industrial processes (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Carbon dioxide emissions from industrial process activity.",
  },
  {
    id: "EN.GHG.CO2.BU.MT.CE.AR5",
    label: "CO2 emissions from buildings (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Carbon dioxide emissions from building energy use.",
  },
  {
    id: "EN.GHG.CO2.FE.MT.CE.AR5",
    label: "CO2 emissions from fugitive emissions in energy (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Carbon dioxide emissions from leaks and fugitive releases in the energy system.",
  },
  {
    id: "EN.GHG.CO2.WA.MT.CE.AR5",
    label: "CO2 emissions from waste (Mt CO2e)",
    unit: "Mt CO2e",
    description: "Carbon dioxide emissions associated with waste activities.",
  },
];

export const INDICATOR_GROUPS = {
  economic: {
    id: "economic",
    label: "Economic indicators",
    description: "20 indicators focused on economic scale, trade, industrial depth, infrastructure, and social capacity.",
    indicators: ECONOMIC_INDICATORS,
    defaultSelected: ["NY.GDP.MKTP.CD", "FP.CPI.TOTL.ZG"],
  },
  climate: {
    id: "climate",
    label: "Climate indicators",
    description: "20 emissions-focused indicators covering total greenhouse gases, per-capita emissions, carbon intensity, and sector-level sources.",
    indicators: CLIMATE_INDICATORS,
    defaultSelected: ["EN.GHG.ALL.MT.CE.AR5", "EN.GHG.CO2.PC.CE.AR5"],
  },
};

export const indicatorMap = new Map(
  Object.values(INDICATOR_GROUPS)
    .flatMap((group) => group.indicators)
    .map((indicator) => [indicator.id, indicator]),
);
