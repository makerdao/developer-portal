/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx } from 'theme-ui';
import useResources from 'hooks/useResources';
import ReactMarkdown from 'react-markdown';
import DocumentationLayout from 'layouts/DocumentationLayout';
import { fetchAllContent } from 'lib/api';

const Document = ({ slug, module, markdownBody, toc, metadata = {} }) => {
  const { title } = metadata;
  const menu = [{ title: '', id: 1 }];

  return (
    <DocumentationLayout
      slug={slug}
      menu={menu}
      toc={toc}
      resourcePath={`${module}/docs`}
    >
      <ReactMarkdown source={markdownBody} />
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

  const content = fetchAllContent();
  const doc = content?.find(x => x.frontMatter.slug === slug);
  return {
    props: {
      slug,
      module,
      markdownBody: doc.content,
      toc: doc.toc,
    },
  };
}

export default Document;
