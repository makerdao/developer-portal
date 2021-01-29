/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import Header from '@components/Header';
import Banners from '@components/Banners';

const SingleLayout = ({ bannerData, subnav, mobile, children }) => {
  return (
    <Box>
      <Banners bannerData={bannerData} mobile={mobile} />
      <Header subnav={subnav} />
      {children}
      {/* <Footer /> */}
    </Box>
  );
};

export default SingleLayout;
