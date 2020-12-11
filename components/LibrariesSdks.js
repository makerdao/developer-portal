/** @jsx jsx */
import { jsx, Container, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { InlineForm, InlineTextarea } from 'react-tinacms-inline';
import Link from 'next/link';

const LibrariesSdks = () => {
  return (
    <Container>
      <Heading variant="megaHeading" pb={3}>
        Libraries to get started
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
            width: '66%',
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
          <Link href="/documentation/introduction-to-dai-js">
            <Flex sx={{ alignItems: 'center' }}>
              <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
              <Text sx={{ cursor: 'pointer' }}>View Dai.js docs</Text>
            </Flex>
          </Link>
          <Grid columns={2}>
            <Box></Box>
            <Flex sx={{ flexDirection: 'column' }}>
              <Text>pyMaker</Text>
              <Text>
                <InlineTextarea name="pyMakerSubtext" />
              </Text>
              <Link href="/documentation/pymaker">
                <Flex sx={{ alignItems: 'center' }}>
                  <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                  <Text sx={{ cursor: 'pointer' }}>View pyMaker docs</Text>
                </Flex>
              </Link>
            </Flex>
          </Grid>
        </Grid>

        <Flex
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
            color="textMuted"
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
          <Text>//Dai.js</Text>
        </Flex>
      </Flex>

      <Grid
        columns={3}
        sx={{
          pt: 4,
        }}
      >
        <Heading variant="largeHeading" sx={{ py: 4, gridColumnStart: 2, gridColumnEnd: 4 }}>
          Other Relevant Libraries
        </Heading>
        <Flex
          sx={{
            flexDirection: 'column',
            gridColumnStart: 2,
          }}
        >
          <Icon name="keeper" color="textMuted" sx={{ width: '164px', height: '164px', mb: 4 }} />
          <Heading>Keepers</Heading>
          <Text sx={{ py: 3 }}>
            <InlineTextarea name="keepersSubtext" />
          </Text>
          <Link href="/documentation/introduction-to-auction-keepers">
            <Flex sx={{ alignItems: 'center' }}>
              <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
              <Text sx={{ cursor: 'pointer' }}>Learn more about Maker Keepers</Text>
            </Flex>
          </Link>
        </Flex>
        <Flex
          sx={{
            flexDirection: 'column',
          }}
        >
          <Icon
            name="wireframeGlobe"
            color="textMuted"
            sx={{ width: '164px', height: '164px', mb: 4 }}
          />
          <Heading>CLIs</Heading>
          <Text sx={{ py: 3 }}>
            <InlineTextarea name="CLIsSubtext" />
          </Text>
          <Link href="/documentation/introduction-to-dai-js">
            <Flex sx={{ alignItems: 'center', mt: 'auto' }}>
              <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
              <Text sx={{ cursor: 'pointer' }}>Learn more about the CLIs</Text>
            </Flex>
          </Link>
        </Flex>
      </Grid>
    </Container>
  );
};

export default LibrariesSdks;
