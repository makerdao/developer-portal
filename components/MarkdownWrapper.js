/** @jsx jsx */
import { BaseStyles } from 'theme-ui';
import ReactMarkdown from 'react-markdown';
import { jsx, Image } from 'theme-ui';
import slugify from 'slugify';
import CodeWrapper from '@components/CodeWrapper';

const ImageWrapper = ({ alt, src, title }) => {
  return <Image alt={alt} src={src} title={title} />;
};

const Heading = ({ children, level }) => {
  const Heading = `h${level}`;
  const value = children
    .map((child) => child.props.value || child.props.children[0].props.value)
    .join('');
  const slug = slugify(value, { lower: true });
  return <Heading id={slug}>{children}</Heading>;
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
