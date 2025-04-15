import '@mantine/core/styles.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { Analytics } from '@vercel/analytics/react';
import { theme } from '../theme';
import { PortfolioProvider } from '@/context/PortfolioContext';
import { VisualizationProvider } from '@/context/Visualization';
import Shell from '@/components/AppShell';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>Investment Assistant</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <PortfolioProvider>
        <VisualizationProvider>
          <Shell>
            <Component {...pageProps} />
          </Shell>
        </VisualizationProvider>
      </PortfolioProvider>
      <Analytics />
    </MantineProvider>
  );
}
