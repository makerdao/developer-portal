import Error from 'next/error';
import { useRouter } from 'next/router';
import { InlineForm } from 'react-tinacms-inline';
import matter from 'gray-matter';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { getGithubPreviewProps, parseMarkdown, parseJson } from 'next-tinacms-github';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { usePlugin, useCMS, useFormScreenPlugin } from 'tinacms';

import MarkdownWrapper from '@components/markdown-wrapper';
import EditLink from '@components/EditLink';
import { createToc, getGuides } from '@utils';
import { ContentTypes } from '../../utils/constants';
import useSubNavForm from '../../hooks/useSubNavForm';

import GuidesLayout from '@layouts/GuidesLayout';

const Resource = (props) => {
  const cms = useCMS();

  const formOptions = {
    label: 'Edit doc page',
    fields: [
      {
        name: 'frontmatter.title',
        label: 'Title',
        component: 'text',
      },
    ],
  };

  const [navData, navForm] = useSubNavForm(props.navFile, props.preview);
  useFormScreenPlugin(navForm);

  const [data, form] = useGithubMarkdownForm(props.file, formOptions);
  usePlugin(form);

  const moduleResources = props.resources
    ?.filter(
      (r) =>
        r.data.frontmatter.parent === props.file.data.frontmatter.parent &&
        r.data.frontmatter.contentType === ContentTypes.GUIDES
    )
    .reduce((acc, val) => {
      acc.push({
        title: val.data.frontmatter.title,
        slug: val.data.frontmatter.slug,
        root: val.data.frontmatter.root,
      });
      return acc;
    }, [])
    .sort((a, b) => (a.root ? -1 : b.root ? 1 : 0));

  return (
    <GuidesLayout
      resources={moduleResources}
      slug={props.slug}
      toc={props.Alltocs}
      resourcePath={ContentTypes.GUIDES}
    >
      <InlineForm form={form}>
        <InlineWysiwyg
          name="markdownBody"
          sticky={'calc(var(--tina-toolbar-height) + var(--tina-padding-small))'}
          imageProps={{
            directory: 'public/images/',
            parse: (filename) => '/images/' + filename,
            previewSrc(src) {
              return cms.api.github.getDownloadUrl('public/' + src);
            },
          }}
          focusRing={{ offset: { x: 35, y: 0 }, borderRadius: 0 }}
        >
          <MarkdownWrapper source={data.markdownBody} />
        </InlineWysiwyg>
      </InlineForm>
      <EditLink />
    </GuidesLayout>
  );
};

const GuidesPage = ({ file, ...props }) => {
  const router = useRouter();

  return !file ? (
    <Error statusCode={404} />
  ) : router.isFallback ? (
    <div>Loading...</div>
  ) : (
    <Resource file={file} {...props} />
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params;
  let Alltocs = '';

  const resources = await getGuides(preview, previewData, 'content/resources/guides');
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
      Alltocs = createToc(markdownFile.props.file.data.markdownBody);
    }
    return {
      props: {
        navFile: {
          ...navFile.props.file,
        },
        resources,
        Alltocs,
        previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
        ...markdownFile.props,
      },
    };
  }

  if (typeof window === 'undefined') {
    Alltocs = createToc(resource.data.markdownBody);
  }
  return {
    props: {
      navFile: {
        fileRelativePath: 'data/resourcesSubNav.json',
        data: (await import('../../data/resourcesSubNav.json')).default,
      },
      slug,
      resources,
      Alltocs,
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
  const paths = files
    .filter((file) => !file.endsWith('index.md'))
    .map((file) => {
      const content = require(`../../content/resources/guides${file.replace(contentDir, '')}`);
      const { data } = matter(content.default);

      return { params: { slug: data.slug } };
    });
  return {
    fallback: true,
    paths,
  };
};

export default GuidesPage;
