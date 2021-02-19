/** @jsx jsx */
import { useState } from 'react';
import { jsx, Text, Flex, Avatar, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { toDateString } from '@utils/formatting';

const LineItem = ({ date, author, avatar, mobile }) => {
  return (
    <Flex sx={{ pt: 4, flexWrap: mobile ? 'wrap' : 'nowrap' }}>
      <Flex sx={{ alignItems: 'center' }}>
        <Text variant="caps" sx={{ fontSize: 2, visibility: 'hidden' }}>
          Last Edit:
        </Text>
        <Text sx={{ pl: 3 }}>{date}</Text>
      </Flex>
      <Flex sx={{ ml: [0, 4], alignItems: 'center' }}>
        <Text variant="caps" sx={{ fontSize: 2, visibility: 'hidden' }}>
          By:
        </Text>
        <ThemeLink href={`https://github.com/${author}`} target="_blank">
          <Flex sx={{ alignItems: 'center' }}>
            <Avatar sx={{ mx: 2 }} src={avatar} />
            <Icon sx={{ ml: 'auto' }} color="primary" name="increase"></Icon>
            <Text sx={{ color: 'text', pl: 2 }}>{author}</Text>
          </Flex>
        </ThemeLink>
      </Flex>
    </Flex>
  );
};

const Contributors = ({ contributors = [], mobile }) => {
  const [open, setOpen] = useState(false);
  const [newest, ...rest] = contributors.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Flex
      sx={{
        py: 3,
        px: 0,
        border: 'light',
        borderColor: 'muted',
        borderWidth: '1px 0 1px 0',
        flexDirection: mobile ? 'column' : 'row',
      }}
    >
      <Flex sx={{ flexDirection: 'column' }}>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Flex sx={{ pb: 0, flexWrap: mobile ? 'wrap' : 'nowrap' }}>
            <Flex sx={{ alignItems: 'center' }}>
              <Text variant="caps" sx={{ color: 'onBackgroundMuted', fontSize: 2 }}>
                Last Edit:
              </Text>
              <Text sx={{ pl: 3 }}>{toDateString(newest?.date)}</Text>
            </Flex>
            <Flex sx={{ ml: [0, 4], alignItems: 'center', cursor: 'pointer' }}>
              <Text variant="caps" sx={{ color: 'onBackgroundMuted', fontSize: 2 }}>
                By:
              </Text>
              <ThemeLink href={`https://github.com/${newest?.username}`} target="_blank">
                <Flex sx={{ alignItems: 'center' }}>
                  <Avatar sx={{ mx: 2 }} src={newest?.avatar} />
                  <Icon sx={{ ml: 'auto' }} color="primary" name="increase"></Icon>
                  <Text sx={{ color: 'text', pl: 2 }}>{newest?.author}</Text>
                </Flex>
              </ThemeLink>
            </Flex>
          </Flex>
        </Flex>
        {open &&
          rest?.map(({ date, username, avatar }) => (
            <LineItem
              key={username}
              date={toDateString(date)}
              author={username}
              avatar={avatar}
              mobile={mobile}
            />
          ))}
      </Flex>
      {rest.length > 0 && (
        <Flex
          sx={{
            justifyContent: 'space-between',
            ml: [0, 0, 'auto'],
            flexDirection: 'column',
            pt: [4, 4, 0],
          }}
        >
          <Flex
            sx={{
              justifyContent: mobile ? 'flex-start' : 'center',
              alignItems: 'center',
              pt: [0, 0, 1],
            }}
            onClick={() => setOpen(!open)}
          >
            <Icon
              sx={{
                ml: [0, 0, 'auto'],
              }}
              color="primary"
              name={open ? 'arrow_up_thin' : 'arrow_down_thin'}
            ></Icon>
            <Text sx={{ pl: 2 }}>{`${open ? 'Hide' : 'Show'} All Contributors`}</Text>
          </Flex>
          {open && !mobile && (
            <Flex sx={{ flexDirection: 'column', alignItems: 'flex-end', pl: 5 }}>
              <Text sx={{ color: 'onBackgroundMuted' }}>Thanks to all contributors!</Text>
            </Flex>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Contributors;
