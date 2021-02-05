/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import Header from '@components/Header';
import Footer from '@components/Footer';

const SingleLayout = ({ bannerData, subnav, mobile, router, children }) => {
  return (
    <Box>
      <Header subnav={subnav} bannerData={bannerData} mobile={mobile} router={router} />
      {children}
      <Footer />
    </Box>
  );
};

export default SingleLayout;
