import { shape } from 'prop-types';

import CodeBlock from './CodeBlock';
// import Heading from './Heading';

// import { ReactMarkdowStyled } from "./styles"
import ReactMarkdown from 'react-markdown';

const MarkdownWrapper = ({ source }) => (
  <ReactMarkdown source={source} renderers={{ code: CodeBlock }} />
);

MarkdownWrapper.propTypes = {
  post: shape(),
};

export default MarkdownWrapper;
