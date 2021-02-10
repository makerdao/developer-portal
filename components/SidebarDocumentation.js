/** @jsx jsx */
import { Fragment, useState, useEffect } from 'react';
import { jsx, Flex, NavLink, Text, Box } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Link from 'next/link';
import useStore from '../stores/store';
import { navItems } from '../data/resourcesSubNav.json';

const ListItem = ({
  title,
  root: isRoot,
  activeSlug,
  resourcePath,
  slug,
  parent: hasParent,
  mobile,
}) => {
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
          border: mobile ? undefined : active ? 'light' : undefined,
          borderColor: 'primary',
          borderWidth: '0 1px 0 0',
          position: [undefined, undefined, 'relative'],
          left: '1px',
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

const List = ({ items, resourcePath, activeSlug, mobile }) => {
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
              mobile={mobile}
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

const MobileSidebar = ({ open, onClick }) => {
  return (
    <Box
      sx={{
        border: 'light',
        borderColor: 'muted',
        borderWidth: '0 0 1px 0',
        p: 2,
      }}
      onClick={() => onClick(!open)}
    >
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
        <NavLink sx={{ px: 0 }}>Topics</NavLink>
        <Icon
          name={open ? 'dp_arrow_up' : 'dp_arrow_down'}
          size="auto"
          color="primary"
          sx={{
            cursor: 'pointer',
            height: 20,
            width: 20,
          }}
        />
      </Flex>
    </Box>
  );
};

const Sidebar = ({ resources, resourcePath, activeSlug, mobile, router }) => {
  const activeGroup = useStore((state) => state.activeGroup);
  const [name, setName] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setName(navItems.find((ni) => ni.slug === activeGroup)?.name);
  }, [activeGroup]);

  useEffect(() => {
    if (mobile) {
      setMobileOpen(false);
    }
  }, [mobile, router?.asPath]);

  return (
    <>
      {mobile && <MobileSidebar open={mobileOpen} onClick={setMobileOpen} />}
      {mobileOpen || !mobile ? (
        <Flex
          sx={{
            p: 0,
            pl: [0, 0, 0, 4],
            flexDirection: 'column',
            border: mobile ? undefined : 'light',
            borderColor: 'muted',
            borderWidth: '0 1px 0 0',
            minWidth: '200px',
          }}
        >
          <Text sx={{ px: 2, pt: 3, color: 'textMuted' }} variant="caps">
            {name}
          </Text>
          {resources.map((resource, i) => (
            <List
              key={i}
              items={resource}
              resourcePath={resourcePath}
              activeSlug={activeSlug}
              mobile={mobile}
            />
          ))}
        </Flex>
      ) : null}
    </>
  );
};

export default Sidebar;
