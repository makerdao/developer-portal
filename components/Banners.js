/** @jsx jsx */
import { jsx, Text, Flex, Link as ThemeLink, Container } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import ReactMarkdown from 'react-markdown';
import Banner from '@components/Banner';
import { banner as bannerJson } from '../data/banner.json';

const Banners = ({ bannerData, mobile }) => {
  const [changelog] = bannerData || bannerJson;

  return (
    <Banner
      content={
        <Container>
          <ThemeLink href={changelog.url} target="_blank">
            <Flex sx={{ width: '100%', justifyContent: mobile ? 'center' : 'space-between' }}>
              <Text
                sx={{
                  fontWeight: 'body',
                  color: 'onBackgroundMuted',
                  fontSize: 2,
                  '& strong': { color: 'text', px: 1, fontWeight: 'body' },
                  '& p': {
                    m: 0,
                  },
                }}
              >
                <ReactMarkdown source={changelog.text} />
              </Text>
              {!mobile && (
                <Flex sx={{ alignItems: 'center' }}>
                  <Icon color="text" name="increase"></Icon>
                  <Text sx={{ color: 'text', pl: 2, fontWeight: 'body' }}>
                    {changelog.linkText}
                  </Text>
                </Flex>
              )}
            </Flex>
          </ThemeLink>
        </Container>
      }
    />
  );
};

export default Banners;
