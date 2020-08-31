/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx } from 'theme-ui';
import useResources from 'hooks/useResources';
import ReactMarkdown from 'react-markdown';
import GuidesLayout from 'layouts/GuidesLayout';

const Guide = ({ metadata = {}, tableOfContents = {} }) => {
  const { query } = useRouter();
  const resources = useResources();
  const guide = resources.find(
    r =>
      r.frontMatter.contentType === 'guide' && r.frontMatter.slug === query.slug
  );

  const { title } = metadata;
  const menu = [{ title, id: 1 }];

  return (
    <GuidesLayout
      slug={guide.frontMatter.slug}
      menu={menu}
      toc={[]}
      resourcePath={'guides'}
    >
      <ReactMarkdown source={guide.content} />
    </GuidesLayout>
  );
};

// export async function getStaticPaths() {
//   const content = fetchAllContent();
//   const paths = content
//     ?.filter(x => x.frontMatter.contentType === 'guide')
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
//   const mdx = require(`content/resources/guides/${slug}.mdx`);

//   return {
//     props: {
//       slug,
//       metadata: mdx.metadata ?? {},
//       tableOfContents: [], //JSON.parse(JSON.stringify(mdx.tableOfContents())),
//     },
//   };
// }

export default Guide;
