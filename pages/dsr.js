/** @jsx jsx */
import { Container, jsx, Card, Heading, Text, Grid, Flex } from 'theme-ui';
import { useGithubToolbarPlugins, useGithubJsonForm } from 'react-tinacms-github';
import { usePlugin, useFormScreenPlugin } from 'tinacms';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { InlineForm, InlineText } from 'react-tinacms-inline';
import shallow from 'zustand/shallow';
import useCreateDocument from '../hooks/useCreateDocument';
import useEcosystemForm from '../hooks/useEcosystemForm';
import { ecosystem } from '../data/ecosystem.json';
import SingleLayout from '@layouts/SingleLayout.js';
import ArticlesList from '@components/ArticlesList';
import Ecosystem from '../components/Ecosystem';
import EditLink from '../components/EditLink';
import CodeBox from '@components/CodeBox';
import { getResources } from '@utils';
// import { EcosystemCategories } from '../utils/constants';
import useStore from '../stores/store';

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

const Dsr = ({ file, resources, dsrDocs, ecosystemFile, preview }) => {
  const [dsrRate, totalSavingsDai] = useStore(
    (state) => [state.dsrRate, state.totalSavingsDai],
    shallow
  );

  const formOptions = {
    label: 'home page',
    fields: [
      {
        name: 'subtext',
        component: 'text',
      },
    ],
  };

  const [ecoData, ecoForm] = useEcosystemForm(ecosystemFile, preview);
  useFormScreenPlugin(ecoForm);

  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);
  useGithubToolbarPlugins();
  useCreateDocument(resources, 'dsr');

  return (
    <SingleLayout>
      <InlineForm form={form}>
        <PageLead rate={dsrRate} totalDai={totalSavingsDai} />
        <Intro />
        <Grid
          sx={{
            rowGap: 6,
          }}
        >
          <CodeBox cta="Dive in the code" sections={codeSections} />
          <ArticlesList title="Resources" path="documentation" resources={dsrDocs} />
          <Ecosystem
            title={'Developer Ecosystem'}
            items={ecosystem.filter(({ component }) => component === 'dsr')}
          />
        </Grid>
      </InlineForm>
      <Container>
        <EditLink enterText="Create a New Page" />
      </Container>
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  // const resources = await getResources(preview, previewData, 'content/resources');
  const resources = [];
  const dsrDocs = resources.filter(
    (g) => g.data.frontmatter.component === 'dsr' || g.data.frontmatter.tags.includes('dsr')
  );

  if (preview) {
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'data/dsrPage.json',
        parse: parseJson,
      })
    ).props;

    const ecosystemFile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/ecosystem.json',
      parse: parseJson,
    });

    return {
      props: {
        ...file,
        ecosystemFile: {
          ...ecosystemFile.props.file,
        },
        dsrDocs,
        resources,
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
      ecosystemFile: {
        fileRelativePath: 'data/ecosystem.json',
        data: (await import('../data/ecosystem.json')).default,
      },
      dsrDocs,
      resources,
    },
  };
};

export default Dsr;
