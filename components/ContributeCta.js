/** @jsx jsx */
import { jsx, Text, Flex, Link as ThemeLink, Grid, Heading } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import { InlineText, InlineTextarea } from 'react-tinacms-inline';
import EditLink from '@components/EditLink';
import { GITHUB_EDIT_LINK } from '@utils/constants';

const Contributors = ({ file }) => {
  return (
    <Flex
      sx={{
        py: 3,
        px: 3,
        border: 'light',
        borderColor: 'muted',
        borderRadius: 'small',
        width: '100%',
      }}
    >
      <Icon
        name="edit"
        sx={{ mr: 2, mb: 'auto', pt: 1 }}
        color="primary"
        size="auto"
        height="24px"
        width="24px"
      ></Icon>
      <Flex sx={{ flexDirection: 'column', width: '100%' }}>
        <Heading>
          <InlineText name="edit" />
        </Heading>
        <Heading sx={{ width: '100%', color: 'onBackgroundMuted' }}>
          <InlineText name="editSub" />
        </Heading>
        <Grid columns={[1, '1fr 1fr auto']} sx={{ width: '100%' }}>
          <Flex
            sx={{
              mt: 3,
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
            }}
          >
            <Text>
              <InlineTextarea name="editLCol" />
            </Text>
            <Flex sx={{ flexDirection: 'column', pt: 4 }}>
              <EditLink enterText="Edit This Page" sx={{ px: 3 }} />
              <ThemeLink href={`${GITHUB_EDIT_LINK}${file.fileRelativePath}`} target="_blank">
                <Flex sx={{ alignItems: 'center', mt: 2, pl: 3 }}>
                  <Icon sx={{ mr: 2 }} color="primary" name="github"></Icon>
                  <Text
                    sx={{
                      color: 'text',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primaryEmphasis',
                      },
                    }}
                  >
                    Edit on Github
                  </Text>
                </Flex>
              </ThemeLink>
            </Flex>
          </Flex>
          <Flex sx={{ mt: 3, flexDirection: 'column', alignItems: 'flex-start' }}>
            <Text>
              <InlineTextarea name="editRCol" />
            </Text>
            <Flex sx={{ flexDirection: 'column', mt: 'auto' }}>
              <Text sx={{ fontWeight: 'bold' }}>Questions?</Text>
              <Text>Ask us in the #dev channel</Text>
              <ThemeLink href={'https://chat.makerdao.com/channel/dev'} target="_blank">
                <Flex sx={{ alignItems: 'center', mt: 2 }}>
                  <Icon sx={{ mr: 2 }} color="primary" name="chat"></Icon>
                  <Text
                    sx={{
                      color: 'text',
                      cursor: 'pointer',
                      '&:hover': {
                        color: 'primaryEmphasis',
                      },
                    }}
                  >
                    chat.makerdao.com
                  </Text>
                </Flex>
              </ThemeLink>
            </Flex>
          </Flex>
          <Icon
            sx={{ transform: 'rotate(45deg)', width: 'auto', ml: 'auto', zIndex: -1 }}
            name="smiley"
            size={6}
          />
        </Grid>
      </Flex>
    </Flex>
  );
};

export default Contributors;
