/** @jsx jsx */
import {
  Container,
  jsx,
  Link as ThemeLink,
  NavLink,
  Flex,
  Text,
  Card,
  Grid,
  Heading,
} from 'theme-ui';
import Portal from './Portal';

const MenuContent = () => {
  return (
    <Grid>
      <Heading>Interfaces</Heading>
      <Grid columns={['1fr 1fr']}>
        {['first', 'second', 'third', 'fourth'].map(name => {
          return <Text key={name}>{name}</Text>;
        })}
      </Grid>
      <Heading>Tools</Heading>
      <Grid columns={['1fr 1fr']}>
        {['aaaaa', 'bbbbb', 'ccccccc', 'dddddd'].map(name => {
          return <Text key={name}>{name}</Text>;
        })}
      </Grid>
    </Grid>
  );
};

const MenuPopup = ({ setState, state }) => {
  const { show, left, top } = state;
  return show ? (
    <Portal selector="#portal">
      <Card
        onMouseLeave={() => setState({ ...state, show: false })}
        sx={{
          top: top,
          left: left,
          width: 7,
          zIndex: 100,
          position: 'fixed',
        }}
      >
        <MenuContent />
      </Card>
    </Portal>
  ) : null;
};

export default MenuPopup;
