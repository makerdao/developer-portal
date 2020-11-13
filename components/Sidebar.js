/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Flex, NavLink, Grid } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Link from 'next/link';

const ListItem = ({ title, root, active, resourcePath, slug }) => {
  return (
    <Fragment>
      <Icon
        name="arrow_right"
        sx={{
          m: 'auto',
          visibility: active ? undefined : 'hidden',
          color: active ? 'primary' : undefined,
        }}
      ></Icon>
      <Link href={`/${resourcePath}/[slug]`} as={`/${resourcePath}/${slug}`} passHref>
        <NavLink
          sx={root ? { textTransform: 'uppercase', color: 'text' } : { color: 'textMuted', ml: 2 }}
          variant="sidebar"
        >
          {title}
        </NavLink>
      </Link>
    </Fragment>
  );
};

const List = ({ items, resourcePath, activeSlug }) => {
  if (!Array.isArray(items)) return null;

  return items?.map(
    ({
      data: {
        frontmatter: { title, root, slug },
      },
      children,
    }) => {
      return (
        <Fragment key={slug}>
          <ListItem
            title={title}
            root={root}
            active={slug === activeSlug}
            resourcePath={resourcePath}
            slug={slug}
          />
          <List items={children} resourcePath={resourcePath} activeSlug={activeSlug} />
        </Fragment>
      );
    }
  );
};

const Sidebar = ({ resources, resourcePath, activeSlug }) => {
  return (
    <Flex sx={{ p: 4, flexDirection: 'column' }}>
      <Grid gap={0} columns={'20px auto'}>
        {resources.map((resource) => {
          return (
            <List
              key={resource[0].fileName}
              items={resource}
              resourcePath={resourcePath}
              activeSlug={activeSlug}
            />
          );
        })}
      </Grid>
    </Flex>
  );
};

export default Sidebar;
