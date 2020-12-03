import { useState } from 'react';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm, InlineText, InlineTextarea } from 'react-tinacms-inline';
import { Container, Heading, Flex, Select } from 'theme-ui';
import ArticlesList from '@components/ArticlesList';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';
import { ContentTypes } from '@utils/constants';

const PageLead = ({ options, activeModule, onChange }) => {
  return (
    <Container>
      <Flex sx={{ py: [4, 6], flexDirection: 'column' }}>
        <Heading variant="megaHeading">Show me guides</Heading>
        <Flex sx={{ alignItems: 'center' }}>
          <Heading sx={{ pr: 4 }} variant="megaHeading">
            about
          </Heading>
          <Select
            sx={{
              width: 'auto',
              variant: 'text.megaHeading',
              color: 'primary',
              borderColor: (theme) => `transparent transparent ${theme.colors.text} transparent`,
              '&:focus': {
                color: 'primary',
                borderColor: (theme) => `transparent transparent ${theme.colors.text} transparent`,
              },
            }}
            defaultValue={activeModule}
            onChange={(e) => onChange(e.target.value)}
          >
            {options.map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </Select>
        </Flex>
      </Flex>
    </Container>
  );
};

const Page = ({ guides }) => {
  const [active, setActive] = useState('vaults');
  const resources = guides.filter((guide) => guide.data.frontmatter.components.includes(active));
  const componentNames = guides.reduce((acc, guide) => {
    acc.push(...guide.data.frontmatter.components);
    return [...new Set(acc)];
  }, []);

  return (
    <SingleLayout>
      <PageLead activeModule={active} onChange={setActive} options={componentNames} />
      <ArticlesList title="Guides" path="guides" resources={resources} />
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
