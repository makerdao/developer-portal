/** @jsx jsx */
import Link from 'next/link';
import { jsx, Text, Flex } from 'theme-ui';
import { capitalize } from '@utils';

const Crumb = ({ url, text }) => (
  <>
    <Link href={url}>
      <Text variant="caps" sx={{ color: 'onBackgroundMuted', cursor: 'pointer' }}>
        {text}
      </Text>
    </Link>
    <Text variant="caps" sx={{ color: 'textMuted', px: 1, cursor: 'pointer' }}>
      {'>'}
    </Text>
  </>
);

const BreadCrumbs = ({ contentType, group, parent, title }) => {
  return (
    <Flex sx={{ pt: 3, flexWrap: 'wrap' }}>
      <Crumb url="/" text="Home" />
      <Crumb url={`/${contentType}`} text={capitalize(contentType)} />
      {group && <Crumb url={`${group.url}`} text={group.name} />}
      {parent && <Crumb url={`${parent.slug}`} text={parent.title} />}
      <Text variant="caps" sx={{ color: 'textMuted' }}>
        {title}
      </Text>
    </Flex>
  );
};

export default BreadCrumbs;
