/** @jsx jsx */
import {
  jsx,
  Card,
  Text,
  Box,
  Grid,
  BaseStyles,
  Container,
  Flex,
  NavLink,
  Link as ThemeLink,
} from 'theme-ui';
import Sidebar from '@components/Sidebar';
import SingleLayout from '@layouts/SingleLayout';
import SubNav from '../components/SubNav';
import subNavLinks from '../data/resourcesSubNav.json';
import { Icon } from '@makerdao/dai-ui-icons';
import Link from 'next/link';

// TODO Rename
const Infobar = ({ resourcePath, slug, toc }) => {
  return (
    <Box
      sx={{
        border: 'solid',
        borderColor: 'onBackgroundMuted',
        borderWidth: '0 0 0 1px',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          border: 'solid',
          borderColor: 'onBackgroundMuted',
          borderWidth: '0 0 1px 0',
          width: '100%',
          mb: 3,
          mt: 2,
          mr: 0,
        }}
      >
        <NavLink>Contents</NavLink>
      </Box>
      <Box sx={{ px: 3 }}>
        <Sidebar resourcePath={resourcePath} slug={slug} toc={toc} />
      </Box>
    </Box>
  );
};

const NAV = [
  { title: 'Introduction', link: '/' },
  { title: 'POT', link: '/documentation/pot-detailed-documentation' },
  { title: 'JUST', link: '/documentation/jug-detailed-documentation' },
];

const NewSideBar = () => {
  return (
    <Flex sx={{ p: 4, flexDirection: 'column' }}>
      {NAV.map(({ title, link }) => {
        return (
          <Flex sx={{ alignItems: 'center' }} key={title}>
            <Icon name="arrow_right"></Icon>
            <Link href={link} passHref>
              <ThemeLink>{title}</ThemeLink>
            </Link>
          </Flex>
        );
      })}
    </Flex>
  );
};

const GuidesLayout = ({ resourcePath, slug, toc, children }) => {
  const subnav = <SubNav links={subNavLinks} />;
  return (
    <SingleLayout subnav={subnav}>
      {/* <Container> */}
      <Grid columns={['auto', '250px auto 250px']} gap="0">
        {/* <Sidebar resourcePath={resourcePath} slug={slug} toc={toc} /> */}
        <NewSideBar />
        <Box sx={{ bg: 'surface', borderRadius: 0, py: 0, px: 4 }}>
          <BaseStyles>{children}</BaseStyles>
        </Box>
        <Infobar resourcePath={resourcePath} slug={slug} toc={toc} />
      </Grid>
      {/* </Container> */}
    </SingleLayout>
  );
};

export default GuidesLayout;
