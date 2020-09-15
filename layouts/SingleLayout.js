import { jsx, Card, Grid, Box } from 'theme-ui';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SingleLayout = ({ subnav, children }) => {
  return (
    <Box>
      <Header subnav={subnav} />
      {children}
      <Footer />
    </Box>
  );
};

export default SingleLayout;
