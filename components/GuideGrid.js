/** @jsx jsx */
import { jsx, Container, Grid } from 'theme-ui';
import GuideCard from '@components/GuideCard';

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
              <GuideCard
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
