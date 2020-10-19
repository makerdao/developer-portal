import ArticlesList from '@components/ArticlesList';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';

const Page = ({ documentation }) => {
  return (
    <SingleLayout>
      <ArticlesList title="Documentation" path="documentation" resources={documentation} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources');
  const documentation = resources.filter((g) => g.data.frontmatter.contentType === 'documentation');

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      documentation,
    },
  };
};

export default Page;
