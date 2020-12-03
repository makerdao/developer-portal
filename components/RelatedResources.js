/** @jsx jsx */
import { jsx, Text, Flex, Heading } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import { ContentTypes } from '../utils/constants';

const RelatedResources = ({ resources = [], contentType, show = 3 }) => {
  const nextType =
    contentType === ContentTypes.GUIDES ? ContentTypes.DOCUMENTATION : ContentTypes.GUIDES;
  return (
    <>
      <Heading variant="mediumHeading" sx={{ my: 4 }}>
        Related {nextType}
      </Heading>
      {resources.slice(0, show).map(({ data }, i) => {
        return (
          <Link key={data.frontmatter.slug} href={`/${nextType}/${data.frontmatter.slug}`} passHref>
            <Flex
              sx={{
                alignItems: 'center',
                py: 3,
                px: 0,
                border: 'light',
                borderColor: 'mutedAlt',
                borderWidth: '0 0 1px 0',
                cursor: 'pointer',
              }}
            >
              <Icon sx={{ size: 4 }} name={`num_${i + 1}`} />
              <Text variant="largeText" sx={{ pl: 3 }}>
                {data.frontmatter.title}
              </Text>
              <Icon sx={{ ml: 'auto' }} color="primary" name={'increase'}></Icon>
            </Flex>
          </Link>
        );
      })}
    </>
  );
};

export default RelatedResources;
