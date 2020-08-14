/** @jsx jsx */
import dynamic from 'next/dynamic';
import { jsx } from 'theme-ui';
import { getFileNames } from 'lib/api';
import { trimMdx } from 'lib/utils';
import DocumentationLayout from 'layouts/DocumentationLayout';

const Document = ({ slug, metadata, tableOfContents }) => {
  const { title } = metadata;
  console.log(metadata);
  const menu = [{ title, id: 1 }];
  const Mdx = dynamic(() =>
    import(`content/resources/documentation/${slug}.mdx`)
  );

  return (
    <DocumentationLayout slug={slug} menu={menu} toc={tableOfContents}>
      <Mdx />
    </DocumentationLayout>
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
  const targetPath = 'content/resources/documentation';
  const slugs = getFileNames(targetPath);
  const list = slugs.map(slug => {
    const title =
      require(`content/resources/documentation/${slug}`).metadata?.title ?? '';
    return {
      slug: trimMdx(slug),
      title,
    };
  });

  const slug = params?.slug;
  const mdx = require(`content/resources/documentation/${slug}.mdx`);
  return {
    props: {
      slug,
      list,
      metadata: mdx.metadata ?? {},
      tableOfContents: JSON.parse(JSON.stringify(mdx.tableOfContents())),
    },
  };
}

export default Document;
