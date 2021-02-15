/** @jsx jsx */
import { jsx, Container, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { InlineTextarea } from 'react-tinacms-inline';
import Link from 'next/link';
import CodeWrapper from '@components/CodeWrapper';

const CodeWindow = ({ code }) => {
  return (
    <Flex
      sx={{
        width: 300,
        position: 'relative',
        height: 300,
        pt: 3,
        bg: 'surface',
        zIndex: -1,
      }}
    >
      <Icon
        name="code2"
        size={300}
        color="textMuted"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />
      <CodeWrapper
        sx={{ bg: 'surface', fontSize: 1, p: 0, selectable: 'true', m: 'auto' }}
        value={code}
        language="js"
        showLineNumbers={true}
      />
    </Flex>
  );
};

const LibrariesSdks = () => {
  const daijsCode = `import Maker from '@makerdao/dai';

  const maker = 
    await Maker.create('http', {
    url: myRpcUrl,
    privateKey: myPrivateKey
  });

  const vault = 
    await maker
      .service('mcd:cdpManager')
      .openLockAndDraw(
        'ETH-A', ETH(50), DAI(1000)
      );`;
  return (
    <Container>
      <Heading variant="largeHeading" pb={3}>
        Libraries
      </Heading>

      <Flex
        sx={{
          maxWidth: '100%',
          flexWrap: 'wrap',
        }}
      >
        <Grid
          sx={{
            rowGap: 3,
            mr: 3,
            width: ['100%', '66%'],
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
          <Grid columns={2} sx={{ py: [3, 0] }}>
            <Flex sx={{ flexDirection: 'column', gridColumnStart: [1, 2], gridColumnEnd: 3 }}>
              <Text sx={{ fontWeight: 'bold' }}>pyMaker</Text>
              <Text sx={{ py: [3, 0] }}>
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
        <CodeWindow code={daijsCode} />
      </Flex>

      <Grid
        columns={[1, 3]}
        sx={{
          pt: 4,
        }}
      >
        <Heading
          variant="largeHeading"
          sx={{ py: 4, gridColumnStart: [1, 2], gridColumnEnd: [2, 4] }}
        >
          Other Relevant Tools
        </Heading>
        <Flex
          sx={{
            flexDirection: 'column',
            gridColumnStart: [1, 2],
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
            gridColumnStart: [1, 3],
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
          <Link href="/documentation/mcd-cli">
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
