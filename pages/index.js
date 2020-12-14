/** @jsx jsx */
import { useState } from 'react';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm, InlineTextarea } from 'react-tinacms-inline';
import SingleLayout from '../layouts/SingleLayout.js';
import { Container, jsx, Box, Heading, Text, Grid, Flex, Link as ThemeLink } from 'theme-ui';
import GuideList from '@components/GuideList';
import Ecosystem from '@components/Ecosystem';
import Link from 'next/link';
import CommunityCta from '@components/CommunityCta';
import AboutThisSite from '@components/AboutThisSite';
import PageLead from '@components/PageLead';
import IntroText from '@components/IntroText';
import ModulesList from '@components/ModulesList';
import SecurityFeatures from '@components/SecurityFeatures';
import NewsletterCallout from '@components/NewsletterCallout';
import Banner from '@components/Banner';
import LibrariesSdks from '@components/LibrariesSdks';
import useCreateDocument from '../hooks/useCreateDocument';
import { getResources } from '@utils';
import { usePlugin } from 'tinacms';
import { Icon } from '@makerdao/dai-ui-icons';
import { ecosystem } from '../data/ecosystem.json';
import { landingPageFormOptions } from '../data/formOptions';

// This function loops over a subset of resources and tries to match its tags with the tags from a larger set of resources
const withTagsAlgo = (fullSet, subSet) => {
  const withtags = [];
  subSet.forEach((fGuide) => {
    withtags.push(
      ...fullSet.filter((guide) =>
        guide.data.frontmatter.tags.some((t) => fGuide.data.frontmatter.tags.includes(t))
      )
    );
  });
  const uniqueWithTags = [...new Set(withtags)];
  const uniqueAll = [...new Set([...subSet, ...uniqueWithTags])];
  return uniqueAll;
};

const Page = ({ file, guides, documentation }) => {
  const [data, form] = useGithubJsonForm(file, landingPageFormOptions);
  usePlugin(form);
  useGithubToolbarPlugins();
  useCreateDocument([...guides, ...documentation]);

  const [bannerOpen, setBannerOpen] = useState(true);
  const [selected, setSelected] = useState('everything');

  let filteredGuides = guides.filter((guide) =>
    selected === 'everything' ? Boolean : guide.data.frontmatter.components.includes(selected)
  );

  // If the components filter doesn't return enough results, try to match deeper with tags
  if (filteredGuides.length < 5) {
    filteredGuides = withTagsAlgo(guides, filteredGuides);
  }

  const componentNames = guides.reduce(
    (acc, guide) => {
      acc.push(...guide.data.frontmatter.components);
      return [...new Set(acc)];
    },
    ['everything']
  );

  return (
    <SingleLayout>
      {bannerOpen && (
        <Banner
          close={() => {
            setBannerOpen(!bannerOpen);
          }}
          content={
            <>
              <Text sx={{ variant: 'text.plainText', m: 'auto', color: 'textMuted', fontSize: 1 }}>
                Multi-collateral Dai <span sx={{ color: 'text', px: 1 }}>Release 1.2.0</span> Wed
                11.25.2020
              </Text>
              <ThemeLink href={'https://changelog.makerdao.com/'} target="_blank">
                <Flex sx={{ alignItems: 'center' }}>
                  <Icon color="text" name="arrow_right"></Icon>
                  <Text sx={{ color: 'text', pl: 2, fontWeight: 'body' }}>
                    View all public releases
                  </Text>
                </Flex>
              </ThemeLink>
            </>
          }
        />
      )}
      <InlineForm form={form}>
        <Grid
          sx={{
            rowGap: 6,
          }}
        >
          <PageLead
            primary="Maker Protocol"
            secondary="For Developers"
            cta="Learn more about the technology."
          />
          <GuideList
            title="Show guides about"
            path="guides"
            guides={filteredGuides}
            options={componentNames}
            selected={selected}
            setSelected={setSelected}
          />

          <IntroText />

          <Box>
            <Container>
              <Heading
                variant="largeHeading"
                sx={{
                  pb: 3,
                }}
              >
                Get Started With
              </Heading>

              <Flex sx={{ mb: 3, alignItems: 'center' }}>
                <Heading variant="mediumHeading">Smart Contracts</Heading>

                <Link href={'/guides'} passHref>
                  <Flex sx={{ ml: 3, alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                    <ThemeLink sx={{ color: 'text', cursor: 'pointer' }}>View All</ThemeLink>
                  </Flex>
                </Link>
              </Flex>
            </Container>
            <ModulesList />
          </Box>
          <LibrariesSdks />
          <SecurityFeatures />
          {/* <CodeBox cta="Dive in the code" sections={codeSections} /> */}
          {/* <ArticlesList title="Articles" path="guides" resources={guides} /> */}
          {/* <Ecosystem title={'Developer Ecosystem'} items={ecosystem} /> */}

          <CommunityCta />
          <AboutThisSite />
          <NewsletterCallout />
        </Grid>
      </InlineForm>
    </SingleLayout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources');
  const documentation = resources.filter((g) => g.data.frontmatter.contentType === 'documentation');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === 'guides');

  if (preview) {
    // get data from github
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'data/landingPage.json',
        parse: parseJson,
      })
    ).props;

    return {
      props: {
        ...file,
        guides,
        documentation,
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/landingPage.json',
        data: (await import('../data/landingPage.json')).default,
      },
      guides,
      documentation,
    },
  };
};

export default Page;
