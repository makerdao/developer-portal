import ArticlesList from '@components/ArticlesList';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';
import { ContentTypes } from '../../utils/constants';

const Page = ({ guides }) => {
  return (
    <SingleLayout>
      <ArticlesList title="Security" path={ContentTypes.SECURITY} resources={guides} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === ContentTypes.SECURITY);

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
