/** @jsx jsx */
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container, jsx, Box, Heading, Grid, Flex, Link as ThemeLink } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
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
import DocumentationList from '@components/DocumentationList';
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
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const router = useRouter();

  const [data, form] = useGithubJsonForm(file, landingPageFormOptions);
  const [bannerData, bannerForm] = useBannerForm(bannerFile, preview);

  useFormScreenPlugin(bannerForm);
  usePlugin(form);
  useGithubToolbarPlugins();
  useCreateDocument([...guides, ...documentation]);

  const [selected, setSelected] = useState('everything');

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

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
    <SingleLayout bannerData={bannerData.banner} mobile={mobile} router={router}>
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

          <IntroText mobile={mobile} />

          <Grid>
            <Container>
              <Heading variant="megaHeading">
                Get Started&nbsp;<span sx={{ color: 'onBackgroundMuted' }}>With</span>
              </Heading>
            </Container>
            <Grid
              sx={{
                rowGap: 5,
              }}
            >
              <DocumentationList />
              <LibrariesSdks />
            </Grid>
          </Grid>
          <SecurityFeatures />
          <CommunityCta mobile={mobile} />
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
