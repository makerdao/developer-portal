/** @jsx jsx */
import { Container, jsx, Card, Heading, Text, Grid, Flex, Image } from 'theme-ui';
import Link from 'next/link';
import SingleLayout from '@layouts/SingleLayout.js';
import { Icon } from '@makerdao/dai-ui-icons';

const PageLead = () => {
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
        }}
      >
        <Flex
          sx={{
            pb: 4,
            alignItems: 'center',
          }}
        >
          <Heading pr={3}>Ecosystem</Heading>
          <Text>→ View All</Text>
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

const Governance = () => {
  return (
    <SingleLayout>
      <PageLead />
      <Intro />
      <Ecosystem />
    </SingleLayout>
  );
};

export default Governance;
