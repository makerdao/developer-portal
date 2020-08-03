import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ThemeProvider } from 'theme-ui';
import Prism from '@theme-ui/prism';
import MakerProvider from '../providers/MakerProvider';
import theme from '../theme';
import Header from '../components/Header';
import Footer from '../components/Footer';

const components = {
  pre: ({ children }) => <>{children}</>,
  code: Prism,
};

const MyApp = ({ Component, pageProps }) => {
  const { query } = useRouter();
  const [network, setNetwork] = useState();
  const queryParams = network ? { network } : {};

  useEffect(() => {
    setNetwork(query.network);
  }, [query.network]);

  return (
    <ThemeProvider theme={theme} components={components}>
      <MakerProvider network={network}>
        <Header query={queryParams} />
        <Component {...pageProps} />
        <Footer />
      </MakerProvider>
    </ThemeProvider>
  );
};

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp;
