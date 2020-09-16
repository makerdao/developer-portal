/** @jsx jsx */
import { jsx, Card, Grid, BaseStyles } from 'theme-ui';
import Sidebar from '@components/Sidebar';
import SingleLayout from '@layouts/SingleLayout';
import SubNav from '../components/SubNav';
import subNavLinks from '../data/resourcesSubNav.json';

const GuidesLayout = ({ resourcePath, slug, toc, children }) => {
  const subnav = <SubNav links={subNavLinks} />;
  return (
    <SingleLayout subnav={subnav}>
      <Grid columns={['auto', '200px auto 200px']} gap="0">
        <Sidebar resourcePath={resourcePath} slug={slug} toc={toc} />
        <Card sx={{ py: 0, px: 4 }}>
          <BaseStyles>{children}</BaseStyles>
        </Card>
      </Grid>
    </SingleLayout>
  );
};

export default GuidesLayout;
