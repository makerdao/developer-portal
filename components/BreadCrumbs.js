/** @jsx jsx */
import Link from 'next/link';
import { jsx, Text, Flex } from 'theme-ui';
import { capitalize } from '@utils';

const Crumb = ({ url, text }) => (
  <>
    <Link href={url}>
      <Text variant="plainText" sx={{ fontSize: 1, cursor: 'pointer' }}>
        {text}
      </Text>
    </Link>
    <Text variant="plainText" sx={{ fontSize: 1, color: 'textMuted', px: 2, cursor: 'pointer' }}>
      {'>'}
    </Text>
  </>
);

const BreadCrumbs = ({ contentType, group, title }) => {
  return (
    <Flex sx={{ color: 'onBackgroundMuted', pt: 3 }}>
      <Crumb url="/" text="Home" />
      <Crumb url={`/${contentType}`} text={capitalize(contentType)} />
      {group && <Crumb url={`${group.url}`} text={group.name} />}
      <Text variant="plainText" sx={{ color: 'textMuted', fontSize: 1, cursor: 'pointer' }}>
        {title}
      </Text>
    </Flex>
  );
};

export default BreadCrumbs;
