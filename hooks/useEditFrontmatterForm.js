import { useGithubMarkdownForm } from 'react-tinacms-github';

const useEditFrontmatterForm = (mdFile, preview) => {
  if (!preview) {
    // if we are not in preview return the mdFile and don't register the form
    return [mdFile.data, null];
  }

  const navFormOptions = {
    label: 'Frontmatter',
    __type: 'screen',
    fields: [
      {
        label: 'Edit the title',
        name: 'frontmatter.title',
        component: 'text',
      },
      {
        label: 'Edit the description',
        name: 'frontmatter.description',
        component: 'text',
      },
      {
        label: 'Add tags',
        description:
          'Keywords that describe the content and allow it to be cross-referenced with other documents.',
        name: 'frontmatter.tags',
        component: 'tags',
      },
      {
        label: 'Add components',
        name: 'frontmatter.components',
        description: 'A list of the different protocol modules to which this document relates.',
        component: 'tags',
      },
      {
        label: 'Edit the contentType',
        name: 'frontmatter.contentType',
        component: 'select',
        description: 'Categorizes the resource into different sections of the site.',
        options: ['documentation', 'guides', 'security'],
      },
      {
        label: 'Edit the group',
        name: 'frontmatter.group',
        component: 'text',
      },
      {
        label: 'Edit the parent',
        name: 'frontmatter.parent',
        component: 'text',
      },
      {
        label: 'Edit the "root" property',
        name: 'frontmatter.root',
        component: 'toggle',
      },
    ],
  };

  return useGithubMarkdownForm(mdFile, navFormOptions);
};

export default useEditFrontmatterForm;
