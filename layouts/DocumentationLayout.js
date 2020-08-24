/** @jsx jsx */
import { jsx, Card, Grid } from 'theme-ui';
import Sidebar from '../components/Sidebar';
import KnowledgebaseLayout from 'layouts/KnowledgebaseLayout';

const DocumentationLayout = ({ resourcePath, slug, menu, toc, children }) => {
  return (
    <KnowledgebaseLayout>
      <Grid columns={['auto', '200px auto']} gap="0">
        <Sidebar
          resourcePath={resourcePath}
          slug={slug}
          menu={menu}
          toc={toc}
        />
        <Card sx={{ py: 0, px: 4 }}>{children}</Card>
      </Grid>
    </KnowledgebaseLayout>
  );
};

export default DocumentationLayout;
