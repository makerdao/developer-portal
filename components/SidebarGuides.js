/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Flex, NavLink, Grid } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Link from 'next/link';

const ListItem = ({ title, root, activeSlug, resourcePath, slug, parent }) => {
  const active = slug === activeSlug;
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
          sx={root ? { color: 'text' } : parent ? { color: 'textMuted', ml: 2 } : undefined}
          variant="sidebar"
        >
          {title}
        </NavLink>
      </Link>
    </Fragment>
  );
};

const List = ({ items, resourcePath, activeSlug }) => {
  return Array.isArray(items) ? (
    items.map(
      ({
        data: {
          frontmatter: { title, root, slug, parent },
        },
        children,
      }) => {
        return (
          <Fragment key={slug}>
            <ListItem
              title={title}
              root={root}
              activeSlug={activeSlug}
              resourcePath={resourcePath}
              slug={slug}
              parent={parent}
            />
            {children && (
              <List items={children} resourcePath={resourcePath} activeSlug={activeSlug} />
            )}
          </Fragment>
        );
      }
    )
  ) : (
    <Fragment>
      <ListItem
        title={items.data.frontmatter.title}
        root={items.data.frontmatter.root}
        activeSlug={activeSlug}
        resourcePath={resourcePath}
        slug={items.data.frontmatter.slug}
        parent={items.data.frontmatter.parent}
      />
    </Fragment>
  );
};

const Sidebar = ({ resources, resourcePath, activeSlug }) => {
  return (
    <Flex sx={{ p: 4, flexDirection: 'column' }}>
      <Grid gap={0} columns={'20px auto'}>
        {resources.map((resource, i) => (
          <List key={i} items={resource} resourcePath={resourcePath} activeSlug={activeSlug} />
        ))}
      </Grid>
    </Flex>
  );
};

export default Sidebar;
