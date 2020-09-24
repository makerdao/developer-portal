/** @jsx jsx */
import { jsx, Box, Grid, BaseStyles } from 'theme-ui';
import Sidebar from '@components/Sidebar';
import SingleLayout from '@layouts/SingleLayout';
import SubNav from '../components/SubNav';
import Infobar from '../components/Infobar';
import subNavLinks from '../data/resourcesSubNav.json';
import { useGithubToolbarPlugins } from 'react-tinacms-github';

const GuidesLayout = ({ resources, resourcePath, slug: activeSlug, toc, children }) => {
  useGithubToolbarPlugins();
  const subnav = <SubNav links={subNavLinks} />;
  return (
    <SingleLayout subnav={subnav}>
      <Grid columns={['auto', '300px auto 250px']} gap="0">
        <Sidebar resources={resources} resourcePath={resourcePath} activeSlug={activeSlug} />
        <Box sx={{ bg: 'surface', borderRadius: 0, py: 0, px: 4 }}>
          <BaseStyles>{children}</BaseStyles>
        </Box>
        <Infobar resourcePath={resourcePath} slug={activeSlug} toc={toc} />
      </Grid>
    </SingleLayout>
  );
};

export default GuidesLayout;
