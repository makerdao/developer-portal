/** @jsx jsx */
import { jsx, Box } from 'theme-ui';
import Header from '@components/Header';
import Banners from '@components/Banners';

const SingleLayout = ({ subnav, children }) => {
  return (
    <Box>
      <Banners />
      <Header subnav={subnav} />
      {children}
      {/* <Footer /> */}
    </Box>
  );
};

export default SingleLayout;
