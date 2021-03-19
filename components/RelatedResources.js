/** @jsx jsx */
import { jsx, Text, Flex, Heading, Box } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';
import { InlineText } from 'react-tinacms-inline';
import { ContentTypes } from '../utils/constants';

const RelatedResources = ({ resources = [], contentType, show = 3 }) => {
  const nextType = contentType === ContentTypes.GUIDES ? 'relatedGuides' : 'relatedDocs';
  return (
    <Box>
      <Heading variant="mediumHeading" sx={{ my: 4 }}>
        <InlineText name={nextType} />
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
                borderColor: 'muted',
                borderWidth: '0 0 1px 0',
                cursor: 'pointer',
              }}
            >
              <Icon sx={{ size: 4, minWidth: 32 }} name={`num_${i + 1}`} />
              <Text variant="largeText" sx={{ pl: 3 }}>
                {data.frontmatter.title}
              </Text>
              <Icon sx={{ ml: 'auto', minWidth: 16 }} color="primary" name={'arrow_right'}></Icon>
            </Flex>
          </Link>
        );
      })}
    </Box>
  );
};

export default RelatedResources;
