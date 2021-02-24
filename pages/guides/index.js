import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { Container, Grid, Text, Flex, Box } from 'theme-ui';
import { useBreakpointIndex } from '@theme-ui/match-media';
import GuideGrid from '@components/GuideGrid';
import Dropdown from '@components/Dropdown';
import SingleLayout from '@layouts/SingleLayout';
import { getResources } from '@utils';
import { ContentTypes } from '@utils/constants';

const FeaturedCount = ({ count, ...props }) => {
  return (
    <Text
      variant="plainText"
      sx={{
        fontSize: 3,
        my: 'auto',
        ...props.sx,
      }}
    >
      {count} featured
    </Text>
  );
};

const Filter = ({ options, activeGroup, onChange, count, mobile }) => {
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ border: 'light', borderColor: 'muted', borderWidth: '1px 0 1px 0', mb: 2 }}>
        <Container sx={{ p: 0 }}>
          <Grid columns={[2, '1fr 2fr 1fr']}>
            <Text variant="plainText" sx={{ fontSize: 3, p: 2, my: 'auto' }}>
              Show me guides about:
            </Text>
            <Flex
              sx={{
                border: 'light',
                borderColor: 'muted',
                borderWidth: mobile ? '0 0 0 1px' : '0 1px 0 1px',
                px: 4,
                py: 2,
              }}
            >
              <Dropdown
                sx={{ width: [7, 8] }}
                options={options}
                activeGroup={activeGroup}
                onChange={onChange}
              />
            </Flex>
            {!mobile && <FeaturedCount count={count} sx={{ py: 2, px: 4 }} />}
          </Grid>
        </Container>
      </Box>
      {mobile && <FeaturedCount count={count} sx={{ px: 2 }} />}
    </Box>
  );
};

const Page = ({ guides }) => {
  const [active, setActive] = useState('everything');
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });
  const router = useRouter();

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  const resources = guides.filter((guide) =>
    active === 'everything' ? Boolean : guide.data.frontmatter.components.includes(active)
  );
  const componentNames = guides.reduce(
    (acc, guide) => {
      acc.push(...guide.data.frontmatter.components);
      return [...new Set(acc)];
    },
    ['everything']
  );

  return (
    <SingleLayout mobile={mobile} router={router}>
      <Head>
        <title>Maker Protocol Developer Portal - Guides</title>
      </Head>
      <Filter
        activeGroup={active}
        onChange={setActive}
        options={componentNames}
        count={resources.length}
        mobile={mobile}
      />
      <GuideGrid title="Guides" path="guides" resources={resources} />
    </SingleLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData }) {
  const resources = await getResources(preview, previewData, 'content/resources/guides');
  const guides = resources.filter((g) => g.data.frontmatter.contentType === ContentTypes.GUIDES);

  if (preview) {
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'data/guidesPage.json',
        parse: parseJson,
      })
    ).props;

    return {
      props: {
        ...file,
        guides,
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'data/guidesPage.json',
        data: (await import('../../data/guidesPage.json')).default,
      },
      guides,
    },
  };
};

export default Page;
