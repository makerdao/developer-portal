/** @jsx jsx */
import dynamic from 'next/dynamic';
import { jsx } from 'theme-ui';
import useResourceStore from 'stores/store';
import { getFileNames } from 'lib/api';
import { trimMdx } from 'lib/utils';
import GuidesLayout from 'layouts/GuidesLayout';

const Guide = ({ slug, list, metadata, tableOfContents }) => {
  const setResources = useResourceStore(state => state.setResources);
  setResources(list);
  const { title } = metadata;
  const menu = [{ title, id: 1 }];
  const Mdx = dynamic(() => import(`content/resources/guides/${slug}.mdx`));

  return (
    <GuidesLayout
      slug={slug}
      menu={menu}
      toc={tableOfContents}
      resourceType={'guides'}
    >
      <Mdx />
    </GuidesLayout>
  );
};

export async function getStaticPaths() {
  const targetPath = 'content/resources/guides';
  const slugs = getFileNames(targetPath);
  const paths = slugs?.map(slug => ({ params: { slug: trimMdx(slug) } }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const targetPath = 'content/resources/guides';
  const slugs = getFileNames(targetPath);
  const list = slugs.map(slug => {
    const title =
      require(`content/resources/guides/${slug}`).metadata?.title ?? '';
    return {
      slug: trimMdx(slug),
      title,
    };
  });

  const slug = params?.slug;
  const mdx = require(`content/resources/guides/${slug}.mdx`);

  return {
    props: {
      slug,
      list,
      metadata: mdx.metadata ?? {},
      tableOfContents: JSON.parse(JSON.stringify(mdx.tableOfContents())),
    },
  };
}

export default Guide;
