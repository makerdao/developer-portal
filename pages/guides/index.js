import ArticlesList from '@components/ArticlesList';
import SingleLayout from '@layouts/SingleLayout';
import { getGuides } from '@utils';

const Page = ({ guides }) => {
  return (
    <SingleLayout>
      <ArticlesList title="Guides" path="guides" resources={guides} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getGuides(preview, previewData, 'content/resources');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === 'guides');

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      guides,
    },
  };
};

export default Page;
