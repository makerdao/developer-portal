/** @jsx jsx */
import { jsx, Card, Grid } from 'theme-ui';
import Sidebar from '../components/Sidebar';
import Infobar from '../components/Infobar';
import KnowledgebaseLayout from 'layouts/KnowledgebaseLayout';

const GuidesLayout = ({ resourceType, slug, menu, toc, children }) => {
  return (
    <KnowledgebaseLayout>
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
    </KnowledgebaseLayout>
  );
};

export default GuidesLayout;
