import { useState } from 'react';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { Container, Grid, Text, Flex } from 'theme-ui';
import GuideGrid from '@components/GuideGrid';
import Dropdown from '@components/Dropdown';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';
import { ContentTypes } from '@utils/constants';

const Filter = ({ options, activeGroup, onChange, count }) => {
  return (
    <Container sx={{ pb: 6 }}>
      <Grid
        columns="1fr 2fr 1fr"
        sx={{
          border: 'light',
          borderColor: 'muted',
          borderWidth: '1px 0 0 0',
        }}
      >
        <Text variant="plainText" sx={{ fontSize: 3, py: 2 }}>
          Show me guides about:
        </Text>
        <Flex
          sx={{
            border: 'light',
            borderColor: 'muted',
            borderWidth: '0 0 0 1px',
            px: 4,
          }}
        >
          <Dropdown
            sx={{ width: 8 }}
            options={options}
            activeGroup={activeGroup}
            onChange={onChange}
          />
        </Flex>
        <Text
          variant="plainText"
          sx={{
            fontSize: 3,
            py: 2,
            px: 4,
            border: 'light',
            borderColor: 'muted',
            borderWidth: '0 0 0 1px',
          }}
        >
          {count} featured
        </Text>
      </Grid>
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
      <Filter
        activeGroup={active}
        onChange={setActive}
        options={componentNames}
        count={resources.length}
      />
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
