/** @jsx jsx */
import { jsx, Box, Grid, Container } from 'theme-ui';
import SingleLayout from '@layouts/SingleLayout';
import GuidesLayout from '@layouts/GuidesLayout';
import Infobar from '@components/Infobar';
import SubNav from '@components/SubNav';
import { ContentTypes } from '@utils/constants';

const ResourcesLayout = ({
  resourcePath,
  sidebar,
  slug,
  toc,
  navData,
  mobile,
  router,
  children,
}) => {
  return resourcePath === ContentTypes.DOCUMENTATION ? (
    <SingleLayout
      mobile={mobile}
      subnav={<SubNav links={navData.navItems} router={router} />}
      router={router}
    >
      <Grid columns={['auto', 'auto', '1fr 4fr 1fr']} gap="0">
        {sidebar || <Box />}
        <Box
          sx={{
            borderRadius: 0,
            py: 0,
            px: 4,
            pb: 4,
            border: mobile ? undefined : 'solid',
            borderColor: 'muted',
            borderWidth: '0 1px 0 0',
          }}
        >
          {children}
        </Box>
        {!mobile && <Infobar resourcePath={resourcePath} slug={slug} toc={toc} />}
      </Grid>
    </SingleLayout>
  ) : (
    <GuidesLayout
      mobile={mobile}
      subnav={<SubNav links={navData.navItems} router={router} />}
      router={router}
      infobar={!mobile && <Infobar resourcePath={resourcePath} slug={slug} toc={toc} />}
    >
      <Container sx={{}}>
        <Grid columns={'auto'}>
          <Box
            sx={{
              border: mobile ? undefined : 'solid',
              borderColor: 'muted',
              borderWidth: '0 1px 0 0',
              pr: [0, 0, 4],
            }}
          >
            {children}
          </Box>
        </Grid>
      </Container>
    </GuidesLayout>
  );
};

export default ResourcesLayout;
