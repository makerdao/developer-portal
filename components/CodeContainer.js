/** @jsx jsx */
import { jsx, Text, Grid, Box, Flex } from 'theme-ui';
import CodeWrapper from '@components/CodeWrapper';

export const CodeBox = ({ value, language = 'jsx', title = 'Code', codeProps, ...props }) => {
  return (
    <Box sx={{ border: 'light', borderColor: 'muted' }}>
      <Flex
        sx={{
          p: 3,
          border: 'light',
          borderColor: (theme) => `transparent transparent ${theme.colors.muted} transparent`,
          alignItems: 'center',
        }}
      >
        <Grid columns={3} gap={1} sx={{ pr: 3 }}>
          <Box sx={{ border: 'light', borderColor: 'muted', borderRadius: 'round', size: 3 }}></Box>
          <Box sx={{ border: 'light', borderColor: 'muted', borderRadius: 'round', size: 3 }}></Box>
          <Box sx={{ border: 'light', borderColor: 'muted', borderRadius: 'round', size: 3 }}></Box>
        </Grid>
        <Text>{language}</Text>
      </Flex>
      <CodeWrapper sx={{ p: 3, maxHeight: 8 }} value={value} language={language} />
    </Box>
  );
};

export default CodeBox;
