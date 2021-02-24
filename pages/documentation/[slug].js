import { useEffect, useState } from 'react';
import Error from 'next/error';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useBreakpointIndex } from '@theme-ui/match-media';
import matter from 'gray-matter';
import { getGithubPreviewProps, parseMarkdown, parseJson } from 'next-tinacms-github';
import ResourcesLayout from '@layouts/ResourcesLayout';
import SidebarDocumentation from '@components/SidebarDocumentation';
import ResourcePresentation from '@components/ResourcePresentation';
import { createToc, getResources } from '@utils';
import useStore from '@stores/store';
import { ContentTypes } from '@utils/constants';

const walk = (resources, array) => {
  array.forEach((item) => {
    const children = resources.filter(
      (resource) => resource.data.frontmatter.parent === item.data.frontmatter.slug
    );
    if (children.length > 0) {
      item.children = children;
      walk(resources, item.children);
    }
  });
};

const DocsPage = ({ file, resources, navFile, preview, slug, toc }) => {
  const router = useRouter();
  const [mobile, setMobile] = useState(false);
  const bpi = useBreakpointIndex({ defaultIndex: 2 });

  const [setActiveGroup, setActiveParent] = useStore((state) => [
    state.setActiveGroup,
    state.setActiveParent,
  ]);

  useEffect(() => {
    setMobile(bpi < 2);
  }, [bpi]);

  useEffect(() => {
    setActiveGroup(file?.data.frontmatter.group);
    setActiveParent(file?.data.frontmatter.parent);
    return () => setActiveGroup(null) || setActiveParent(null);
  }, [setActiveGroup, setActiveParent, file]);

  const moduleResources = resources
    ?.filter(
      (r) =>
        r.data.frontmatter.group === file.data.frontmatter.group &&
        r.data.frontmatter.contentType === ContentTypes.DOCUMENTATION
    )
    .reduce((acc, val, i, array) => {
      const isTopLevel = val.data.frontmatter.root && !val.data.frontmatter.parent;

      if (isTopLevel) {
        const dataObj = [val];
        walk(array, dataObj);
        acc.push(dataObj);
      }
      return acc;
    }, []);

  const relatedGuides = resources?.filter(
    (r) =>
      r.data.frontmatter.components?.some((c) => file.data.frontmatter.components.includes(c)) &&
      r.data.frontmatter.contentType === ContentTypes.GUIDES
  );

  const title = file?.data?.frontmatter?.title;

  return !file ? (
    <Error statusCode={404} />
  ) : router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <ResourcesLayout
      resourcePath={ContentTypes.DOCUMENTATION}
      sidebar={
        <SidebarDocumentation
          resources={moduleResources}
          resourcePath={ContentTypes.DOCUMENTATION}
          activeSlug={slug}
          mobile={mobile}
          router={router}
        />
      }
      slug={slug}
      toc={toc}
      navFile={navFile}
      mobile={mobile}
      router={router}
    >
      <Head>
        <title>{title || 'Maker Protocol Developer Portal'}</title>
      </Head>
      <ResourcePresentation
        file={file}
        resources={resources}
        relatedResources={relatedGuides}
        contentType={ContentTypes.DOCUMENTATION}
        navFile={navFile}
        preview={preview}
        mobile={mobile}
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
  const contentDir = 'content/resources/documentation';
  const files = await fg(`${contentDir}/**/*.md`);

  const paths = files.reduce((acc, file) => {
    const content = require(`../../content/resources/documentation${file.replace(contentDir, '')}`);
    const { data } = matter(content.default);
    if (data.slug) acc.push({ params: { slug: data.slug } });
    return acc;
  }, []);

  return {
    fallback: true,
    paths,
  };
};

export default DocsPage;
