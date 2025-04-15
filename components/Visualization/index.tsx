import { Box, Title, Text } from '@mantine/core';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useVisualization } from '@/context/Visualization';
import { useEffect } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';

// Sample data structure for testing
// const sampleData = [
//   { name: 'BPD', value: 8 },
//   { name: 'ITABO', value: 10 },
//   { name: 'ACES', value: 12 },
//   { name: 'BONO', value: 5 },
//   { name: 'PANAM', value: 9 },
// ];

const COLORS = ['#FF6B3D', '#00CF65', '#397CF8', '#E93F86', '#00D1D1'];

export default function Visualization() {
  const { currentChart } = useVisualization();
  const { portfolio } = usePortfolio();

  // Debug logging
  useEffect(() => {
    if (currentChart) {
      console.log('Chart data:', currentChart);
      console.log('Data array:', currentChart.data);
      console.log('Categories:', currentChart.config?.categories);
      console.log('Portfolio:', portfolio);
    }
  }, [currentChart, portfolio]);

  if (!currentChart) {
    return (
      <Box
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text c="dimmed">No visualization available</Text>
      </Box>
    );
  }

  // Generate data from categories if data is missing but categories are present
  const generateDataFromCategories = () => {
    if (currentChart.config?.categories?.length && (!currentChart.data || !Array.isArray(currentChart.data))) {
      console.log("Generating data from categories");
      
      return currentChart.config.categories.map(category => {
        // Try to find the corresponding asset in the portfolio
        const asset = portfolio.assets.find(a => 
          category.includes(a.name) || category.includes(a.ticker));
        
        let value = 0;
        if (asset) {
          // If we find a matching asset, use its portfolio percentage
          if (currentChart.title.toLowerCase().includes("allocation")) {
            value = asset.portfolio_percentage;
          } else if (currentChart.title.toLowerCase().includes("return")) {
            // Extract numeric value from return
            value = parseFloat(asset.annual_return.replace(/[^0-9.]/g, ''));
          }
        }
        
        return {
          name: category,
          value: value
        };
      });
    }
    return null;
  };

  // Default sample data
  const sampleData = [
    { name: 'Acero Estrella (ACES)', value: 12 },
    { name: 'Empresa ITABO (ITABO)', value: 10 },
    { name: 'Cemento PANAM (PANAM)', value: 9 },
    { name: 'Banco Popular (BPD)', value: 8 },
    { name: 'Bono del Estado (BONO)', value: 5 }
  ];
  
  // Choose data source in priority order
  const dataToUse = 
    (currentChart.data && Array.isArray(currentChart.data) && currentChart.data.length > 0) 
    ? currentChart.data 
    : generateDataFromCategories() || sampleData;
  
  // Process data for visualization
  const processedData = dataToUse.map(item => ({
    name: item.name || 'Unknown',
    value: typeof item.value === 'string' 
      ? parseFloat(item.value.replace(/[^0-9.]/g, '')) 
      : (typeof item.value === 'number' ? item.value : 0)
  }));

  console.log('Data source:', 
    dataToUse === currentChart.data ? 'Original data' : 
    dataToUse === generateDataFromCategories() ? 'Generated from categories' : 'Sample data');
  console.log('Processed data:', processedData);
  
  const renderChart = () => {
    switch (currentChart.type) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={processedData}
              layout="vertical"
              margin={{ top: 20, right: 50, left: 120, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} />
              <XAxis type="number" domain={[0, 'dataMax + 2']} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={100}
              />
              <Tooltip formatter={(value) => [`${value}%`, "Annual Return"]} />
              <Legend />
              <Bar
                dataKey="value"
                name="Annual Return"
                fill="#FF6B3D"
                label={{ position: 'right', formatter: (v: number) => `${v}%`, fill: '#000', fontSize: 12 }}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#FF6B3D"
                name={currentChart.title}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={processedData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={140}
                label={({name, value}) => `${name}: ${value}%`}
                labelLine={true}
              >
                {processedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={currentChart.config.colors?.[index] || COLORS[index % COLORS.length]}
                    name={entry.name}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );

      default:
        return (
          <Box>
            <Text>Unsupported chart type: {currentChart.type}</Text>
            <pre>{JSON.stringify(currentChart, null, 2)}</pre>
          </Box>
        );
    }
  };

  return (
    <Box p="md" style={{ height: '100%', minHeight: '500px' }}>
      <Title order={3} mb="lg" ta="center">
        {currentChart.title}
      </Title>
      {renderChart()}
    </Box>
  );
} 