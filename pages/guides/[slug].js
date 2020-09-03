/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx } from 'theme-ui';
import useResources from 'hooks/useResources';
import ReactMarkdown from 'react-markdown';
import GuidesLayout from 'layouts/GuidesLayout';
import { fetchAllContent } from 'lib/api';

const Guide = ({ slug, markdownBody, toc, metadata = {} }) => {
  const { title } = metadata;
  const menu = [{ title, id: 1 }];

  return (
    <GuidesLayout slug={slug} menu={menu} toc={toc} resourcePath={'guides'}>
      <ReactMarkdown source={markdownBody} />
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

  const content = fetchAllContent();
  const doc = content?.find(x => x.frontMatter.slug === slug);

  return {
    props: {
      slug,
      markdownBody: doc.content,
      toc: doc.toc,
    },
  };
}

export default Guide;
