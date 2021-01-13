/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import { useGithubAuthRedirect } from 'react-tinacms-github';

// Our GitHub app redirects back to this page with auth code
export default function Authorizing() {
  // Let the main app know, that we received an auth code from the GitHub redirect
  useGithubAuthRedirect();

  return <Container>Authorizing with GitHub, please wait...</Container>;
}
