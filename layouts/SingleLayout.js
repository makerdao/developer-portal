import { jsx, Card, Grid, Box } from 'theme-ui';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SingleLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      {children}
      <Footer />
    </Box>
  );
};

export default SingleLayout;
