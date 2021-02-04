/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react';
import { jsx, Flex, NavLink, Text } from 'theme-ui';
import Link from 'next/link';
import useStore from '../stores/store';
import { navItems } from '../data/resourcesSubNav.json';

const ListItem = ({ title, root: isRoot, activeSlug, resourcePath, slug, parent: hasParent }) => {
  const active = slug === activeSlug;

  const variableStyles = isRoot
    ? { fontSize: 3, color: active ? 'primary' : 'text' }
    : hasParent
    ? { fontSize: 2, color: active ? 'primary' : 'onBackgroundMuted', ml: 3 }
    : undefined;

  return (
    <Flex sx={{ p: 0, pt: isRoot ? 3 : 2 }}>
      <Flex
        sx={{
          flexDirection: 'row',
          width: '100%',
          border: active ? 'light' : undefined,
          borderColor: 'primary',
          borderWidth: '0 1px 0 0',
          position: 'relative',
          left: '1px',
          zIndex: -1,
        }}
      >
        <Link href={`/${resourcePath}/[slug]`} as={`/${resourcePath}/${slug}`} passHref>
          <NavLink sx={{ ...variableStyles, ...{ py: 0 } }} variant="sidebar">
            {title}
          </NavLink>
        </Link>
      </Flex>
    </Flex>
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
  const activeGroup = useStore((state) => state.activeGroup);
  const [name, setName] = useState(null);
  useEffect(() => {
    setName(navItems.find((ni) => ni.slug === activeGroup)?.name);
  }, [activeGroup]);

  return (
    <Flex
      sx={{
        p: 0,
        pl: 4,
        flexDirection: 'column',
        border: 'light',
        borderColor: 'muted',
        borderWidth: '0 1px 0 0',
        position: 'relative',
        zIndex: -2,
      }}
    >
      <Text sx={{ px: 2, pt: 3, color: 'textMuted' }} variant="caps">
        {name}
      </Text>
      {resources.map((resource, i) => (
        <List key={i} items={resource} resourcePath={resourcePath} activeSlug={activeSlug} />
      ))}
    </Flex>
  );
};

export default Sidebar;
