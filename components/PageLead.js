/** @jsx jsx */
import { jsx, Card, Heading, Text, Box, Flex, Grid, Container } from 'theme-ui';

const PageLead = () => {
  return (
    <Container>
      <Flex sx={{ py: 6, flexDirection: 'column' }}>
        <Heading variant="megaHeading" sx={{ fontSize: 9 }}>
          Maker Protocol
        </Heading>
        <Heading variant="megaHeading" sx={{ fontSize: 9 }}>
          Developer Portal
        </Heading>
        <Flex sx={{ flexDirection: 'column', pl: 7, mt: 3 }}>
          <Text>A resource that provides guidance to the Maker Protocol.</Text>
          <Text>{'The foundation of decentralized finance, "Defi".'}</Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default PageLead;
