/** @jsx jsx */
import dynamic from 'next/dynamic';
import { jsx } from 'theme-ui';
import { fetchAllContent } from 'lib/api';
import DocumentationLayout from 'layouts/DocumentationLayout';

const Document = ({ slug, module, metadata, tableOfContents }) => {
  const { title } = metadata;
  const menu = [{ title, id: 1 }];
  const Mdx = dynamic(() =>
    import(`content/resources/documentation/${slug}.mdx`)
  );

  return (
    <DocumentationLayout
      slug={slug}
      menu={menu}
      toc={tableOfContents}
      resourcePath={`${module}/docs`}
    >
      <Mdx />
    </DocumentationLayout>
  );
};

export async function getStaticPaths() {
  const content = fetchAllContent();
  const paths = content
    ?.filter(x => x.frontMatter.contentType === 'documentation')
    .map(({ frontMatter: { slug, parent } }) => ({
      params: { slug, module: parent },
    }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const slug = params?.slug;
  const module = params?.module;
  const mdx = require(`content/resources/documentation/${slug}.mdx`);
  return {
    props: {
      slug,
      module,
      metadata: mdx.metadata ?? {},
      tableOfContents: JSON.parse(JSON.stringify(mdx.tableOfContents())),
    },
  };
}

export default Document;
