import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { InitializeColorMode } from 'theme-ui';
import { ServerStyleSheet } from 'styled-components';

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

const TITLE = 'Maker Protocol Developer Portal';
const DESCRIPTION = 'Resources for developing on the Maker Protocol';
const URL = 'https://developer-portal-mkr-js-prod.vercel.app';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content={DESCRIPTION} />
          <meta property="og:url" content={URL} />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Maker Protocol" />
          <meta property="og:description" content={DESCRIPTION} />
          <meta property="og:title" content={TITLE} />
          <meta property="og:image" content="/images/makerlogo.png" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={TITLE} />
          <meta name="twitter:description" content={DESCRIPTION} />
          <meta name="twitter:image" content="/images/makerlogo.png" />
          <meta name="twitter:image:alt" content={TITLE} />
          <link rel="alternate icon" href="/favicon.ico" />
          <link rel="shortcut icon" href="/favicon.ico" />
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_TRACKING_ID}', {
                page_path: window.location.pathname,
              });
          `,
            }}
          />
        </Head>
        <body>
          <InitializeColorMode />
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}
