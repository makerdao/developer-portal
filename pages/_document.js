import React from 'react';
import Document, { Html, Main, NextScript } from 'next/document';
import { InitializeColorMode } from 'theme-ui';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <body>
          <InitializeColorMode />
          <Main />
          <div id="portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
