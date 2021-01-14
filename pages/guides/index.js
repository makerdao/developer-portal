import { useState } from 'react';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { Container, Heading, Flex } from 'theme-ui';
import GuideGrid from '@components/GuideGrid';
import Dropdown from '@components/Dropdown';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';
import { ContentTypes } from '@utils/constants';

const PageLead = ({ options, activeGroup, onChange }) => {
  return (
    <Container>
      <Flex sx={{ py: [4, 6], flexDirection: 'column' }}>
        <Heading variant="megaHeading">Show me guides</Heading>
        <Flex sx={{ alignItems: 'center' }}>
          <Heading sx={{ pr: 4, pb: 2 }} variant="megaHeading">
            about
          </Heading>
          <Dropdown
            sx={{ variant: 'text.megaHeading' }}
            options={options}
            activeGroup={activeGroup}
            onChange={onChange}
          />
        </Flex>
      </Flex>
    </Container>
  );
};

const Page = ({ guides }) => {
  const [active, setActive] = useState('everything');
  const resources = guides.filter((guide) =>
    active === 'everything' ? Boolean : guide.data.frontmatter.components.includes(active)
  );
  const componentNames = guides.reduce(
    (acc, guide) => {
      acc.push(...guide.data.frontmatter.components);
      return [...new Set(acc)];
    },
    ['everything']
  );

  return (
    <SingleLayout>
      <PageLead activeGroup={active} onChange={setActive} options={componentNames} />
      <GuideGrid title="Guides" path="guides" resources={resources} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources/guides');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === ContentTypes.GUIDES);

  if (preview) {
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'data/guidesPage.json',
        parse: parseJson,
      })
    ).props;

    return {
      props: {
        ...file,
        guides,
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/guidesPage.json',
        data: (await import('../../data/guidesPage.json')).default,
      },
      guides,
    },
  };
};

export default Page;
