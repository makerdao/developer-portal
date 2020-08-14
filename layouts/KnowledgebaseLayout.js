/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import Subheader from 'components/Subheader';
import { RESOURCE_LINKS } from 'components/MenuPopup';

const KnowledgebaseLayout = ({ children }) => {
  return (
    <Container sx={{ px: 0 }}>
      <Subheader links={RESOURCE_LINKS} />
      {children}
    </Container>
  );
};

export default KnowledgebaseLayout;
