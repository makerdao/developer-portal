import { jsx, Container, Card, Heading, Text, Grid, Box, BaseStyles } from 'theme-ui';
import { useState } from 'react';
import CodeBlock from '@components/markdown-wrapper/CodeBlock';
import Link from 'next/link';

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
              bg: 'background', //TODO check CodeTag prop in CodeBlock
            }}
          >
            <BaseStyles>
              <CodeBlock value={sections[activeTool].code} />
            </BaseStyles>
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
              const { title, des } = tool;
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
                      <Link href="/">
                        <Text>→ read more</Text>
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
