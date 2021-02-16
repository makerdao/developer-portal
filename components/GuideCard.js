/** @jsx jsx */
import { jsx, Heading, Text, Box, Flex, Grid } from 'theme-ui';
import Link from 'next/link';
import { Icon } from '@makerdao/dai-ui-icons';

const TagList = ({ tags }) => (
  <Text variant="plainText" sx={{ color: 'primary', fontSize: 1 }}>
    {tags.map((tag, i) => (
      <span key={tag + i} sx={{ '&:not(:last-child):after': { content: '", "' } }}>
        {tag}
      </span>
    ))}
  </Text>
);

const GuideCard = ({ title, link, linkText, description, icon, tags, ...props }) => {
  return (
    <Box {...props}>
      <Link href={link} passHref>
        <Grid sx={{ height: '100%', gap: 3, gridTemplateRows: '50px auto 1fr auto' }}>
          <Icon color="mutedAlt" name={icon} size={5}></Icon>
          <Heading sx={{ cursor: 'pointer' }} variant="smallHeading">
            {title}
          </Heading>
          <Text
            sx={{
              cursor: 'pointer',
              display: '-webkit-inline-box',
              overflow: 'hidden',
              maxHeight: '70px',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {description}
          </Text>
          <TagList tags={tags} />
          <Flex sx={{ alignItems: 'center', alignSelf: 'end' }}>
            <Icon name="arrow_right" color="primary" mr={2} />
            <Text sx={{ cursor: 'pointer' }}>{linkText}</Text>
          </Flex>
        </Grid>
      </Link>
    </Box>
  );
};

export default GuideCard;
