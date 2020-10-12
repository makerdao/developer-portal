import { BaseStyles } from 'theme-ui';
import ReactMarkdown from 'react-markdown';

import CodeWrapper from '@components/CodeWrapper';
import Heading from './Heading';

const MarkdownWrapper = ({ source }) => (
  <BaseStyles>
    <ReactMarkdown source={source} renderers={{ code: CodeWrapper, heading: Heading }} />
  </BaseStyles>
);

export default MarkdownWrapper;
