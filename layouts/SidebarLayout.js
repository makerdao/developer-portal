/** @jsx jsx */
import { Container, jsx, Card, Grid } from 'theme-ui';
import Sidebar from '../components/Sidebar';

const SidebarLayout = ({ children }) => {
  return (
    <Container mt={3}>
      <Grid columns={['auto', '200px auto']} gap="0">
        <Sidebar />
        <Card sx={{ py: 0, px: 4 }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default SidebarLayout;
