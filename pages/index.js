/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Card, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import useMaker from '../hooks/useMaker';
import { useEffect } from 'react';

const Index = () => {
  return (
    <Container>
      <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
        <Heading variant="mediumHeading">Developer Portal</Heading>
        <Card sx={{ py: 0, px: 3, my: 2 }}>
          This is a memorable landing page 🔮
        </Card>
      </Box>
    </Container>
  );
};

export default Index;
