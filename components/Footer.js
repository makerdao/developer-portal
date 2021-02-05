/** @jsx jsx */
import { jsx, Flex, Container, Link as ThemeLink, useColorMode } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

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

const Footer = () => {
  return (
    <Container as="footer">
      <Flex sx={{ justifyContent: 'flex-end' }}>
        <Flex sx={{ pr: 4 }}>
          <IconLink name="github" url="https://github.com/makerdao/" />
        </Flex>
        <Flex sx={{ pr: 4 }}>
          <IconLink name="rocketchat" url="https://chat.makerdao.com/channel/dev" />
        </Flex>
        <Flex>
          <ColorModeToggle />
        </Flex>
      </Flex>
    </Container>
  );
};

export default Footer;
