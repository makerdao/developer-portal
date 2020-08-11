/** @jsx jsx */
import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';
import { jsx } from 'theme-ui';
// import { getFileNames } from 'lib/api';
import DoubleSidebarLayout from 'layouts/DoubleSidebarLayout';

const Document = ({ slug, metadata, tableOfContents }) => {
  const { title } = metadata;
  console.log(metadata);
  const menu = [{ title, id: 1 }];
  const Mdx = dynamic(() => import(`content/resources/guides/${slug}.mdx`));

  return (
    <DoubleSidebarLayout
      slug={slug}
      menu={menu}
      toc={tableOfContents}
      resourceType={'guides'}
    >
      <Mdx />
    </DoubleSidebarLayout>
  );
};

const trimMdx = string => {
  if (string.indexOf('.md') === -1) {
    return string.substring(0, string.length - 3);
  }
  return string.substring(0, string.length - 4);
};

export async function getStaticPaths() {
  const targetPath = 'content/resources/guides';
  const slugs = fs.readdirSync(join(process.cwd(), targetPath));
  const paths = slugs?.map(slug => ({ params: { slug: trimMdx(slug) } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug;
  const mdx = require(`content/resources/guides/${slug}.mdx`);
  return {
    props: {
      slug,
      metadata: mdx.metadata ?? {},
      tableOfContents: JSON.parse(JSON.stringify(mdx.tableOfContents())),
    },
  };
}

export default Document;
