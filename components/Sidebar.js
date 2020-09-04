/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Flex, NavLink, Box } from 'theme-ui';
import Link from 'next/link';

const MenuItem = ({ resourcePath, slug, title, anchor, root }) => {
  return (
    <Box
      as="li"
      sx={{
        variant: 'styles.fakeLi',
      }}
    >
      <Link href={`/${resourcePath}/[slug]`} as={`/${resourcePath}/${slug}#${anchor}`}>
        <NavLink
          variant="sidebar"
          sx={{
            textAlign: 'left',
            color: 'text',
            borderRadius: 'xs',
            pl: 0,
            fontWeight: () => root && 'heading',
          }}
        >
          {title}
        </NavLink>
      </Link>
    </Box>
  );
};

const Sidebar = ({ resourcePath, slug, menu, toc = [] }) => {
  return (
    <aside>
      <Flex
        sx={{
          flexDirection: 'column',
          py: 4,
          px: 2,
        }}
      >
        {toc.map(({ content, slug: heading, lvl }) => {
          const root = lvl === 1;
          return (
            <Fragment key={slug}>
              {root ? (
                <MenuItem
                  resourcePath={resourcePath}
                  slug={slug}
                  key={slug}
                  title={content}
                  anchor={heading}
                  root
                />
              ) : (
                <ul
                  sx={{
                    m: 0,
                    p: 0,
                    pl: 3,
                  }}
                >
                  <MenuItem
                    resourcePath={resourcePath}
                    slug={slug}
                    key={slug}
                    title={content}
                    anchor={heading}
                  />
                </ul>
              )}
            </Fragment>
          );
        })}
      </Flex>
    </aside>
  );
};

export default Sidebar;
