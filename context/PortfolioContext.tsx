import { createContext, useContext, useState, ReactNode } from 'react';

interface Asset {
  name: string;
  ticker: string;
  asset_class: string;
  current_price: string;
  portfolio_percentage: number;
  annual_return: string;
}

interface Portfolio {
  portfolio_date: string;
  assets: Asset[];
}

interface PortfolioContextType {
  portfolio: Portfolio;
  addAsset: (asset: Asset) => void;
  removeAsset: (ticker: string) => void;
  updateAsset: (ticker: string, asset: Partial<Asset>) => void;
}

const defaultPortfolio: Portfolio = {
  portfolio_date: "2025-04-14",
  assets: [
    {
      name: "Banco Popular Dominicano",
      ticker: "BPD",
      asset_class: "Acción",
      current_price: "RD$120.50",
      portfolio_percentage: 30,
      annual_return: "8%"
    },
    {
      name: "Empresa Generadora de Electricidad ITABO",
      ticker: "ITABO",
      asset_class: "Acción",
      current_price: "RD$75.20",
      portfolio_percentage: 25,
      annual_return: "10%"
    },
    {
      name: "Acero Estrella",
      ticker: "ACES",
      asset_class: "Acción",
      current_price: "RD$45.10",
      portfolio_percentage: 20,
      annual_return: "12%"
    },
    {
      name: "Bono del Estado RD",
      ticker: "BONO",
      asset_class: "Renta Fija",
      current_price: "RD$1,000.00",
      portfolio_percentage: 15,
      annual_return: "5%"
    },
    {
      name: "Cemento PANAM",
      ticker: "PANAM",
      asset_class: "Acción",
      current_price: "RD$85.75",
      portfolio_percentage: 10,
      annual_return: "9%"
    }
  ]
};

const PortfolioContext = createContext<PortfolioContextType>({
  portfolio: defaultPortfolio,
  addAsset: () => {},
  removeAsset: () => {},
  updateAsset: () => {}
});

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [portfolio, setPortfolio] = useState<Portfolio>(defaultPortfolio);

  const addAsset = (asset: Asset) => {
    setPortfolio(prev => ({
      ...prev,
      assets: [...prev.assets, asset]
    }));
  };

  const removeAsset = (ticker: string) => {
    setPortfolio(prev => ({
      ...prev,
      assets: prev.assets.filter(asset => asset.ticker !== ticker)
    }));
  };

  const updateAsset = (ticker: string, updates: Partial<Asset>) => {
    setPortfolio(prev => ({
      ...prev,
      assets: prev.assets.map(asset =>
        asset.ticker === ticker ? { ...asset, ...updates } : asset
      )
    }));
  };

  return (
    <PortfolioContext.Provider value={{ portfolio, addAsset, removeAsset, updateAsset }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext); 