/** @jsx jsx */
import { Container, jsx, Card, Grid } from 'theme-ui';
import Sidebar from '../components/Sidebar';
import Infobar from '../components/Infobar';

const DoubleSidebarLayout = ({ resourceType, slug, menu, toc, children }) => {
  return (
    <Container mt={3}>
      <Grid columns={['auto', '200px auto 200px']} gap="0">
        <Sidebar
          resourceType={resourceType}
          slug={slug}
          menu={menu}
          toc={toc}
        />
        <Card sx={{ py: 0, px: 4 }}>{children}</Card>
        <Infobar />
      </Grid>
    </Container>
  );
};

export default DoubleSidebarLayout;
