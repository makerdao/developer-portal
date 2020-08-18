/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Card, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import Link from 'next/link';
import SingleLayout from '../layouts/SingleLayout.js';

const content = [
  ['Dai', 'text goes here', 'Learn More', '/technology'],
  ['Vaults', 'text goes here', 'Learn More', '/technology'],
  ['governance', 'text goes here', 'Learn More', '/technology'],
  ['DSR', 'text goes here', 'Governance', '/governance'],
];

const Index = () => {
  return (
    <SingleLayout>
      <Container>
        <Flex
          sx={{
            height: '300px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box>
            <Heading variant="mediumHeading">Technology</Heading>
            <Text>For a better finance</Text>
          </Box>
        </Flex>

        {content.map(([title, text, cta, ctaRoute]) => {
          return (
            <Flex
              sx={{
                justifyContent: 'center',
                mb: 6,
              }}
            >
              <Box>
                <Heading>{title}</Heading>
                <Text>{text}</Text>

                <Link href={ctaRoute}>{cta}</Link>
              </Box>
            </Flex>
          );
        })}
      </Container>
    </SingleLayout>
  );
};

export default Index;
