import { useState } from 'react';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubJsonForm } from 'react-tinacms-github';
import { InlineForm, InlineText } from 'react-tinacms-inline';
import Router from 'next/router';
import SingleLayout from '../layouts/SingleLayout.js';
import GuideList from '../components/GuideList';
import ArticlesList from '../components/ArticlesList';
import Link from 'next/link';
import CommunityCta from '../components/CommunityCta';
import CodeBox from '../components/CodeBox';
import SignupCta from '../components/SignupCta';
import EditLink from '../components/EditLink';
import {
  Container,
  jsx,
  Card,
  Heading,
  Text,
  Grid,
  Box,
  Flex,
  Link as ThemeLink,
  Button,
} from 'theme-ui';
import { createToc, getGuides } from '@utils';
import { usePlugin, useCMS } from 'tinacms';
import getGlobalStaticProps from '../utils/getGlobalStaticProps';
import { useGlobalStyleForm } from '@hooks';
import { default as featGuides } from '../data/featuredGuides.json';
import { Icon } from '@makerdao/dai-ui-icons';
// import Link from 'next/link';

const PageLead = ({ content }) => {
  return (
    <Container>
      <Flex sx={{ py: 6, flexDirection: 'column' }}>
        <Heading variant="megaHeading" sx={{ fontSize: 9 }}>
          Maker Protocol
        </Heading>
        <Heading variant="megaHeading" sx={{ fontSize: 9 }}>
          For Developers
        </Heading>
        <Flex sx={{ flexDirection: 'column', pl: 7, mt: 3 }}>
          <Text
            className="subtext"
            sx={{
              color: 'onBackgroundMuted',
              mb: 2,
            }}
            // dangerouslySetInnerHTML={{
            //   __html: content.subtext,
            // }}
          >
            <InlineText name="subtext" />
          </Text>
          <Link href="/technology">
            <Text>→ Learn more about the technology.</Text>
          </Link>
          {/* <Text>{ 'The foundation of decentralized finance, "Defi".'}</Text> */}
        </Flex>
      </Flex>
    </Container>
  );
};

const codeSections = [
  {
    title: 'Dai.js',
    des: 'the JS lib',
    code: 'hello world!',
  },
  {
    title: 'Data API',
    des: 'much GraphQL',
    code: 'data yo',
  },

  {
    title: 'pyMaker',
    des: 'python pything ',
    code: 'snippet',
  },
];

const ModulesList = () => {
  const modules = [
    {
      title: 'Governance',
      description: 'all about gov',
      cta: '',
    },

    {
      title: 'Auctions',
      description: 'liquidations 101',
      cta: '',
    },
    {
      title: 'DSR',
      description: 'earn passively',
      cta: '',
    },
    {
      title: 'Oracles',
      description: 'all seeing',
      cta: '',
    },
    {
      title: 'Vaults',
      description: 'debt generation',
      cta: '',
    },
  ];
  return (
    <Container>
      <Grid
        columns={'1fr 1fr 1fr 1fr'}
        sx={{
          columnGap: 3,
          rowGap: 3,
        }}
      >
        {modules.map(({ title, description }) => {
          return (
            <Card key={title}>
              <Grid>
                <Heading>{title}</Heading>
                <Link href={`${title.toLowerCase()}`} passHref>
                  <Flex sx={{ alignItems: 'center' }}>
                    <Icon sx={{ mr: 2 }} name={'arrow_right'}></Icon>
                    <ThemeLink sx={{ color: 'text' }}>Learn More</ThemeLink>
                  </Flex>
                </Link>
              </Grid>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
};

const IntroText = () => {
  return (
    <Container>
      <Heading
        sx={{
          pb: 4,
        }}
      >
        Maker Protocol is the technology behind MakerDAO, MakerDAO is a decentralized organization
        dedicated to bringing stability to the cryptocurrency economy. The Maker Protocol employs a
        two-token system. The first being, Dai, a collateral-backed stablecoin that offers
        stability.
      </Heading>
      <Text
        sx={{
          pb: 4,
          color: 'onBackgroundMuted',
          columns: '2 200px',
        }}
      >
        The Maker Foundation and the MakerDAO community believe that a decentralized stablecoin is
        required to have any business or individual realize the advantages of digital money. Second,
        there is MKR, a governance token that is used by stakeholders to maintain the system and
        manage Dai. MKR token holders are the decision-makers of the Maker Protocol, supported by
        the larger public community and various other external parties. Maker is unlocking the power
        of decentralized finance for everyone by creating an inclusive platform for economic
        empowerment; enabling everyone with equal access to the global financial marketplace.
      </Text>

      <Link href="/technology">
        <Text>→ Learn more about the technology.</Text>
      </Link>
    </Container>
  );
};
const Page = ({ file, preview, styleFile, guides }) => {
  // console.log(guides, 'init');
  const initialGuides = guides;

  const formOptions = {
    label: 'home page',
    fields: [
      {
        name: 'subtext',
        component: 'text',
      },
    ],
  };
  const [data, form] = useGithubJsonForm(file, formOptions);
  console.log('form', form);
  usePlugin(form);
  const [styleData, styleForm] = useGlobalStyleForm(styleFile, preview);

  console.log('data', data);
  return (
    <SingleLayout>
      <InlineForm form={form}>
        <PageLead content={data} />
        {/* <GuideList guides={[]} />
         */}

        <Grid
          sx={{
            rowGap: 6,
          }}
        >
          <ModulesList />
          <IntroText />
          <CodeBox cta="Dive in the code" sections={codeSections} />
          <ArticlesList title="Recent Guides" path="guides" resources={initialGuides} />
          <CommunityCta />
          {/* <SignupCta /> */}
        </Grid>
      </InlineForm>
      <EditLink />
    </SingleLayout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  const global = await getGlobalStaticProps(preview, previewData);

  const resources = await getGuides(preview, previewData, 'content/resources');
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
        ...global,
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
      ...global,
    },
  };
};

export default Page;
