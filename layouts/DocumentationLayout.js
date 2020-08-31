/** @jsx jsx */
import { jsx, Card, Grid, BaseStyles } from 'theme-ui';
import Sidebar from '../components/Sidebar';
import SingleLayout from 'layouts/SingleLayout';

const DocumentationLayout = ({ resourcePath, slug, menu, toc, children }) => {
  return (
    <SingleLayout>
      <Grid columns={['auto', '200px auto']} gap="0">
        <Sidebar
          resourcePath={resourcePath}
          slug={slug}
          menu={menu}
          toc={toc}
        />
        <Card sx={{ py: 0, px: 4 }}>
          <BaseStyles>{children}</BaseStyles>
        </Card>
      </Grid>
    </SingleLayout>
  );
};

export default DocumentationLayout;
