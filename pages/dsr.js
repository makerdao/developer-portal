/** @jsx jsx */
import { useState, useEffect } from 'react';
import { Container, jsx, Card, Heading, Text, Grid, Flex, Image, Box } from 'theme-ui';
import Link from 'next/link';
import useMaker from '../hooks/useMaker';
import SingleLayout from '@layouts/SingleLayout.js';
import { Icon } from '@makerdao/dai-ui-icons';
import ArticlesList from '@components/ArticlesList';
import GuideList from '../components/GuideList';
import getGlobalStaticProps from '../utils/getGlobalStaticProps';
import { getGuides } from '@utils';

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
          <Text variant="smallHeading">
            The DSR rate initially can be set through the Chief. Governance will be able to change
            the DSR based on the rules that the DS-Chief employs.
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

const Dsr = ({ documentation }) => {
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

  return (
    <SingleLayout>
      <PageLead rate={rate} totalDai={totalDai} />
      <Intro />
      <GuideList title="Resources" guides={documentation} columns={3} />

      <Ecosystem />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const documentation = await getGuides(preview, previewData, 'content/resources');
  const dsrDocs = documentation.filter(
    (g) => g.data.frontmatter.parent === 'dsr' || g.data.frontmatter.tags.includes('dsr')
  );
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      documentation: dsrDocs,
    },
  };
};

export default Dsr;
