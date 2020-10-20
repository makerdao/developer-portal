/** @jsx jsx */
import { BaseStyles } from 'theme-ui';
import ReactMarkdown from 'react-markdown';
import { jsx, Image } from 'theme-ui';

import CodeWrapper from '@components/CodeWrapper';
import Heading from './Heading';

const ImageWrapper = ({ alt, src, title }) => {
  return <Image alt={alt} src={src} title={title} />;
};

const MarkdownWrapper = ({ source }) => (
  <BaseStyles>
    <ReactMarkdown
      source={source}
      renderers={{ code: CodeWrapper, heading: Heading, image: ImageWrapper }}
    />
  </BaseStyles>
);

export default MarkdownWrapper;
