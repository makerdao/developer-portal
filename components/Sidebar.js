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
      <Link href={`/${resourcePath}/[slug]`} as={`/${resourcePath}/${slug}#${anchor}`} passHref>
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

const Sidebar = ({ resourcePath, slug, toc }) => {
  const h1s = toc.filter((x) => x.lvl === 1);
  return (
    // <aside>
    //   <Flex
    //     sx={{
    //       flexDirection: 'column',
    //       py: 4,
    //       px: 2,
    //     }}
    //   >
    toc.map(({ content: title, slug: anchor, lvl }) => {
      const root = h1s.length === 1 ? lvl === 1 || lvl === 2 : lvl === 1;
      return (
        <Fragment key={anchor}>
          {root ? (
            <MenuItem
              resourcePath={resourcePath}
              slug={slug}
              key={anchor}
              title={title}
              anchor={anchor}
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
                key={anchor}
                title={title}
                anchor={anchor}
              />
            </ul>
          )}
        </Fragment>
      );
    })
    //   </Flex>
    // </aside>
  );
};

export default Sidebar;
