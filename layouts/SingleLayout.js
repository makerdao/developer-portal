import { jsx, Card, Grid, Container, Box } from 'theme-ui';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SingleLayout = ({ subnavFor, children }) => {
  return (
    <>
      <Header subnavFor={subnavFor} />
      <Box as="main">{children}</Box>
      <Footer />
    </>
  );
};

export default SingleLayout;
