/** @jsx jsx */
import dynamic from 'next/dynamic';
import { jsx } from 'theme-ui';
import { fetchAllContent } from 'lib/api';
import GuidesLayout from 'layouts/GuidesLayout';

const Guide = ({ slug, metadata, tableOfContents }) => {
  const { title } = metadata;
  const menu = [{ title, id: 1 }];
  const Mdx = dynamic(() => import(`content/resources/guides/${slug}.mdx`));

  return (
    <GuidesLayout
      slug={slug}
      menu={menu}
      toc={tableOfContents}
      resourcePath={'guides'}
    >
      <Mdx />
    </GuidesLayout>
  );
};

export async function getStaticPaths() {
  const content = fetchAllContent();
  const paths = content
    ?.filter(x => x.frontMatter.contentType === 'guide')
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
  const mdx = require(`content/resources/guides/${slug}.mdx`);

  return {
    props: {
      slug,
      metadata: mdx.metadata ?? {},
      tableOfContents: JSON.parse(JSON.stringify(mdx.tableOfContents())),
    },
  };
}

export default Guide;
