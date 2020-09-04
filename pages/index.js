import { getGithubPreviewProps, parseJson } from 'next-tinacms-github';
import { useGithubJsonForm } from 'react-tinacms-github';
import Router from 'next/router';
import SingleLayout from '../layouts/SingleLayout.js';
import GuideList from '../components/GuideList';
import { Container, jsx, Card, Heading, Text, Grid, Box, Flex } from 'theme-ui';
import { createToc, getGuides } from '@utils';
import { usePlugin } from 'tinacms';
import getGlobalStaticProps from '../utils/getGlobalStaticProps';
import { useGlobalStyleForm } from '@hooks';
import { default as featGuides } from '../data/featuredGuides.json';

const Page = ({ file, preview, styleFile, guides }) => {
  const initialGuides = guides.filter((g) => {
    const idx = featGuides.indexOf(g.data.frontmatter.slug);
    if (idx !== -1) return g.data.frontmatter.slug === featGuides[idx];
  });

  const formOptions = {
    label: 'home page',
    fields: [
      {
        name: 'title',
        component: 'text',
      },
    ],
  };
  const [data, form] = useGithubJsonForm(file, formOptions);
  usePlugin(form);

  const [styleData, styleForm] = useGlobalStyleForm(styleFile, preview);

  return (
    <SingleLayout>
      <GuideList guides={initialGuides} />
    </SingleLayout>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData }) {
  const global = await getGlobalStaticProps(preview, previewData);

  const guides = await getGuides(preview, previewData, 'content/resources');

  if (preview) {
    // get data from github
    const file = (
      await getGithubPreviewProps({
        ...previewData,
        fileRelativePath: 'content/home.json',
        parse: parseJson,
      })
    ).props;

    return {
      props: {
        ...file,
        ...global,
      },
    };
  }
  return {
    props: {
      sourceProvider: null,
      error: null,
      preview: false,
      file: {
        fileRelativePath: 'content/home.json',
        data: (await import('../content/home.json')).default,
      },
      guides,
      ...global,
    },
  };
};

export default Page;
