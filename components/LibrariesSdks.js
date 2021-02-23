/** @jsx jsx */
import { jsx, Container, Heading, Text, Grid, Flex } from 'theme-ui';
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
        sx={{
          bg: 'transparent',
          fontSize: 1,
          pt: 4,
          selectable: 'true',
          m: 'auto',
          '::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
        }}
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
      <Grid columns={[1, '1fr auto']} sx={{ gridColumnGap: 4, gridRowGap: [4, 'auto'] }}>
        <CodeWindow code={daijsCode} />
        <Grid columns={[1, 'auto', 2]} sx={{ gridRowGap: 3, gridTemplateRows: '2em' }}>
          <Heading variant="smallHeading">Dai.js</Heading>
          <Flex
            sx={{
              flexDirection: 'column',
              gridRowStart: 2,
              justifyContent: 'space-between',
              pb: [4, 0],
            }}
          >
            <Flex sx={{ flexDirection: 'column', color: 'onBackgroundMuted' }}>
              <Text
                variant="plainText"
                sx={{
                  pb: 2,
                }}
              >
                <InlineTextarea name="sdksAndToolsHeading" />
              </Text>
              <Text>
                <InlineTextarea name="sdksAndToolsText" />
              </Text>
            </Flex>
            <Link href="/documentation/introduction-to-dai-js">
              <Flex sx={{ alignItems: 'center', py: [3, 3, 0] }}>
                <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                <Text sx={{ cursor: 'pointer' }}>View Dai.js docs</Text>
              </Flex>
            </Link>
          </Flex>
          <Flex
            sx={{
              flexDirection: 'column',
              gridRowStart: ['auto', 4, 2],
              gridColumnStart: [1, 1, 2],
            }}
          >
            <Flex
              sx={{
                flexDirection: 'column',
                color: 'onBackgroundMuted',
              }}
            >
              <Text sx={{ pb: 2, fontSize: [4, 5] }}>
                <InlineTextarea name="pyMakerHeading" />
              </Text>
              <Text>
                <InlineTextarea name="pyMakerSubtext" />
              </Text>
            </Flex>
            <Link href="/documentation/pymaker">
              <Flex sx={{ alignItems: 'center', py: [3, 3, 4] }}>
                <Icon sx={{ mr: 2 }} color="primary" name={'arrow_right'}></Icon>
                <Text sx={{ cursor: 'pointer' }}>View pyMaker docs</Text>
              </Flex>
            </Link>
          </Flex>
        </Grid>
      </Grid>

      <Grid
        columns={[1, 'auto', 3]}
        sx={{
          pt: 4,
        }}
      >
        <Heading
          variant="largeHeading"
          sx={{ py: 4, gridColumnStart: [1, 2], gridColumnEnd: [2, 4] }}
        >
          <InlineTextarea name="toolsHeading" />
        </Heading>
        <Flex
          sx={{
            flexDirection: 'column',
            gridColumnStart: [1, 2],
          }}
        >
          <Icon name="keeper" color="textMuted" sx={{ width: '164px', height: '164px', mb: 4 }} />
          <Heading>Keepers</Heading>
          <Text sx={{ py: 3, color: 'onBackgroundMuted' }}>
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
            mt: [4, 0],
          }}
        >
          <Icon
            name="wireframeGlobe"
            color="textMuted"
            sx={{ width: '164px', height: '164px', mb: 4 }}
          />
          <Heading>CLIs</Heading>
          <Text sx={{ py: 3, color: 'onBackgroundMuted' }}>
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
