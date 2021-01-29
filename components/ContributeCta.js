/** @jsx jsx */
import { jsx, Text, Flex, Link as ThemeLink, Grid, Heading } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import EditLink from '@components/EditLink';
import { GITHUB_EDIT_LINK } from '../utils/constants';

const Contributors = ({ file }) => {
  return (
    <Flex
      sx={{
        py: [3, 4],
        px: [3, 5],
        border: 'light',
        borderColor: 'muted',
        borderRadius: 'small',
        width: '100%',
      }}
    >
      <Flex sx={{ flexDirection: 'column', width: '100%' }}>
        <Heading>Edit this page</Heading>
        <Heading sx={{ width: '100%' }}>Make the community proud with your contributions</Heading>
        <Grid columns={[1, '1fr 1fr 100px']} sx={{ width: '100%' }}>
          <Flex
            sx={{
              mt: 3,
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Text>
              Expert on this topic? If you want to contribute, you can edit this page using Tina CMS
              or directly on Github.
            </Text>
            <Flex sx={{ flexDirection: 'column', pt: 4 }}>
              <EditLink enterText="Edit With TinaCMS" />
              <ThemeLink href={`${GITHUB_EDIT_LINK}${file.fileRelativePath}`} target="_blank">
                <Flex sx={{ alignItems: 'center', mt: 2, pl: 3 }}>
                  <Icon sx={{ mr: 2 }} color="primary" name="github"></Icon>
                  <Text sx={{ color: 'text', cursor: 'pointer' }}>Edit on Github</Text>
                </Flex>
              </ThemeLink>
            </Flex>
          </Flex>
          <Flex sx={{ mt: 3, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text>You'll be credited and you'll be helping the Maker community.</Text>
            <Flex sx={{ flexDirection: 'column', mt: 'auto' }}>
              <Text sx={{ fontWeight: 'bold' }}>Questions?</Text>
              <Text>Ask us in the #dev channel</Text>
              <ThemeLink href={'https://chat.makerdao.com/channel/dev'} target="_blank">
                <Flex sx={{ alignItems: 'center', mt: 2 }}>
                  <Icon sx={{ mr: 2 }} color="primary" name="chat"></Icon>
                  <Text sx={{ color: 'text', cursor: 'pointer' }}>chat.makerdao.com</Text>
                </Flex>
              </ThemeLink>
            </Flex>
          </Flex>
          <Icon
            sx={{ transform: 'rotate(45deg)', width: 'auto', ml: 'auto' }}
            name="smiley"
            size={6}
          />
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Contributors;
