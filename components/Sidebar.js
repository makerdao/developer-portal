/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Flex, NavLink, Grid, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Link from 'next/link';

const Sidebar = ({ resources, resourcePath, activeSlug }) => {
  return (
    <Flex sx={{ p: 4, flexDirection: 'column' }}>
      <Grid gap={0} columns={'20px auto'}>
        <Text sx={{ pl: 2, gridColumnStart: 2 }}>Module</Text>
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
