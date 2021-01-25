/** @jsx jsx */
import { jsx, Text, Flex, Link as ThemeLink, Container } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import ReactMarkdown from 'react-markdown';
import Banner from '@components/Banner';
import { banner as bannerJson } from '../data/banner.json';

const Banners = ({ bannerData }) => {
  const [changelog] = bannerData || bannerJson;

  return (
    <Banner
      content={
        <Container>
          <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
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
            <ThemeLink href={changelog.url} target="_blank">
              <Flex sx={{ alignItems: 'center' }}>
                <Icon color="text" name="arrow_right"></Icon>
                <Text sx={{ color: 'text', pl: 2, fontWeight: 'body' }}>{changelog.linkText}</Text>
              </Flex>
            </ThemeLink>
          </Flex>
        </Container>
      }
    />
  );
};

export default Banners;
