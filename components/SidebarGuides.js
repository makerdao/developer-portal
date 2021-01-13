/** @jsx jsx */
import { jsx, Flex, NavLink } from 'theme-ui';
import Link from 'next/link';

const ListItem = ({ title, activeSlug, resourcePath, slug }) => {
  const active = slug === activeSlug;
  return (
    <Flex>
      <Link href={`/${resourcePath}/[slug]`} as={`/${resourcePath}/${slug}`} passHref>
        <NavLink sx={{ fontSize: 3, color: active ? 'primary' : undefined }} variant="sidebar">
          {title}
        </NavLink>
      </Link>
    </Flex>
  );
};

const Sidebar = ({ resources, resourcePath, activeSlug }) => {
  return (
    <Flex
      sx={{
        pl: 4,
        pt: 4,
        flexDirection: 'column',
        border: 'light',
        borderColor: 'mutedAlt',
        borderWidth: '0 1px 0 0',
      }}
    >
      {resources.map((resource, i) => (
        <ListItem
          key={i}
          title={resource.data.frontmatter.title}
          resourcePath={resourcePath}
          activeSlug={activeSlug}
          slug={resource.data.frontmatter.slug}
        />
      ))}
    </Flex>
  );
};

export default Sidebar;
