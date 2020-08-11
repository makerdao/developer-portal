/** @jsx jsx */
import dynamic from 'next/dynamic';
import { jsx } from 'theme-ui';
import { getFileNames } from 'lib/api';
import SingleSidebarLayout from 'layouts/SingleSidebarLayout';

const Document = ({ slug, metadata, tableOfContents }) => {
  const { title } = metadata;
  console.log(metadata);
  const menu = [{ title, id: 1 }];
  const Mdx = dynamic(() =>
    import(`content/resources/documentation/${slug}/index.mdx`)
  );

  return (
    <SingleSidebarLayout slug={slug} menu={menu} toc={tableOfContents}>
      <Mdx />
    </SingleSidebarLayout>
  );
};

export async function getStaticPaths() {
  const targetPath = 'content/resources/documentation';
  const slugs = getFileNames(targetPath);
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
      tableOfContents: JSON.parse(JSON.stringify(mdx.tableOfContents())),
    },
  };
}

export default Document;
