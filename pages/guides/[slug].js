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

const GuidesPage = (props) => {
  const cms = useCMS();
  const router = useRouter();
  if (!props.file) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params;
  const fileRelativePath = `content/resources/guides/${slug}.md`;
  let Alltocs = '';

  const resources = await getGuides(preview, previewData, 'content/resources/guides');
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

  const content = await import(`../../content/resources/guides/${slug}.md`);
  const data = matter(content.default);

  if (typeof window === 'undefined') {
    Alltocs = createToc(data.content);
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
        fileRelativePath,
        data: {
          frontmatter: data.data,
          markdownBody: data.content,
        },
      },
    },
  };
};

export const getStaticPaths = async function () {
  const fg = require('fast-glob');
  const contentDir = 'content/resources/guides';
  const files = await fg(`${contentDir}/*.md`);
  const paths = files
    .filter((file) => !file.endsWith('index.md'))
    .map((file) => {
      const path = file.substring(contentDir.length + 1, file.length - 3);
      return { params: { slug: path } };
    });
  return {
    fallback: true,
    paths,
  };
};

export default GuidesPage;
