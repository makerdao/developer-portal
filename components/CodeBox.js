/** @jsx jsx */
import { useState } from 'react';
import Link from 'next/link';
import { jsx, Container, Card, Heading, Text, Grid, Box, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import CodeWrapper from '@components/CodeWrapper';

export const CodeBox = ({ cta, sections }) => {
  const [activeTool, setActiveTool] = useState(0);

  return (
    <Container>
      <Grid
        columns={'1fr auto'}
        sx={{
          columnGap: 4,
        }}
      >
        <Box>
          <Card
            sx={{
              height: '500px',
              width: '100%',
              bg: 'background',
            }}
          >
            <CodeWrapper
              value={sections[activeTool].code}
              language={sections[activeTool].language}
            />
          </Card>
        </Box>
        <Box sx={{}}>
          <Heading pb={4} variant="mediumHeading">
            {cta}
          </Heading>
          <Grid
            sx={{
              rowGap: 4,
            }}
          >
            {sections.map((tool, i) => {
              const { title, des, link } = tool;
              const isActive = i === activeTool;
              return (
                <Box key={tool.title}>
                  <Heading
                    variant="microHeading"
                    onClick={() => {
                      setActiveTool(i);
                    }}
                  >
                    {title}
                  </Heading>
                  {!isActive ? null : (
                    <Grid
                      sx={{
                        rowGap: 2,
                        pt: 2,
                      }}
                    >
                      <Text>{des}</Text>
                      <Link href={link} passHref>
                        <Flex sx={{ alignItems: 'center' }}>
                          <Icon sx={{ mr: 2 }} name={'arrow_right'}></Icon>
                          <ThemeLink sx={{ color: 'text' }}>Read More</ThemeLink>
                        </Flex>
                      </Link>
                    </Grid>
                  )}
                </Box>
              );
            })}
          </Grid>
        </Box>
      </Grid>
    </Container>
  );
};

export default CodeBox;
