/** @jsx jsx */
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { jsx, Box } from 'theme-ui';

const CodeWrapper = ({ value, language = 'jsx', ...otherProps }) => {
  return (
    <Box variant="styles.code" {...otherProps}>
      <SyntaxHighlighter
        codeTagProps={''}
        useInlineStyles={false}
        language={language}
        showLineNumbers={true}
      >
        {value}
      </SyntaxHighlighter>
    </Box>
  );
};

export default CodeWrapper;
