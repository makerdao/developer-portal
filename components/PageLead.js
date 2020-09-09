/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex, Grid, Container } from 'theme-ui';
import Link from 'next/link';

const PageLead = () => {
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
            sx={{
              color: 'onBackgroundMuted',
              mb: 2,
            }}
          >
            Find all you need to build on top of the Maker Protocol <br /> or integrate Dai, the
            decentralized stablecoin.
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

export default PageLead;
