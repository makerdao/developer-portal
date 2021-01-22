/** @jsx jsx */
import { useState } from 'react';
import { jsx, Text, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import ReactMarkdown from 'react-markdown';
import Banner from '@components/Banner';
import { banner as bannerJson } from '../data/banner.json';

const Banners = ({ bannerData }) => {
  const [bannerOpen, setBannerOpen] = useState(true);
  const [changelog] = bannerData || bannerJson;

  return (
    bannerOpen && (
      <Banner
        close={() => {
          setBannerOpen(!bannerOpen);
        }}
        content={
          <>
            <Text
              sx={{
                fontWeight: 'body',
                m: 'auto',
                color: 'textMuted',
                fontSize: 2,
                '& strong': { color: 'text', px: 1, fontWeight: 'body' },
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
          </>
        }
      />
    )
  );
};

export default Banners;
