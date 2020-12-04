/** @jsx jsx */
import { useState } from 'react';
import { jsx, Text, Flex, Avatar } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

const LineItem = ({ date, author, avatar }) => {
  return (
    <Flex sx={{ pb: 4 }}>
      <Flex sx={{ alignItems: 'center' }}>
        <Text variant="caps" sx={{ fontSize: 2 }}>
          Last Edit:
        </Text>
        <Text sx={{ pl: 3 }}>{date}</Text>
      </Flex>
      <Flex sx={{ ml: 4, alignItems: 'center' }}>
        <Text variant="caps" sx={{ fontSize: 2 }}>
          By:
        </Text>
        <Avatar sx={{ mx: 2 }} src={avatar} />
        <Icon sx={{ ml: 'auto' }} color="primary" name="increase"></Icon>
        <Text sx={{ pl: 2 }}>{author}</Text>
      </Flex>
    </Flex>
  );
};

const Contributors = ({ contributors }) => {
  const [open, setOpen] = useState(false);
  const [newest, ...rest] = contributors;

  return (
    <Flex
      sx={{
        pt: 4,
        px: 0,
        border: 'light',
        borderColor: 'mutedAlt',
        borderWidth: '1px 0 1px 0',
        cursor: 'pointer',
        flexDirection: 'column',
      }}
    >
      <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <LineItem author={newest.username} date={newest.date} avatar={newest.avatar} />
        <Flex sx={{ alignItems: 'center' }} onClick={() => setOpen(!open)}>
          <Icon
            sx={{ ml: 'auto' }}
            color="primary"
            name={open ? 'arrow_up_thin' : 'arrow_down_thin'}
          ></Icon>
          <Text>{`${open ? 'Hide' : 'Show'} All Contributors`}</Text>
        </Flex>
      </Flex>
      {open &&
        rest.map(({ date, username, avatar }) => (
          <LineItem key={username} date={date} author={username} avatar={avatar} />
        ))}
    </Flex>
  );
};

export default Contributors;
