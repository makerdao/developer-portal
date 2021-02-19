/** @jsx jsx */
import { jsx, Text, Box, Flex } from 'theme-ui';
import CodeWrapper from '@components/CodeWrapper';
import { capitalize } from '@utils';

export const CodeContainer = ({ value, language }) => {
  return (
    <Box sx={{}}>
      <Flex
        sx={{
          ml: 3,
          borderRadius: '4px 4px 0px 0px',
          py: 2,
          bg: 'surface',
          width: 6,
        }}
      >
        <Text sx={{ mx: 'auto' }}>{capitalize(language || 'code')}</Text>
      </Flex>
      <CodeWrapper
        sx={{ p: 3, maxHeight: 8, borderRadius: 'small' }}
        value={value}
        language={language}
      />
    </Box>
  );
};

export default CodeContainer;
