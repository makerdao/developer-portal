import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'theme-ui';
import MakerProvider from '../../providers/MakerProvider';
import theme from '../../theme';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Providers = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <MakerProvider network="testnet">
        <Header />
        {children}
        <Footer />
      </MakerProvider>
    </ThemeProvider>
  );
};

export const customRender = (ui, options) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
