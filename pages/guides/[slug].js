import { useEffect, useState } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useBreakpointIndex } from '@theme-ui/match-media';
import matter from 'gray-matter';
import { useFormScreenPlugin } from 'tinacms';
import { getGithubPreviewProps, parseMarkdown, parseJson } from 'next-tinacms-github';
import useSubNavForm from '@hooks/useSubNavForm';
import ResourcesLayout from '@layouts/ResourcesLayout';
import SidebarGuides from '@components/SidebarGuides';
import ResourcePresentation from '@components/ResourcePresentation';
import { createToc, getResources } from '@utils';
import { ContentTypes } from '@utils/constants';

const GuidesPage = ({ file, resources, navFile, sharedContentfile, preview, slug, toc }) => {
  const [navData, navForm] = useSubNavForm(navFile, preview);
  useFormScreenPlugin(navForm);
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  const moduleResources = resources?.filter(
    (r) =>
      r.data.frontmatter.components?.some((c) => file.data.frontmatter.components.includes(c)) &&
      r.data.frontmatter.contentType === ContentTypes.GUIDES
  );

  const relatedDocs = resources?.filter(
    (r) =>
      r.data.frontmatter.components?.some((c) => file.data.frontmatter.components.includes(c)) &&
      r.data.frontmatter.contentType === ContentTypes.DOCUMENTATION
  );

  const title = file?.data?.frontmatter?.title;

  return !file ? (
    <Error statusCode={404} />
  ) : router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <ResourcesLayout
      resourcePath={ContentTypes.GUIDES}
      slug={slug}
      toc={toc}
      mobile={mobile}
      router={router}
      navData={navData}
      sidebar={
        <SidebarGuides
          resources={moduleResources}
          resourcePath={ContentTypes.GUIDES}
          activeSlug={slug}
        />
      }
    >
      <Head>
        <title>{title || 'Maker Protocol Developer Portal'}</title>
      </Head>
      <ResourcePresentation
        file={file}
        relatedResources={relatedDocs}
        contentType={ContentTypes.GUIDES}
        preview={preview}
        mobile={mobile}
        sharedContentfile={sharedContentfile}
      />
    </ResourcesLayout>
  );
};

export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params;
  let toc = '';

  const resources = await getResources(preview, previewData, 'content/resources');
  const resource = resources.find((r) => r.data.frontmatter.slug === slug);
  const fileRelativePath = resource.fileRelativePath;

  if (preview) {
    const sharedContentfile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/sharedL3Content.json',
      parse: parseJson,
    });

    const navFile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath: 'data/resourcesSubNav.json',
      parse: parseJson,
    });

    const markdownFile = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    });
    if (typeof window === 'undefined') {
      toc = createToc(markdownFile.props.file.data.markdownBody);
    }

    // Merge in the additional frontmatter props that aren't hardcoded into the doc
    markdownFile.props.file.data.frontmatter = {
      ...resource.data.frontmatter,
      ...markdownFile.props.file.data.frontmatter,
    };
    return {
      props: {
        sharedContentfile: { ...sharedContentfile.props.file },
        navFile: {
          ...navFile.props.file,
        },
        resources,
        toc,
        previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
        ...markdownFile.props,
      },
    };
  }

  if (typeof window === 'undefined') {
    toc = createToc(resource.data.markdownBody);
  }
  return {
    props: {
      sharedContentfile: {
        fileRelativePath: 'data/sharedL3Content.json',
        data: (await import('../../data/sharedL3Content.json')).default,
      },
      navFile: {
        fileRelativePath: 'data/resourcesSubNav.json',
        data: (await import('../../data/resourcesSubNav.json')).default,
      },
      slug,
      resources,
      toc,
      sourceProvider: null,
      error: null,
      preview: false,
      // the markdown file
      file: {
        fileRelativePath: resource.fileRelativePath,
        data: {
          frontmatter: resource.data.frontmatter,
          markdownBody: resource.data.markdownBody,
        },
      },
    },
  };
};

export const getStaticPaths = async function () {
  const fg = require('fast-glob');
  const contentDir = 'content/resources/guides';
  const files = await fg(`${contentDir}/**/*.md`);

  const paths = files.reduce((acc, file) => {
    const content = require(`../../content/resources/guides${file.replace(contentDir, '')}`);
    const { data } = matter(content.default);
    if (data.slug) acc.push({ params: { slug: data.slug } });
    return acc;
  }, []);

  return {
    fallback: true,
    paths,
  };
};

export default GuidesPage;
