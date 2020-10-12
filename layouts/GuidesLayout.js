/** @jsx jsx */
import { jsx, Box, Grid, BaseStyles } from 'theme-ui';
import Sidebar from '@components/Sidebar';
import SingleLayout from '@layouts/SingleLayout';
import Infobar from '../components/Infobar';
import { useGithubToolbarPlugins } from 'react-tinacms-github';

const GuidesLayout = ({ resources, resourcePath, slug: activeSlug, toc, subnav, children }) => {
  useGithubToolbarPlugins();
  return (
    <SingleLayout subnav={subnav}>
      <Grid columns={['auto', '300px auto 250px']} gap="0">
        <Sidebar resources={resources} resourcePath={resourcePath} activeSlug={activeSlug} />
        <Box sx={{ bg: 'surface', borderRadius: 0, py: 0, px: 4 }}>{children}</Box>
        <Infobar resourcePath={resourcePath} slug={activeSlug} toc={toc} />
      </Grid>
    </SingleLayout>
  );
};

export default GuidesLayout;
