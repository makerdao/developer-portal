import Link from 'next/link';
import Error from 'next/error';
import { useRouter } from 'next/router';
import { InlineForm, InlineTextField } from 'react-tinacms-inline';
import matter from 'gray-matter';
import { useGithubMarkdownForm } from 'react-tinacms-github';
import { getGithubPreviewProps, parseMarkdown } from 'next-tinacms-github';
import { InlineWysiwyg } from 'react-tinacms-editor';
import { jsx, Button, Flex, NavLink, Box, Link as ThemeLink, Heading, Text } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

import MarkdownWrapper from '@components/markdown-wrapper';
import { usePlugin, useCMS } from 'tinacms';
import { createToc, getBlogPosts, getGuides } from '@utils';
import useCreateBlogPage from '../../hooks/useCreateBlogPage';
import { ContentTypes } from '../../utils/constants';

import GuidesLayout from '@layouts/GuidesLayout';

const GuidesPage = (props) => {
  const cms = useCMS();
  const previewURL = props.previewURL || '';
  const router = useRouter();
  if (!props.file) {
    return <Error statusCode={404} />;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // useCreateBlogPage(props.posts);
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
        >
          <MarkdownWrapper source={data.markdownBody} />
        </InlineWysiwyg>
      </InlineForm>
      <EditLink />
    </GuidesLayout>
  );
};

export const EditLink = () => {
  const cms = useCMS();
  return (
    <Button sx={{ my: 4 }} onClick={() => cms.toggle()}>
      <Flex sx={{ alignItems: 'center' }}>
        <Icon name={'edit'} sx={{ mr: 1 }}></Icon>
        {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site With TinaCMS'}
      </Flex>
    </Button>
  );
};

/**
 * Fetch data with getStaticProps based on 'preview' mode
 */
export const getStaticProps = async function ({ preview, previewData, params }) {
  const { slug } = params;
  const fileRelativePath = `content/resources/guides/${slug}.md`;
  let Alltocs = '';

  const resources = await getGuides(preview, previewData, 'content/resources');
  if (preview) {
    const previewProps = await getGithubPreviewProps({
      ...previewData,
      fileRelativePath,
      parse: parseMarkdown,
    });
    if (typeof window === 'undefined') {
      Alltocs = createToc(previewProps.props.file.data.markdownBody);
    }
    return {
      props: {
        resources,
        Alltocs,
        previewURL: `https://raw.githubusercontent.com/${previewData.working_repo_full_name}/${previewData.head_branch}`,
        ...previewProps.props,
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
