/** @jsx jsx */
import { jsx, Card, Grid, BaseStyles } from 'theme-ui';
import Sidebar from '@components/Sidebar';
import SingleLayout from '@layouts/SingleLayout';
import SubNav from '@components/SubNav';

const subnavLinks = [
  { url: '/dsr', name: 'DSR' },
  { url: '/auctions', name: 'Auctions' },
  { url: '/governance', name: 'Governance' },
  { url: '/dai-js', name: 'Dai.js' },
  { url: '/maker-data-api', name: 'Maker Data API' },
];

const GuidesLayout = ({ resourcePath, slug, menu, toc, children }) => {
  const subnav = <SubNav links={subnavLinks} />;
  return (
    <SingleLayout subnav={subnav}>
      <Grid columns={['auto', '200px auto 200px']} gap="0">
        <Sidebar resourcePath={resourcePath} slug={slug} menu={menu} toc={toc} />
        <Card sx={{ py: 0, px: 4 }}>
          <BaseStyles>{children}</BaseStyles>
        </Card>
      </Grid>
    </SingleLayout>
  );
};

export default GuidesLayout;
