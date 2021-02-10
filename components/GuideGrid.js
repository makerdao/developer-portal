/** @jsx jsx */
import { jsx, Box, Heading, Text, Container, Flex, Grid } from 'theme-ui';
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

const ListItem = ({ title, link, linkText, description, icon, tags }) => {
  return (
    <Box>
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

const GuideGrid = ({ resources, path }) => {
  return (
    <Container>
      <Grid columns={[1, 3, 4]} sx={{ gridRowGap: [5, 6], gridColumnGap: 5 }}>
        {resources.map(
          (
            {
              data: {
                frontmatter: { group, title, slug, description, tags },
              },
            },
            i
          ) => {
            return (
              <ListItem
                key={title}
                title={title}
                type={group}
                description={description}
                link={`/${path}/${slug}/`}
                linkText={'Read'}
                icon={`stamp_${(i % 5) + 1}`}
                tags={tags}
              />
            );
          }
        )}
      </Grid>
    </Container>
  );
};

export default GuideGrid;
