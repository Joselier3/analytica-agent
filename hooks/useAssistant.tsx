import { useEffect, useRef } from 'react';
import { useAssistant as useAiAssistant } from 'ai/react';
import { useVisualization, ChartData } from '@/context/Visualization';
import { usePortfolio } from '@/context/PortfolioContext';

const useAssistant = () => {
  const { portfolio } = usePortfolio();
  const { setChart, clearChart } = useVisualization();

  const useAssistantHelpers = useAiAssistant({
    api: '/api/openai/run-assistant',
    body: {
      portfolio: portfolio
    }
  });

  const { messages, setThreadId } = useAssistantHelpers;

  const processedMessageIds = useRef<Set<string>>(new Set());

  useEffect(() => {
    messages.forEach((m) => {
      if (processedMessageIds.current.has(m.id)) {
        return;
      }

      if (m.role !== 'data' || !m.data || typeof m.data !== 'object' || !('type' in m.data)) {
        return;
      }

      const { type, ...data } = m.data;

      switch (type) {
        case 'visualization':
          if ('visualization' in data) {
            console.log('Received visualization data:', data.visualization);
            const chartData = data.visualization as ChartData;
            setChart(chartData);
          }
          break;
        default:
          break;
      }

      processedMessageIds.current.add(m.id);
    });
  }, [messages, setChart]);

  // Clear visualization when starting a new thread
  useEffect(() => {
    if (!messages.length) {
      clearChart();
    }
  }, [messages.length, clearChart]);

  return {
    ...useAssistantHelpers,
    messages,
    setThreadId,
  };
};

export default useAssistant;
