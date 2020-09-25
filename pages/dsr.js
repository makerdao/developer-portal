/** @jsx jsx */
import { useState, useEffect } from 'react';
import { Container, jsx, Card, Heading, Text, Grid, Flex, Image, Box } from 'theme-ui';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { usePlugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { InlineForm, InlineText } from 'react-tinacms-inline';
import Link from 'next/link';
import useMaker from '../hooks/useMaker';
import SingleLayout from '@layouts/SingleLayout.js';
import { Icon } from '@makerdao/dai-ui-icons';
import ArticlesList from '@components/ArticlesList';
import GuideList from '../components/GuideList';
import EditLink from '../components/EditLink';
import CodeBox from '@components/CodeBox';
import { getGuides } from '@utils';
import useCreateDocument from '../hooks/useCreateDocument';

const codeSections = [
  {
    title: 'Dai.js',
    des: 'the JS lib',
    language: 'javascript',
    link: '/documentation/savingsservice',
    code: `
    async getTotalDai() {
      const totalPie = new BigNumber(await this._pot.Pie());
      const chi = await this.chi();
      return DAI(
        totalPie
          .times(chi)
          .div(WAD)
          .dp(18)
      );
    }
    `,
  },
  {
    title: 'Pot.sol',
    des: 'How join works in the contract',
    language: 'clike',
    link: '/documentation/pot-detailed-documentation',
    code: `
    // --- Savings Dai Management ---
    function join(uint wad) external note {
        require(now == rho, "Pot/rho-not-updated");
        pie[msg.sender] = add(pie[msg.sender], wad);
        Pie             = add(Pie,             wad);
        vat.move(msg.sender, address(this), mul(chi, wad));
    }
    `,
  },
  {
    title: 'pyMaker',
    language: 'python',
    link: '/',
    des: 'python pything ',
    code: 'snippet',
  },
];

const DsrInfo = ({ rate, totalDai }) => {
  return (
    <Grid columns={2}>
      <Card>
        <Flex sx={{ p: 3, flexDirection: 'column', alignItems: 'center' }}>
          <Heading sx={{ pb: 2 }}>{`${rate}%`}</Heading>
          <Heading>Dai Savings Rate</Heading>
        </Flex>
      </Card>
      <Card>
        <Flex sx={{ p: 3, flexDirection: 'column', alignItems: 'center' }}>
          <Heading sx={{ pb: 2 }}>{totalDai}</Heading>
          <Heading>Dai In DSR</Heading>
        </Flex>
      </Card>
    </Grid>
  );
};

const PageLead = ({ rate, totalDai }) => {
  return (
    <Container>
      <Flex sx={{ flexDirection: 'column', alignItems: 'center' }}>
        <Heading sx={{ mt: 6 }} variant="largeHeading">
          DSR
        </Heading>
        <Text sx={{ my: 4, mx: 7, px: 4 }}>
          The DSR is the Dai savings rate. It allows users to deposit dai and activate the Dai
          Savings Rate and earning savings on their dai.
        </Text>
        <DsrInfo rate={rate} totalDai={totalDai} />
      </Flex>
    </Container>
  );
};

const Intro = () => {
  return (
    <Container>
      <Grid columns={'1fr 2fr'} sx={{ mb: 4, p: 6 }}>
        <Heading variant="largeHeading">What is DSR?</Heading>
        <Grid>
          <Text className="subtext" variant="smallHeading">
            <InlineText name="subtext" />
          </Text>
          <Text sx={{ color: 'onBackgroundMuted' }}>
            Raising and lowering the DSR helps control the supply and demand of Dai, which in turn
            helps maintain the stability of the peg.
          </Text>
        </Grid>
      </Grid>
    </Container>
  );
};

const ListItem = ({ title, link, description }) => (
  <Card px={4}>
    <Link href={link}>
      <Grid columns={'1fr auto'}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Heading variant="microHeading">{title}</Heading>
          <Text variant="smallText">{description}</Text>
        </Flex>
        <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end' }}>
          <Icon name="increase" />
        </Flex>
      </Grid>
    </Link>
  </Card>
);

const Ecosystem = () => {
  return (
    <Container>
      <Flex
        sx={{
          flexDirection: 'column',
          mb: 6,
        }}
      >
        <Flex
          sx={{
            pb: 4,
            alignItems: 'center',
          }}
        >
          <Heading pr={3}>Ecosystem</Heading>
        </Flex>
        <Grid columns={2} sx={{ width: '100%' }}>
          {[
            {
              title: 'Chai.money',
              description:
                'Manage, optimise and deploy your assets to get the best returns across products',
              link: '/dsr',
            },
            {
              title: 'test',
              description:
                'Manage, optimise and deploy your assets to get the best returns across products',
              link: '/dsr',
            },
          ].map(({ title, link, description }) => {
            return <ListItem key={title} title={title} description={description} link={link} />;
          })}
        </Grid>
      </Flex>
    </Container>
  );
};

const Dsr = ({ file, preview, documentation }) => {
  const { maker } = useMaker();
  const [rate, setRate] = useState('0.00');
  const [totalDai, setTotalDai] = useState('0.00');

  useEffect(() => {
    if (!maker) return;
    const getDsr = async () => {
      const rate = await maker.service('mcd:savings').getYearlyRate();
      setRate(rate.toFormat(2));
    };
    const getTotalDai = async () => {
      const total = await maker.service('mcd:savings').getTotalDai();
      setTotalDai(total._amount.toFormat(2));
    };
    getDsr();
    getTotalDai();
  }, [maker]);

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
  usePlugin(form);
  useGithubToolbarPlugins();
  // TODO pass resources in
  useCreateDocument([], 'dsr');

  return (
    <SingleLayout>
      <InlineForm form={form}>
        <PageLead rate={rate} totalDai={totalDai} />
        <Intro />
        <Grid
          sx={{
            rowGap: 6,
          }}
        >
          <CodeBox cta="Dive in the code" sections={codeSections} />
          <ArticlesList title="Resources" path="documentation" resources={documentation} />
          <Ecosystem />
        </Grid>
      </InlineForm>
      <Container>
        <EditLink enterText="Create a New Page" />
      </Container>
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  //TODO fix path:
  const documentation = await getGuides(preview, previewData, 'content/resources');
  const dsrDocs = documentation.filter(
    (g) => g.data.frontmatter.parent === 'dsr' || g.data.frontmatter.tags.includes('dsr')
  );

  if (preview) {
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'data/dsrPage.json',
        parse: parseJson,
      })
    ).props;

    return {
      props: {
        ...file,
        documentation: dsrDocs,
      },
    };
  }

  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/dsrPage.json',
        data: (await import('../data/dsrPage.json')).default,
      },
      documentation: dsrDocs,
    },
  };
};

export default Dsr;
