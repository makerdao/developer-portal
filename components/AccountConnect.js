/** @jsx jsx */
import { Text, jsx, Button, Flex } from 'theme-ui';
import useMaker from '../hooks/useMaker';

const formatAddress = (address) =>
  address.slice(0, 7) + '...' + address.slice(-4);

const AccountConnect = () => {
  const { maker, network, connectBrowserWallet, web3Connected } = useMaker();

  return !web3Connected ? (
    <Button variant="primary" disabled={!maker} onClick={connectBrowserWallet}>
      <Text>Connect Wallet</Text>
    </Button>
  ) : (
    <Flex
      sx={{
        variant: 'cards.primary',
        py: 2,
        fontSize: 2,
        alignItems: 'center',
        width: 7,
      }}
    >
      <Flex
        sx={{
          flex: '1 1 auto',
        }}
      >
        <span
          sx={{
            color: network === 'mainnet' ? 'primary' : 'accentPurple',
            marginRight: 2,
          }}
        >
          ●
        </span>
        <Text>Metamask</Text>
      </Flex>
      <Text>{formatAddress(maker.currentAddress())}</Text>
    </Flex>
  );
};

export default AccountConnect;
