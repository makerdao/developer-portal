import {
  Container,
  jsx,
  Card,
  Box,
  Button,
  Heading,
  Text,
  Grid,
  Flex,
  Link as ThemeLink,
} from 'theme-ui';
import { InlineForm, InlineText, InlineTextarea } from 'react-tinacms-inline';
import Link from 'next/link';
import { navItems as docLinks } from '../data/resourcesSubNav.json';

import { Icon } from '@makerdao/dai-ui-icons';

const ModulesList = () => {
  return (
    <Container>
      <Grid
        // columns={['1fr 1fr', '1fr 1fr 1fr 1fr']}
        sx={{
          columnGap: 3,
          gridAutoFlow: 'column',
          overflowX: 'auto',

          gridTemplateRows: 'auto',

          rowGap: 3,
        }}
      >
        {docLinks.map(({ name, url, description }) => {
          return (
            <Card
              key={name}
              sx={{
                width: 180,
              }}
            >
              <Grid>
                <Heading>{name}</Heading>
                {/* <Link href={`${name.toLowerCase()}`} passHref>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} name={'arrow_right'}></Icon>
                    <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>Learn More</ThemeLink>
                  </Flex>
                </Link> */}
                <Link href={`${url}`} passHref>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} name={'arrow_right'}></Icon>
                    <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>View Docs</ThemeLink>
                  </Flex>
                </Link>
              </Grid>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
};

export default ModulesList;
