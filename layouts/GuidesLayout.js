/** @jsx jsx */
import { jsx, Card, Grid } from 'theme-ui';
import Sidebar from '../components/Sidebar';
import Infobar from '../components/Infobar';
import SingleLayout from 'layouts/SingleLayout';

const GuidesLayout = ({ resourceType, slug, menu, toc, children }) => {
  return (
    <SingleLayout>
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
    </SingleLayout>
  );
};

export default GuidesLayout;
