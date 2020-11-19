/** @jsx jsx */
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm, InlineText, InlineTextarea } from 'react-tinacms-inline';
import SingleLayout from '../layouts/SingleLayout.js';
import GuideList from '../components/GuideList';
import ArticlesList from '../components/ArticlesList';
import Ecosystem from '../components/Ecosystem';
import Link from 'next/link';
import CommunityCta from '../components/CommunityCta';
import CodeBox from '../components/CodeBox';
import EditLink from '../components/EditLink';
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
  Link as ThemeLink,
} from 'theme-ui';
import { getResources } from '@utils';
import { usePlugin } from 'tinacms';
import { Icon } from '@makerdao/dai-ui-icons';
import { ecosystem } from '../data/ecosystem.json';
import AboutThisSite from '../components/AboutThisSite';
import PageLead from '../components/PageLead';
import IntroText from '../components/IntroText';
import ModulesList from '../components/ModulesList';
import useCreateDocument from '../hooks/useCreateDocument';

const Page = ({ file, guides, documentation }) => {
  const formOptions = {
    label: 'home page',
    fields: [
      {
        name: 'subtext',
        component: 'text',
      },
      {
        name: 'aboutSubheading',
        component: 'textarea',
      },
    ],
  };
  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  useGithubToolbarPlugins();
  useCreateDocument([...guides, ...documentation]);

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
          <GuideList title="Guides" path="guides" guides={guides} />

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
                  Dai.js is a JavaScript library that makes it easy to build applications on top of
                  MakerDAO's platform of smart contracts.
                </Heading>
                <Text
                  sx={{
                    color: 'onBackgroundMuted',
                    columns: '2 200px',
                  }}
                >
                  You can use Maker's contracts to open Vaults (formerly known as CDPs), deposit
                  collateral and generate Dai, trade tokens on decentralized exchanges, and more.
                  The library features a pluggable, service-based architecture, which allows users
                  to easily integrate Maker functionality into their own apps.
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
                      Based on the Pymaker API, a set of reference Maker keepers is being developed.{' '}
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
                  Keepers are external actors that are incentivized by profit opportunities to
                  contribute to decentralized systems. In the context of the Maker Protocol, these
                  external agents are incentivized to automate certain operations around the
                  Ethereum blockchain.
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
                  The command-line interface mcd-cli will enable you to easily interact with the
                  Multi-Collateral Dai contracts.
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
