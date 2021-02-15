/** @jsx jsx */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { jsx, Box } from 'theme-ui';

const CodeWrapper = ({ value, language = 'jsx', showLineNumbers, ...otherProps }) => {
  return (
    <Box variant="styles.code" {...otherProps}>
      <SyntaxHighlighter
        codeTagProps={''}
        useInlineStyles={false}
        language={language}
        showLineNumbers={showLineNumbers}
      >
        {value}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeWrapper;
