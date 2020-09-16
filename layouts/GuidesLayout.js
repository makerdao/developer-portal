/** @jsx jsx */
import { jsx, Card, Grid, BaseStyles, Container } from 'theme-ui';
import Sidebar from '@components/Sidebar';
import SingleLayout from '@layouts/SingleLayout';
import SubNav from '../components/SubNav';
import subNavLinks from '../data/resourcesSubNav.json';

const GuidesLayout = ({ resourcePath, slug, toc, children }) => {
  const subnav = <SubNav links={subNavLinks} />;
  return (
    <SingleLayout subnav={subnav}>
      <Container>
        <Grid columns={['auto', '200px auto']} gap="0">
          <Sidebar resourcePath={resourcePath} slug={slug} toc={toc} />
          <Card sx={{ py: 0, px: 4 }}>
            <BaseStyles>{children}</BaseStyles>
          </Card>
        </Grid>
      </Container>
    </SingleLayout>
  );
};

export default GuidesLayout;
