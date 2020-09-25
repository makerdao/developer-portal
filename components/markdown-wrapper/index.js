import { shape } from 'prop-types';

import CodeWrapper from '@components/CodeWrapper';
import Heading from './Heading';

// import { ReactMarkdowStyled } from "./styles"
import ReactMarkdown from 'react-markdown';

const MarkdownWrapper = ({ source }) => (
  <ReactMarkdown source={source} renderers={{ code: CodeWrapper, heading: Heading }} />
);

MarkdownWrapper.propTypes = {
  post: shape(),
};

export default MarkdownWrapper;
