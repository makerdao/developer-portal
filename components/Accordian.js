/** @jsx jsx */
import { useState } from 'react';
import { jsx, Text, Flex } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const Row = ({ title, content }) => {
  const [open, setOpen] = useState(false);

  return (
    <Flex
      sx={{
        flexDirection: 'column',
        py: 3,
        border: 'light',
        borderColor: 'muted',
        borderWidth: '1px 0 0 0',
        '&:last-child': { borderWidth: '1px 0 1px 0' },
      }}
    >
      <Flex sx={{ justifyContent: 'space-between' }}>
        <Text>{title}</Text>
        <Flex sx={{ alignItems: 'center' }} onClick={() => setOpen(!open)}>
          <Icon color="primary" name={open ? 'arrow_up_thin' : 'arrow_down_thin'}></Icon>
          <Text sx={{ pl: 2 }}>{open ? 'View Less' : 'View More'}</Text>
        </Flex>
      </Flex>
      {open && <Text sx={{ py: 3, px: 6 }}>{content}</Text>}
    </Flex>
  );
};

const Accordian = ({ items }) => {
  return (
    <Flex sx={{ flexDirection: 'column' }}>
      {items.map(({ title, content }) => {
        return <Row key={title} title={title} content={content}></Row>;
      })}
    </Flex>
  );
};

export default Accordian;
