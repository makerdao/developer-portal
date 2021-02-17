/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import Header from '@components/Header';
import Footer from '@components/Footer';

const GuidesLayout = ({ bannerData, subnav, infobar, mobile, router, children }) => {
  return (
    <Box>
      <Header subnav={subnav} bannerData={bannerData} mobile={mobile} router={router} />
      {!mobile && <aside sx={{ float: 'right', width: '20%' }}>{infobar}</aside>}
      {children}
      <Footer />
    </Box>
  );
};

export default GuidesLayout;
