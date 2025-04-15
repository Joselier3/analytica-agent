import { Table, TextInput, NumberInput, Button, Group, Stack, Select } from '@mantine/core';
import { usePortfolio } from '@/context/PortfolioContext';
import { useState } from 'react';

const PortfolioModal = () => {
  const { portfolio, addAsset, removeAsset, updateAsset } = usePortfolio();
  const [newAsset, setNewAsset] = useState({
    name: '',
    ticker: '',
    asset_class: 'Acción',
    current_price: '',
    portfolio_percentage: 0,
    annual_return: ''
  });

  const handleAddAsset = () => {
    if (newAsset.name && newAsset.ticker) {
      addAsset(newAsset);
      setNewAsset({
        name: '',
        ticker: '',
        asset_class: 'Acción',
        current_price: '',
        portfolio_percentage: 0,
        annual_return: ''
      });
    }
  };

  return (
    <Stack>
      <Table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Ticker</th>
            <th>Clase</th>
            <th>Precio</th>
            <th>% Portafolio</th>
            <th>Retorno Anual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {portfolio.assets.map((asset) => (
            <tr key={asset.ticker}>
              <td>{asset.name}</td>
              <td>{asset.ticker}</td>
              <td>{asset.asset_class}</td>
              <td>{asset.current_price}</td>
              <td>{asset.portfolio_percentage}%</td>
              <td>{asset.annual_return}</td>
              <td>
                <Button
                  color="red"
                  variant="light"
                  size="xs"
                  onClick={() => removeAsset(asset.ticker)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Group grow>
        <TextInput
          label="Nombre"
          value={newAsset.name}
          onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
        />
        <TextInput
          label="Ticker"
          value={newAsset.ticker}
          onChange={(e) => setNewAsset({ ...newAsset, ticker: e.target.value })}
        />
        <Select
          label="Clase de Activo"
          value={newAsset.asset_class}
          onChange={(value) => setNewAsset({ ...newAsset, asset_class: value || 'Acción' })}
          data={['Acción', 'Renta Fija', 'Fondos', 'Otros']}
        />
      </Group>

      <Group grow>
        <TextInput
          label="Precio Actual"
          value={newAsset.current_price}
          onChange={(e) => setNewAsset({ ...newAsset, current_price: e.target.value })}
        />
        <NumberInput
          label="% Portafolio"
          value={newAsset.portfolio_percentage}
          onChange={(value) => setNewAsset({ ...newAsset, portfolio_percentage: Number(value) || 0 })}
          min={0}
          max={100}
        />
        <TextInput
          label="Retorno Anual"
          value={newAsset.annual_return}
          onChange={(e) => setNewAsset({ ...newAsset, annual_return: e.target.value })}
        />
      </Group>

      <Button onClick={handleAddAsset}>Agregar Activo</Button>
    </Stack>
  );
};

export default PortfolioModal; 