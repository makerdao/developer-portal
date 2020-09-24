import { useCMS, usePlugins } from 'tinacms';
import { useRouter } from 'next/router';
import slugify from 'slugify';
import { FORM_ERROR } from 'final-form';

import { toMarkdownString, flatDocs, getRandID } from '@utils';
import { removeInvalidChars } from '../utils/removeInvalidChars';

const useCreateDocument = (resources, module) => {
  const router = useRouter();
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
            if (resources.some((post) => post.fileName === slugify(value, { lower: true }))) {
              return 'Sorry the document title must be unique';
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
          description: 'Tags for this file',
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Tags are required';
            }
          },
        },
        {
          component: 'select',
          name: 'contentType',
          label: 'Content Type',
          description: 'Select the content type for this resource.',
          options: ['documentation', 'guides'],
          required: true,
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
        const fileRelativePath = `content/resources/${frontMatter.contentType}/${slug}.md`;
        frontMatter.date = frontMatter.date || new Date().toString();
        frontMatter.slug = slug;
        frontMatter.parent = module;
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
            // After creating the document with frontmatter, redirect to the new URL.
            // Since we're still in preview mode, the document is pulled from github and can now be edited.
            setTimeout(() => router.push(`/${frontMatter.contentType}/${slug}`), 1500);
          })
          .catch((e) => {
            return { [FORM_ERROR]: e };
          });
      },
    },
  ]);
};

export default useCreateDocument;
