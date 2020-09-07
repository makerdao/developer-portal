import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'theme-ui';
import { TinaProvider, TinaCMS } from 'tinacms';
import { TinacmsGithubProvider, GithubMediaStore } from 'react-tinacms-github';
import { AlpacaGitHubClient } from '../utils/githubClient';
import theme from '../theme';

class MyApp extends App {
  constructor(props) {
    super(props);
    const client = new AlpacaGitHubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
      baseBranch: process.env.BASE_BRANCH,
      authScope: 'repo', // for private repos
    });
    const store = new GithubMediaStore(client);
    this.cms = new TinaCMS({
      enabled: props.pageProps.preview,
      media: {
        store: store,
      },
      apis: {
        /**
         * 2. Register the GithubClient
         */
        github: client,
      },
      sidebar: false,
      toolbar: props.pageProps.preview,
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <TinaProvider cms={this.cms}>
          <TinacmsGithubProvider
            onLogin={enterEditMode}
            onLogout={exitEditMode}
            error={pageProps.error}
          >
            <Component {...pageProps} />
          </TinacmsGithubProvider>
        </TinaProvider>
      </ThemeProvider>
    );
  }
}

const enterEditMode = () => {
  const token = localStorage.getItem('tinacms-github-token') || null;

  const headers = new Headers();

  if (token) {
    headers.append('Authorization', 'Bearer ' + token);
  }

  return fetch('/api/preview', { headers: headers }).then(() => {
    window.location.href = window.location.pathname;
  });
};

const exitEditMode = () => {
  return fetch('/api/reset-preview').then(() => {
    window.location.reload();
  });
};

export default MyApp;
