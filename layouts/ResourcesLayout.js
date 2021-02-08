/** @jsx jsx */
import { jsx, Box, Grid } from 'theme-ui';
import SingleLayout from '@layouts/SingleLayout';
import Infobar from '@components/Infobar';
import useSubNavForm from '@hooks/useSubNavForm';
import { useFormScreenPlugin } from 'tinacms';
import SubNav from '@components/SubNav';

const ResourcesLayout = ({
  resourcePath,
  sidebar,
  slug,
  toc,
  navFile,
  preview,
  mobile,
  router,
  children,
}) => {
  const [navData, navForm] = useSubNavForm(navFile, preview);
  useFormScreenPlugin(navForm);

  return (
    <SingleLayout
      mobile={mobile}
      subnav={<SubNav links={navData.navItems} router={router} />}
      router={router}
    >
      <Grid columns={['auto', '300px auto 250px']} gap="0">
        {sidebar || <Box />}
        <Box sx={{ borderRadius: 0, py: 0, px: 4, pb: 4 }}>{children}</Box>
        <Infobar resourcePath={resourcePath} slug={slug} toc={toc} />
      </Grid>
    </SingleLayout>
  );
};

export default ResourcesLayout;
