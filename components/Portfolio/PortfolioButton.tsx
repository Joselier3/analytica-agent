import { Button, Modal, useMantineTheme } from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';
import { useState } from 'react';
import PortfolioModal from './PortfolioModal';

const PortfolioButton = () => {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <>
      <Button
        leftSection={<IconChartBar size={20} />}
        variant="light"
        color={theme.primaryColor}
        onClick={() => setOpened(true)}
        style={{ marginBottom: '1rem' }}
      >
        Mi Portafolio
      </Button>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Gestión de Portafolio"
        size="xl"
      >
        <PortfolioModal />
      </Modal>
    </>
  );
};

export default PortfolioButton; 