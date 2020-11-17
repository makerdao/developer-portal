import Error from 'next/error';
import { useRouter } from 'next/router';
import matter from 'gray-matter';
import { getGithubPreviewProps, parseMarkdown, parseJson } from 'next-tinacms-github';
import ResourceEditor from '@components/ResourceEditor';
import { createToc, getResources } from '@utils';
import { ContentTypes } from '../../utils/constants';

const GuidesPage = ({ file, resources, ...props }) => {
  const router = useRouter();

  const moduleResources = resources?.filter(
    (r) =>
      r.data.frontmatter.components.some((c) => file.data.frontmatter.components.includes(c)) &&
      r.data.frontmatter.contentType === ContentTypes.GUIDES
  );

  return !file ? (
    <Error statusCode={404} />
  ) : router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <ResourceEditor
      resources={moduleResources}
      file={file}
      contentType={ContentTypes.GUIDES}
      {...props}
    />
  );
};

export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params;
  let toc = '';

  const resources = await getResources(preview, previewData, 'content/resources/guides');
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
