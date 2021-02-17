/** @jsx jsx */
import Link from 'next/link';
import {
  jsx,
  Flex,
  Grid,
  Text,
  NavLink,
  Container,
  Link as ThemeLink,
  useColorMode,
} from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const links = [
  [
    'Resources',
    [
      ['Documentation', '/documentation'],
      ['Guides', '/guides'],
      ['Security', '/security'],
    ],
  ],
  [
    'Documentation',
    [
      ['Introduction', '/introduction'],
      ['Smart Contracts', '/smart-contracts'],
      ['Auctions', '/auctions'],
      ['Keepers', '/auctions'],
      ['SDKs', '/auctions'],
      ['CLIs', '/auctions'],
      ['Glossary', '/auctions'],
    ],
  ],
  [
    'Security',
    [
      ['Introduction', '/introduction'],
      ['Audit Reports', '/smart-contracts'],
      ['Bug Bounty Program', '/auctions'],
      ['Formal Verification', '/auctions'],
    ],
  ],
  [
    'Libraries',
    [
      ['Dai.js', '/introduction'],
      ['Pymaker', '/smart-contracts'],
    ],
  ],
  [
    'Community',
    [
      ['Comm Dev Portal', '/introduction'],
      ['Blog', '/smart-contracts'],
      ['Forum', '/auctions'],
      ['Events', '/auctions'],
    ],
  ],
];

const ColorModeToggle = (props) => {
  const [mode, setMode] = useColorMode();
  return (
    <Icon
      name={'moon'}
      color="text"
      size="auto"
      sx={{ height: 20, width: 20, cursor: 'pointer' }}
      onClick={(e) => {
        const next = mode === 'dark' ? 'light' : 'dark';
        setMode(next);
      }}
    />
  );
};

const IconLink = ({ name, url, height = 20, width = 20 }) => {
  return (
    <ThemeLink href={url} target="_blank">
      <Icon name={name} color="text" size="auto" sx={{ cursor: 'pointer', height, width }} />
    </ThemeLink>
  );
};

const Section = ({ title, content }) => {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Text variant="plainText" sx={{ fontSize: 3, fontWeight: 'semiBold' }}>
        {title}
      </Text>
      {content.map(([name, url]) => {
        return (
          <Link key={name} href={url} passHref>
            <NavLink
              sx={{ px: 0, py: 1, fontSize: 3, color: 'onBackgroundMuted' }}
              variant="sidebar"
            >
              {name}
            </NavLink>
          </Link>
        );
      })}
    </Flex>
  );
};

const Footer = () => {
  return (
    <Container as="footer">
      <Grid sx={{ pb: 4 }} columns={[2, 6]} gap={4}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Flex sx={{ pb: 2 }}>
            <IconLink name="maker_full" url="https://www.makerdao.com" width={127} />
          </Flex>
          <Flex>
            <Flex sx={{ pr: 4 }}>
              <IconLink name="github" url="https://github.com/makerdao/" />
            </Flex>
            <Flex>
              <IconLink name="rocketchat" url="https://chat.makerdao.com/channel/dev" />
            </Flex>
          </Flex>
          <Flex sx={{ mt: 'auto', alignItems: 'center' }}>
            <ColorModeToggle />
            <Text variant="plainText" sx={{ fontSize: 3, pl: 2 }}>
              Color Mode
            </Text>
          </Flex>
        </Flex>
        {links.map(([title, content]) => {
          return <Section key={title} title={title} content={content} />;
        })}
      </Grid>
    </Container>
  );
};

export default Footer;
