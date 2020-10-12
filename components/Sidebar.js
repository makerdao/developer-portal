/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Flex, NavLink, Grid, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Link from 'next/link';
import useStore from '../stores/store';
import { navItems } from '../data/resourcesSubNav.json';

const Sidebar = ({ resources, resourcePath, activeSlug }) => {
  const activeModule = useStore((state) => state.activeModule);

  return (
    <Flex sx={{ p: 4, flexDirection: 'column' }}>
      <Grid gap={0} columns={'20px auto'}>
        <Text sx={{ pl: 2, gridColumnStart: 2 }}>{`${
          navItems.find(({ slug }) => slug === activeModule)?.name
        } Module`}</Text>
        {resources.map(({ title, slug }) => {
          const active = slug === activeSlug;
          return (
            <Fragment key={slug}>
              <Icon
                name="arrow_right"
                sx={{ m: 'auto', visibility: active ? undefined : 'hidden' }}
              ></Icon>
              <Link href={`/${resourcePath}/[slug]`} as={`/${resourcePath}/${slug}`} passHref>
                <NavLink variant="sidebar">{title}</NavLink>
              </Link>
            </Fragment>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default Sidebar;
