import { Container, Grid } from '@mantine/core';
import Chat from '@/components/Chat';
import Visualization from '@/components/Visualization';

export default function Home() {
  return (
    <Container fluid h="100%">
      <Grid h="100%" gutter={0} style={{ margin: 0 }}>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Chat />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Visualization />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
