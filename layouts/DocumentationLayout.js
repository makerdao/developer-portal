/** @jsx jsx */
import { Container, jsx, Card, Grid } from 'theme-ui';
import Sidebar from '../components/Sidebar';

const SingleSidebarLayout = ({ resourceType, slug, menu, toc, children }) => {
  return (
    <Container mt={3}>
      <Grid columns={['auto', '200px auto']} gap="0">
        <Sidebar
          resourceType={resourceType}
          slug={slug}
          menu={menu}
          toc={toc}
        />
        <Card sx={{ py: 0, px: 4 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default SingleSidebarLayout;
