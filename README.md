# Maker Protocol Developer Portal
## Local Development
For development run:

`yarn && yarn dev`

Pushed commits are automatically deployed by Vercel.

## Environmental Variables

Requires a local `.env` file with the following fields to configure various services.

### For Configuring TinaCMS
See [this guide](https://tina.io/guides/nextjs/github/github-oauth-app/) for more information on setting up an OAuth app with Github.

`GITHUB_CLIENT_ID`: The client ID from your OAuth app.

`GITHUB_CLIENT_SECRET`: The client secret from your OAuth app.

`REPO_FULL_NAME`: Set to **makerdao/developer-portal** or your forked repo.

`BASE_BRANCH`: Set to **master** or any existing branch.

`SIGNING_KEY`: You can generate a key by running `openssl rand -base64 32` in your terminal, using the output as your Signing Key.

### For Configuring Buttondown Newsletter

`BUTTONDOWN_API_KEY`: Get an API key from [Buttondown](https://buttondown.email/)

### For Configuring Github Feedback Submissions

`USERNAME_ISSUES`: The github username to use for submitting issues.

`REPO_ISSUES`: The repository to use for submitting issues.

`GH_TOKEN_ISSUES`: The token associated with the username.
