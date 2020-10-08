/** @jsx jsx */
import { jsx, Heading, Box, Container } from 'theme-ui';
import SingleLayout from '@layouts/SingleLayout.js';

const Technology = () => {
  return (
    <SingleLayout>
      <Container>
        <Box sx={{ height: 8 }}>
          <Heading variant="largeHeading">Maker Protocol Technology</Heading>
        </Box>
      </Container>
    </SingleLayout>
  );
};

export default Technology;
