/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx } from 'theme-ui';
import useResources from 'hooks/useResources';
import ReactMarkdown from 'react-markdown';
import DocumentationLayout from 'layouts/DocumentationLayout';

const Document = ({ metadata = {} }) => {
  const { query } = useRouter();
  const resources = useResources();
  const doc = resources.find(
    r =>
      r.frontMatter.contentType === 'documentation' &&
      r.frontMatter.slug === query.slug
  );

  const { title } = metadata;
  const menu = [{ title: '', id: 1 }];

  return (
    <DocumentationLayout
      slug={doc.frontMatter.parent}
      menu={menu}
      toc={doc.toc}
      resourcePath={`${doc.frontMatter.parent}/docs`}
    >
      <ReactMarkdown source={doc.content} />
    </DocumentationLayout>
  );
};

// export async function getStaticPaths() {
//   const content = fetchAllContent();
//   const paths = content
//     ?.filter(x => x.frontMatter.contentType === 'documentation')
//     .map(({ frontMatter: { slug, parent } }) => ({
//       params: { slug, module: parent },
//     }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps({ params }) {
//   const slug = params?.slug;
//   const module = params?.module;
//   const mdx = require(`content/resources/documentation/${slug}.mdx`);
//   return {
//     props: {
//       slug,
//       module,
//       metadata: mdx.metadata ?? {},
//       tableOfContents: [], //JSON.parse(JSON.stringify(mdx.tableOfContents())),
//     },
//   };
// }

export default Document;
