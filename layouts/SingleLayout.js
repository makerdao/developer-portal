import { jsx, Card, Grid, Box } from 'theme-ui';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SingleLayout = ({ subnavFor, children }) => {
  return (
    <Box>
      <Header subnavFor={subnavFor} />
      {children}
      <Footer />
    </Box>
  );
};

export default SingleLayout;
