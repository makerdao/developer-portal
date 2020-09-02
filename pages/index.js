/** @jsx jsx */
import { useState } from 'react';
import { Container, jsx, Card, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import Link from 'next/link';
import useResources from 'hooks/useResources';
import SingleLayout from '../layouts/SingleLayout.js';
import GuideList from 'components/GuideList';
import DocumentationList from 'components/DocumentationList';
import { default as featGuides } from 'data/featuredGuides.json';
import { default as featDocs } from 'data/featuredDocs.json';

const content = [
  ['decentralized finance', 'text goes here', 'Learn More', '/technology'],
  ['Be part of the revolution', 'text goes here', 'Governance', '/governance'],
];

const Index = () => {
  const resources = useResources();

  const initialGuides = resources.filter(r => {
    const idx = featGuides.indexOf(r.frontMatter.slug);
    if (idx !== -1) return r.frontMatter.slug === featGuides[idx];
  });
  const initialDocs = resources.filter(r => {
    const idx = featDocs.indexOf(r.frontMatter.slug);
    if (idx !== -1) return r.frontMatter.slug === featDocs[idx];
  });
  const [guides, setGuides] = useState(initialGuides);
  const [docs, setDocs] = useState(initialDocs);

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
              key={title}
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
        <GuideList guides={guides} />
        <DocumentationList docs={docs} />
      </Container>
    </SingleLayout>
  );
};

export default Index;
