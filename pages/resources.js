/** @jsx jsx */
import fs from 'fs';
import { join } from 'path';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import {
  Container,
  jsx,
  Card,
  Heading,
  Text,
  Grid,
  Box,
  Flex,
  Link as ThemeLink,
} from 'theme-ui';
// import {
//   default as guides,
//   _importMeta as metadata,
// } from './../../../content/resources/**/*.mdx';

const Index = ({ list }) => {
  return (
    <Container>
      <Box sx={{ mt: 2, ml: [0, 'auto'], mr: [null, 0] }}>
        <Heading variant="mediumHeading">Resources</Heading>
        <Card sx={{ py: 0, px: 3, my: 2 }}>
          <Heading>Guides</Heading>
          {list.map(({ slug, title }) => (
            <Box as="li" key={slug}>
              <Link key={title} href={`/resources/guides/${slug}/`}>
                <ThemeLink>{title}</ThemeLink>
              </Link>
            </Box>
          ))}
        </Card>
      </Box>
    </Container>
  );
};

const trimMdx = string => {
  if (string.indexOf('.md') === -1) {
    return string.substring(0, string.length - 3);
  }
  return string.substring(0, string.length - 4);
};

export async function getStaticProps() {
  const targetPath = 'content/resources/guides';
  const slugs = fs.readdirSync(join(process.cwd(), targetPath));
  console.log('slugsbackend', slugs);
  const list = slugs.map(slug => {
    const title =
      require(`content/resources/guides/${slug}`).metadata?.title ?? '';
    return {
      slug: trimMdx(slug),
      title,
    };
  });
  return {
    props: {
      list,
    },
  };
}

export default Index;
