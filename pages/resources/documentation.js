/** @jsx jsx */
import Link from 'next/link';
import useResourceStore from 'stores/store';
import { trimMdx } from 'lib/utils';
import { getFileNames } from 'lib/api';
import {
  Container,
  jsx,
  Card,
  Heading,
  Box,
  Link as ThemeLink,
} from 'theme-ui';
import Subheader from 'components/Subheader';
import { RESOURCE_LINKS } from 'components/MenuPopup';
// import {
//   default as guides,
//   _importMeta as metadata,
// } from './../../../content/resources/**/*.mdx';

const Index = ({ list }) => {
  const setResources = useResourceStore(state => state.setResources);
  setResources(list);
  const resources = useResourceStore(state => state.resources);

  return (
    <>
      <Subheader links={RESOURCE_LINKS} />
      <Container>
        <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
          <Heading variant="mediumHeading">Documentation</Heading>
          <Card sx={{ py: 0, px: 3, my: 2 }}>
            {resources.map(({ slug, title }) => (
              <Box as="li" key={slug}>
                <Link key={title} href={`/resources/guides/${slug}/`}>
                  <ThemeLink>{title}</ThemeLink>
                </Link>
              </Box>
            ))}
          </Card>
        </Box>
      </Container>
    </>
  );
};

export async function getStaticProps() {
  const targetPath = 'content/resources/guides';
  const slugs = getFileNames(targetPath);
  const list = slugs.map(slug => {
    const title =
      require(`content/resources/guides/${slug}`).metadata?.title ?? '';
    return {
      slug: trimMdx(slug),
      title,
    };
  });
  return {
    props: {
      list,
    },
  };
}

export default Index;
