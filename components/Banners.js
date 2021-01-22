/** @jsx jsx */
import { useState } from 'react';
import { jsx, Text, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
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
            <Text sx={{ variant: 'text.plainText', m: 'auto', color: 'textMuted', fontSize: 1 }}>
              {changelog.text}
            </Text>
            <ThemeLink href={changelog.url} target="_blank">
              <Flex sx={{ alignItems: 'center' }}>
                <Icon color="text" name="arrow_right"></Icon>
                <Text sx={{ color: 'text', pl: 2, fontWeight: 'body' }}>
                  View all public releases
                </Text>
              </Flex>
            </ThemeLink>
          </>
        }
      />
    )
  );
};

export default Banners;
