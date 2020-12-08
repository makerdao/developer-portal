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
import useCreateDocument from '../hooks/useCreateDocument';
import { getResources } from '@utils';
import { usePlugin } from 'tinacms';
import { Icon } from '@makerdao/dai-ui-icons';
import { ecosystem } from '../data/ecosystem.json';
import { landingPageFormOptions } from '../data/formOptions';

const Page = ({ file, guides, documentation }) => {
  const [data, form] = useGithubJsonForm(file, landingPageFormOptions);
  usePlugin(form);
  useGithubToolbarPlugins();
  useCreateDocument([...guides, ...documentation]);

  const [selected, setSelected] = useState('everything');
  const filteredResources = guides.filter((guide) =>
    selected === 'everything' ? Boolean : guide.data.frontmatter.components.includes(selected)
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
            guides={filteredResources}
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

          <Container>
            <Heading variant="mediumHeading" pb={3}>
              SDKs and Tools
            </Heading>

            <Flex
              sx={{
                maxWidth: '100%',
              }}
            >
              <Grid
                sx={{
                  rowGap: 3,
                  mr: 3,
                }}
              >
                <Heading variant="smallHeading">
                  <InlineTextarea name="sdksAndToolsHeading" />
                </Heading>
                <Text
                  sx={{
                    color: 'onBackgroundMuted',
                    columns: '2 200px',
                  }}
                >
                  <InlineTextarea name="sdksAndToolsText" />
                </Text>
                <Link href="/technology">
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                    <Text sx={{ cursor: 'pointer' }}>View dai.js</Text>
                  </Flex>
                </Link>
                <Grid columns={2}>
                  <Box></Box>
                  <Box>
                    <Text>pyMaker</Text>
                    <Text>
                      <InlineTextarea name="pyMakerSubtext" />
                    </Text>
                    <Link href="/technology">
                      <Flex sx={{ alignItems: 'center' }}>
                        <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                        <Text sx={{ cursor: 'pointer' }}>View pyMaker</Text>
                      </Flex>
                    </Link>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={{
                  width: 200,
                  position: 'relative',
                  height: 200,
                  pt: 4,
                  pl: 2,
                }}
              >
                <Icon
                  name="codeCanvas"
                  size={200}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                  }}
                />
                <Text>//Dai.js</Text>
              </Box>
            </Flex>

            <Grid
              columns={2}
              sx={{
                pt: 4,
              }}
            >
              <Grid
                sx={{
                  rowGap: 2,
                }}
              >
                <Heading>Keepers</Heading>
                <Text>
                  <InlineTextarea name="keepersSubtext" />
                </Text>
                <Link href="/technology">
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                    <Text sx={{ cursor: 'pointer' }}>Learn more about Maker Keepers</Text>
                  </Flex>
                </Link>
              </Grid>
              <Grid
                sx={{
                  rowGap: 2,
                }}
              >
                <Heading>CLIs</Heading>
                <Text>
                  <InlineTextarea name="CLIsSubtext" />
                </Text>
                <Link href="/technology">
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                    <Text sx={{ cursor: 'pointer' }}>Learn more about the CLIs</Text>
                  </Flex>
                </Link>
              </Grid>
            </Grid>
          </Container>

          {/* <CodeBox cta="Dive in the code" sections={codeSections} /> */}
          {/* <ArticlesList title="Articles" path="guides" resources={guides} /> */}
          <Ecosystem title={'Developer Ecosystem'} items={ecosystem} />

          <CommunityCta />
          <AboutThisSite />
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
