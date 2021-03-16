/** @jsx jsx */
import { jsx, Text, Flex, Link as ThemeLink, Container } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Banner from '@components/Banner';
import { banner as bannerJson } from '../data/banner.json';

const Banners = ({ bannerData }) => {
  const [changelog] = bannerData || bannerJson;

  return (
    <Banner
      content={
        <Container>
          <ThemeLink href={changelog.url} target="_blank">
            <Flex
              sx={{
                width: '100%',
                justifyContent: 'space-between',
              }}
            >
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
                {changelog.text}
              </Text>
              <Flex sx={{ alignItems: 'center', justifyContent: 'flex-end', width: '33%' }}>
                <Icon color="text" name="increase"></Icon>
                <Text sx={{ color: 'text', pl: 2, fontWeight: 'body' }}>{changelog.linkText}</Text>
              </Flex>
            </Flex>
          </ThemeLink>
        </Container>
      }
    />
  );
};

export default Banners;
