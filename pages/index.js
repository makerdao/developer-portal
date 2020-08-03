/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Card, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import useMaker from '../hooks/useMaker';
import { useEffect } from 'react';
import IntroMDX from '../text/intro.mdx';

const Index = () => {
  const { maker, fetchTokenBalance, web3Connected } = useMaker();
  const [ethBalance, setEthBalance] = useState(null);
  const [mkrBalance, setMkrBalance] = useState(null);
  const [proxyAddress, setProxyAddress] = useState(null);

  useEffect(() => {
    const fetchBalances = async () => {
      const ethBal = await fetchTokenBalance('ETH');
      const mkrBal = await fetchTokenBalance('MKR');
      setEthBalance(ethBal.toString());
      setMkrBalance(mkrBal.toString());
    };
    const checkProxy = async () => {
      const proxy = await maker.currentProxy();
      setProxyAddress(proxy);
    };
    if (web3Connected) {
      fetchBalances();
      checkProxy();
    }
  }, [web3Connected, maker, fetchTokenBalance]);

  return (
    <Container>
      <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
        <Heading variant="mediumHeading">Dai Boilerplate</Heading>
        <Card sx={{ py: 0, px: 3, my: 2 }}>
          <IntroMDX></IntroMDX>
        </Card>
        {web3Connected && (
          <Grid sx={{ my: 3 }}>
            <Card>
              <Heading sx={{ pb: 2 }} variant="smallHeading">
                Balances
              </Heading>
              <Text sx={{ fontFamily: 'monospace' }}>{ethBalance}</Text>
              <Text sx={{ fontFamily: 'monospace' }}>{mkrBalance}</Text>
            </Card>
            <Card>
              <Heading sx={{ pb: 2 }} variant="smallHeading">
                Proxy Address
              </Heading>
              {proxyAddress ? (
                <Text sx={{ fontFamily: 'monospace' }}>{proxyAddress}</Text>
              ) : (
                <Text>No proxy address found</Text>
              )}
            </Card>
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default Index;
