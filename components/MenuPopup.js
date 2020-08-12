/** @jsx jsx */
import Link from 'next/link';
import { jsx, Card, Grid, NavLink } from 'theme-ui';
import Portal from './Portal';

export const RESOURCE_LINKS = [
  { url: '/resources/guides', name: 'Guides' },
  { url: '/resources/documentation', name: 'API Documentation' },
  { url: '/resources/community', name: 'Community Content' },
];

const ResourcesMenu = () => {
  return (
    <Grid>
      {RESOURCE_LINKS.map(({ name, url }) => {
        return (
          <Link key={name} href={{ pathname: `${url}` }} passHref>
            <NavLink>{name}</NavLink>
          </Link>
        );
      })}
    </Grid>
  );
};
const template = {
  Resources: <ResourcesMenu />,
};

const MenuPopup = ({ setState, state }) => {
  const { show, left, top, name } = state;
  return show ? (
    <Portal selector="#portal">
      <Card
        onMouseLeave={() => setState({ ...state, show: false })}
        sx={{
          top: top,
          left: left,
          zIndex: 100,
          position: 'fixed',
        }}
      >
        {template[name]}
      </Card>
    </Portal>
  ) : null;
};

export default MenuPopup;
