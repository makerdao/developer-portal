/** @jsx jsx */
import Link from 'next/link';
import { Container, jsx, Card, Heading, Grid, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { navItems as docLinks } from '../data/resourcesSubNav.json';

const DocumentationList = () => {
  return (
    <Container>
      <Flex sx={{ mb: 3, alignItems: 'center', justifyContent: 'space-between' }}>
        <Heading variant="largeHeading">Documentation</Heading>

        <Link href={'/documentation'} passHref>
          <Flex sx={{ ml: 3, alignItems: 'center' }}>
            <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
            <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>Introduction</ThemeLink>
          </Flex>
        </Link>
      </Flex>
      <Grid
        sx={{
          columnGap: 3,
          gridAutoFlow: 'column',
          overflowX: 'auto',
          '::-webkit-scrollbar': {
            width: '0px',
          },

          gridTemplateRows: 'auto',

          rowGap: 3,
        }}
      >
        {docLinks.map(({ name, url }) => {
          return (
            <Card
              key={name}
              sx={{
                width: 180,
                border: 'light',
                bg: 'background',
                borderColor: 'muted',
              }}
            >
              <Flex
                sx={{
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                }}
              >
                <Heading>{name}</Heading>
                <Link href={`${url}`} passHref>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                    <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>View Docs</ThemeLink>
                  </Flex>
                </Link>
              </Flex>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
};

export default DocumentationList;
