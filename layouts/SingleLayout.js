/** @jsx jsx */
import { useState } from 'react';
import { jsx, Box, Text, Flex, Link as ThemeLink } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';
import Header from '@components/Header';
import Banner from '@components/Banner';

const SingleLayout = ({ subnav, children }) => {
  const [bannerOpen, setBannerOpen] = useState(true);
  return (
    <Box>
      <Header subnav={subnav} />
      {bannerOpen && (
        <Banner
          close={() => {
            setBannerOpen(!bannerOpen);
          }}
          content={
            <>
              <Text sx={{ variant: 'text.plainText', m: 'auto', color: 'textMuted', fontSize: 1 }}>
                Multi-collateral Dai <span sx={{ color: 'text', px: 1 }}>Release 1.2.0</span> Wed
                11.25.2020
              </Text>
              <ThemeLink href={'https://changelog.makerdao.com/'} target="_blank">
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
      )}
      {children}
      {/* <Footer /> */}
    </Box>
  );
};

export default SingleLayout;
