# World Bank Visualiser

Interactive React app for exploring World Bank data by country, year, and indicator set.

Live site:

[https://incanberra.github.io/world-bank-visualiser/](https://incanberra.github.io/world-bank-visualiser/)

## Features

- Choose between two indicator families:
- Economic indicators
- Climate emissions indicators
- Compare multiple countries at once
- Select one or more indicators
- Choose a year range
- Generate line charts, bar charts, and heat maps
- Export charts as SVG

## Built With

- React
- Vite
- World Bank Data API
- Custom SVG chart rendering

## Run Locally

From the project folder:

```powershell
npm.cmd install
npm.cmd run dev
```

Then open:

[http://localhost:5173](http://localhost:5173)

## Build for Production

```powershell
npm.cmd run build
```

## Deployment

This repo is configured to deploy automatically to GitHub Pages using GitHub Actions.

## Data Source

World Bank Data API:

[https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation](https://datahelpdesk.worldbank.org/knowledgebase/articles/889392-about-the-indicators-api-documentation)
