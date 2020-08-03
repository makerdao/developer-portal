/** @jsx jsx */
import { Fragment } from 'react';
import { jsx, Flex, NavLink, Box } from 'theme-ui';
import Link from 'next/link';
import { tableOfContents } from '../pages/tutorials.mdx';

const MenuItem = ({ title, slug, root }) => {
  return (
    <Box
      as="li"
      sx={{
        variant: 'styles.fakeLi',
      }}
    >
      <Link href={`/tutorials#${slug}`}>
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

const Sidebar = () => {
  const toc = tableOfContents();
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
              <MenuItem key={id} title={title} slug={id} root />
              {children && children.length > 0 && (
                <ul
                  sx={{
                    m: 0,
                    p: 0,
                    pl: 3,
                  }}
                >
                  {children.map(({ title, id }) => (
                    <MenuItem key={id} title={title} slug={id} />
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
