import { useState } from 'react';
import ArticlesList from '@components/ArticlesList';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm, InlineText, InlineTextarea } from 'react-tinacms-inline';
import {
  Container,
  jsx,
  Card,
  Box,
  Button,
  Heading,
  Text,
  Grid,
  Flex,
  Label,
  Select,
  Link as ThemeLink,
} from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const PageLead = ({ primary, secondary, options, activeModule, onChange }) => {
  return (
    <Container>
      <Flex sx={{ py: [4, 6], flexDirection: 'column' }}>
        <Heading variant="megaHeading">{primary}</Heading>
        <Flex sx={{ alignItems: 'center' }}>
          <Heading variant="megaHeading">{secondary}</Heading>
          <Select
            sx={{
              width: 8,
              variant: 'text.megaHeading',
              color: 'primary',
              borderColor: (theme) => `transparent transparent ${theme.colors.text} transparent`,
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
  const options = ['oracles', 'dsr', 'dai', 'keepers', 'auctions', 'vaults'];

  const resources = guides.filter((guide) => guide.data.frontmatter.components.includes(active));
  return (
    <SingleLayout>
      <PageLead
        primary="Show me guides"
        secondary="about"
        activeModule={active}
        onChange={setActive}
        options={options}
      />
      <ArticlesList title="Guides" path="guides" resources={resources} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === 'guides');

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
        // documentation,
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
      // documentation,
    },
  };
};

export default Page;
