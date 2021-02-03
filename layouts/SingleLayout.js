/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import Header from '@components/Header';

const SingleLayout = ({ bannerData, subnav, mobile, children }) => {
  return (
    <Box>
      <Header subnav={subnav} bannerData={bannerData} mobile={mobile} />
      <Box sx={{ pt: [6, 0] }}>{children}</Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default SingleLayout;
