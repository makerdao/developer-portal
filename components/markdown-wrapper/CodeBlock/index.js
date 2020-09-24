import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const CodeBlock = ({ value }) => {
  return (
    <SyntaxHighlighter codeTagProps="style=''" useInlineStyles={false} language="jsx">
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
