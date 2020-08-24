/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Card, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import Link from 'next/link';
import SingleLayout from '../layouts/SingleLayout.js';

const content = [
  ['decentralized finance', 'text goes here', 'Learn More', '/technology'],
  ['Be part of the revolution', 'text goes here', 'Governance', '/governance'],
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
            <Heading variant="mediumHeading">Maker Protocol</Heading>
            <Text>For developers</Text>
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
