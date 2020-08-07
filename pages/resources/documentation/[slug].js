/** @jsx jsx */
import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';
import { Container, jsx, Card, Heading, Text, Grid, Box, Flex } from 'theme-ui';
// import { getFileNames } from 'lib/api';
import SingleSidebarLayout from 'layouts/SingleSidebarLayout';

const Document = ({ slug, metadata }) => {
  const { title } = metadata;
  console.log(metadata);
  const menu = [{ title, id: 1 }];
  const Mdx = dynamic(() =>
    import(`content/resources/documentation/${slug}/index.mdx`)
  );

  return (
    <SingleSidebarLayout menu={menu}>
      <Mdx />
    </SingleSidebarLayout>
  );
};

export async function getStaticPaths() {
  const targetPath = 'content/resources/documentation';
  const slugs = fs.readdirSync(join(process.cwd(), targetPath));
  const paths = slugs?.map(slug => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug;
  const mdx = require(`content/resources/documentation/${slug}/index.mdx`);
  return {
    props: {
      slug,
      metadata: mdx.metadata,
    },
  };
}

export default Document;
