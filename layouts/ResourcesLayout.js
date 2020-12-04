/** @jsx jsx */
import { jsx, Box, Grid } from 'theme-ui';
import SingleLayout from '@layouts/SingleLayout';
import SidebarDocumentation from '@components/SidebarDocumentation';
import SidebarGuides from '@components/SidebarGuides';
import Infobar from '@components/Infobar';
import { useGithubToolbarPlugins } from 'react-tinacms-github';
import { ContentTypes } from '../utils/constants';

const ResourcesLayout = ({ resources, resourcePath, slug: activeSlug, toc, subnav, children }) => {
  useGithubToolbarPlugins();
  const sidebar =
    resourcePath === ContentTypes.GUIDES ? (
      <SidebarGuides resources={resources} resourcePath={resourcePath} activeSlug={activeSlug} />
    ) : (
      <SidebarDocumentation
        resources={resources}
        resourcePath={resourcePath}
        activeSlug={activeSlug}
      />
    );
  return (
    <SingleLayout subnav={subnav}>
      <Grid columns={['auto', '300px auto 250px']} gap="0">
        {sidebar}
        <Box sx={{ bg: 'surface', borderRadius: 0, py: 0, px: 4, pb: 4 }}>{children}</Box>
        <Infobar resourcePath={resourcePath} slug={activeSlug} toc={toc} />
      </Grid>
    </SingleLayout>
  );
};

export default ResourcesLayout;
