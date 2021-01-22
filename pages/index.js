/** @jsx jsx */
import { useState } from 'react';
import Link from 'next/link';
import { Container, jsx, Box, Heading, Grid, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { usePlugin, useFormScreenPlugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm } from 'react-tinacms-inline';
import SingleLayout from '@layouts/SingleLayout.js';
import useCreateDocument from '@hooks/useCreateDocument';
import useBannerForm from '@hooks/useBannerForm';
import GuideList from '@components/GuideList';
import CommunityCta from '@components/CommunityCta';
import AboutThisSite from '@components/AboutThisSite';
import PageLead from '@components/PageLead';
import IntroText from '@components/IntroText';
import ModulesList from '@components/ModulesList';
import SecurityFeatures from '@components/SecurityFeatures';
import NewsletterCallout from '@components/NewsletterCallout';
import LibrariesSdks from '@components/LibrariesSdks';
import { getResources } from '@utils';
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

const Page = ({ file, guides, documentation, bannerFile, preview }) => {
  const [data, form] = useGithubJsonForm(file, landingPageFormOptions);
  const [bannerData, bannerForm] = useBannerForm(bannerFile, preview);

  useFormScreenPlugin(bannerForm);
  usePlugin(form);
  useGithubToolbarPlugins();
  useCreateDocument([...guides, ...documentation]);

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
    <SingleLayout bannerData={bannerData.banner}>
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
                <Heading variant="mediumHeading">Documentation</Heading>

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
    const file = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/landingPage.json',
      parse: parseJson,
    });

    const bannerFile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/banner.json',
      parse: parseJson,
    });

    return {
      props: {
        file: { ...file.props.file },
        bannerFile: {
          ...bannerFile.props.file,
        },
        guides,
        documentation,
        preview,
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
      bannerFile: {
        fileRelativePath: 'data/banner.json',
        data: (await import('../data/banner.json')).default,
      },
      guides,
      documentation,
    },
  };
};

export default Page;
