/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Flex, NavLink, Box } from 'theme-ui';
import Link from 'next/link';

const MenuItem = ({ slug, title, anchor, root }) => {
  // TODO something wrong with the toc-module plugin
  if (typeof title !== 'string') title = anchor;
  return (
    <Box
      as="li"
      sx={{
        variant: 'styles.fakeLi',
      }}
    >
      <Link
        href={'/resources/documentation/[slug]'}
        as={`/resources/documentation/${slug}#${anchor}`}
      >
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

const Sidebar = ({ slug, menu, toc = [] }) => {
  return (
    <aside>
      <Flex
        sx={{
          flexDirection: 'column',
          py: 4,
          px: 2,
        }}
      >
        {toc.map(({ title, id, children }) => {
          return (
            <Fragment key={id}>
              <MenuItem slug={slug} key={id} title={title} anchor={id} root />
              {children && children.length > 0 && (
                <ul
                  sx={{
                    m: 0,
                    p: 0,
                    pl: 3,
                  }}
                >
                  {children.map(({ title, id }) => (
                    <MenuItem slug={slug} key={id} title={title} anchor={id} />
                  ))}
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
