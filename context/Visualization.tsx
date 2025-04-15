import React, { createContext, useContext, ReactNode, useState } from 'react';

export type ChartData = {
  type: 'bar' | 'line' | 'pie';
  title: string;
  data: any[];
  config: {
    xAxis?: string;
    yAxis?: string;
    categories?: string[];
    colors?: string[];
  };
};

interface VisualizationContextType {
  currentChart: ChartData | null;
  setChart: (chart: ChartData | null) => void;
  clearChart: () => void;
}

const VisualizationContext = createContext<VisualizationContextType>({
  currentChart: null,
  setChart: () => {},
  clearChart: () => {},
});

export const VisualizationProvider = ({ children }: { children: ReactNode }) => {
  const [currentChart, setCurrentChart] = useState<ChartData | null>(null);

  const setChart = (chart: ChartData | null) => {
    setCurrentChart(chart);
  };

  const clearChart = () => {
    setCurrentChart(null);
  };

  return (
    <VisualizationContext.Provider
      value={{
        currentChart,
        setChart,
        clearChart,
      }}
    >
      {children}
    </VisualizationContext.Provider>
  );
};

export const useVisualization = () => {
  const context = useContext(VisualizationContext);
  if (!context) {
    throw new Error('useVisualization must be used within a VisualizationProvider');
  }
  return context;
}; 