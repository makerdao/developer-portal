import { useCMS, usePlugins } from 'tinacms';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { FORM_ERROR } from 'final-form';

import { toMarkdownString, flatDocs, getRandID } from '@utils';
import { removeInvalidChars } from '../utils/removeInvalidChars';

const useCreateBlogPage = (allBlogs) => {
  // const router = useRouter();
  const cms = useCMS();
  usePlugins([
    {
      __type: 'content-creator',
      name: 'Add a new resource',
      fields: [
        {
          name: 'title',
          label: 'Title',
          component: 'text',
          required: true,
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'A title is required';
            }
            if (allBlogs.some((post) => post.fileName === slugify(value, { lower: true }))) {
              return 'Sorry the blog title must be unique';
            }
          },
        },
        {
          name: 'description',
          label: 'Description',
          component: 'text',
          required: false,
        },
        {
          name: 'tags',
          component: 'tags',
          label: 'Tags',
          required: true,
          description: 'Tags for this post',
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Tags are required';
            }
          },
        },
        {
          name: 'parent',
          label: 'Parent Module',
          component: 'text',
          required: false,
        },
        {
          component: 'select',
          name: 'contentType',
          label: 'Content Type',
          description: 'Select the content type for this resource.',
          options: ['documentation', 'guide'],
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Content type is required';
            }
          },
        },
      ],
      onSubmit: async (frontMatter) => {
        const github = cms.api.github;
        const slug = removeInvalidChars(slugify(frontMatter.title, { lower: true }));
        const fileRelativePath = `content/resources/documentation/${slug}.md`;
        frontMatter.date = frontMatter.date || new Date().toString();
        frontMatter.slug = slug;
        return await github
          .commit(
            fileRelativePath,
            null,
            toMarkdownString({
              fileRelativePath,
              rawFrontmatter: {
                ...frontMatter,
              },
            }),
            `Created new document: ${frontMatter.title}`
          )
          .then((response) => {
            // setTimeout(() => router.push(`/documentation/${slug}`), 1500);
            console.log(`resource created with slug ${slug}`);
          })
          .catch((e) => {
            return { [FORM_ERROR]: e };
          });
      },
    },
  ]);
};

export default useCreateBlogPage;
