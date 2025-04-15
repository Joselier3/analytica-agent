# Investment Portfolio Assistant

An intelligent assistant that helps users analyze and visualize their investment portfolio. Built with Next.js, Mantine UI, and powered by AI.

## Features

- **Portfolio Management**: Add, update, and remove assets in your investment portfolio
- **Interactive Visualizations**: View your portfolio data through dynamic charts and graphs
- **AI-Powered Analysis**: Get insights and recommendations about your investments
- **Real-time Data**: Analyze performance metrics and portfolio allocation

### Visualization Types

The assistant can create several types of visualizations to help analyze your portfolio:

- **Bar Charts**: Compare assets by return rates, allocation percentages, or other metrics
- **Pie Charts**: View portfolio allocation and distributions
- **Line Charts**: Analyze trends and performance over time

### Portfolio Data

The system manages a complete portfolio with detailed asset information:
- Asset names and tickers
- Asset classes
- Current prices
- Portfolio allocation percentages
- Annual returns

## Getting Started

### Install dependencies

```bash
npm install
# or
yarn
```

### Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Usage

1. Click the "Mi Portafolio" button to view and edit your portfolio
2. Ask the assistant questions about your investments
3. Request visualizations to better understand your portfolio's performance and allocation

## Technical Implementation

- **Frontend**: Next.js with Mantine UI components
- **Visualization**: Recharts library for responsive data visualization
- **State Management**: React Context API for portfolio and visualization state
- **AI Integration**: OpenAI-powered assistant for natural language analysis

## npm scripts

### Build and dev scripts

- `dev` – start dev server
- `build` – bundle application for production
- `export` – exports static website to `out` folder
- `analyze` – analyzes application bundle with [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer)

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `jest` – runs jest tests
- `jest:watch` – starts jest watch
- `test` – runs `jest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `prettier:write` – formats all files with Prettier
