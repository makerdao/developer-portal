/** @jsx jsx */
import { Styled, jsx, Flex, Card } from 'theme-ui';

const Item = () => {
  return (
    <Card>
      <Styled.pre>
        <Styled.code sx={{ m: 0, p: 0 }}>{"var test = '234"}</Styled.code>
      </Styled.pre>
    </Card>
  );
};

const Infobar = () => {
  return (
    <aside>
      <Flex
        sx={{
          flexDirection: 'column',
          py: 4,
          px: 2,
        }}
      >
        <Item></Item>
      </Flex>
    </aside>
  );
};

export default Infobar;
