import { useCMS, usePlugins } from 'tinacms';
import slugify from 'slugify';
import { FORM_ERROR } from 'final-form';
import { MarkdownFieldPlugin } from 'react-tinacms-editor';

import { toMarkdownString } from '@utils';
import { removeInvalidChars } from '../utils/removeInvalidChars';

const useCreateDocument = (resources) => {
  const cms = useCMS();
  cms.plugins.add(MarkdownFieldPlugin);

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
            if (
              resources.some(
                (post) => post.data.frontmatter.slug === slugify(value, { lower: true })
              )
            ) {
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
          name: 'components',
          component: 'tags',
          label: 'Components',
          required: true,
          description: 'Add keywords for which parts of the Maker Protocoll this file relates to',
          validate(value, allValues, meta, field) {
            if (!value) {
              return 'Components are required';
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
        {
          name: 'body',
          label: 'Document Body',
          component: 'markdown',
        },
      ],
      onSubmit: async (form, cms) => {
        const github = cms.api.github;

        const slug = removeInvalidChars(slugify(form.title, { lower: true }));
        const fileRelativePath = `content/resources/${form.contentType}/${slug}.md`;
        const rawMarkdownBody = form.body;

        form.slug = slug;
        form.date = form.date || new Date().toString();
        // form.author = await github.getUser();
        delete form.body;

        return await github
          .commit(
            fileRelativePath,
            null,
            toMarkdownString({
              rawFrontmatter: {
                ...form,
              },
              rawMarkdownBody,
            }),
            `Created new document: ${form.title}`
          )
          .then((response) => {
            cms.alerts.success(`Document committed successfully to branch: ${github.branchName}.`);
          })
          .catch((e) => {
            cms.alerts.error('Error committing document');
            console.error(`Error committing document: ${e}`);
            return { [FORM_ERROR]: e };
          });
      },
    },
  ]);
};

export default useCreateDocument;
