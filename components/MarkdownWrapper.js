/** @jsx jsx */
import { createElement } from 'react';
import { BaseStyles } from 'theme-ui';
import ReactMarkdown from 'react-markdown';
import { jsx, Image, Text, Flex, Grid } from 'theme-ui';
import slugify from 'slugify';
import CodeContainer from '@components/CodeContainer';
const $ = createElement;

const ImageWrapper = ({ alt, src, title }) => {
  return <Image alt={alt} src={src} title={title} />;
};

const List = ({ children, ordered }) => {
  return ordered ? (
    <Flex sx={{ flexDirection: 'column', my: 3 }}>{children}</Flex>
  ) : (
    <ul>{children}</ul>
  );
};

const ListItem = ({ children, index, ordered }) => {
  return ordered ? (
    $(
      Grid,
      { columns: ['64px auto'], gap: 3, sx: { mb: 3 } },
      $(
        Flex,
        {
          sx: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            bg: 'onBackground',
            color: 'primary',
            size: 4,
            borderRadius: 'round',
            fontFamily: 'heading',
            fontSize: 3,
            mx: 'auto',
          },
        },
        $(Text, null, `${index + 1}`)
      ),
      $(
        Text,
        {
          sx: {
            my: 0,
            p: 0,
            '& > p': {
              m: 0,
            },
            '& > ul': {
              mt: 1,
              mb: 0,
            },
          },
        },
        children
      )
    )
  ) : (
    <li>{children}</li>
  );
};

const Heading = ({ children, level }) => {
  const Heading = `h${level}`;
  const value = children
    .map((child) => child.props.value || child.props.children[0].props.value)
    .join('');
  const slug = slugify(value, { lower: true });
  return (
    <Heading
      sx={{
        fontFamily: 'heading',
        lineHeight: 'heading',
        fontWeight: 'heading',
      }}
      id={slug}
    >
      {children}
    </Heading>
  );
};

const MarkdownWrapper = ({ source }) => (
  <BaseStyles>
    <ReactMarkdown
      source={source}
      renderers={{
        code: CodeContainer,
        heading: Heading,
        image: ImageWrapper,
        list: List,
        listItem: ListItem,
      }}
    />
  </BaseStyles>
);

export default MarkdownWrapper;
