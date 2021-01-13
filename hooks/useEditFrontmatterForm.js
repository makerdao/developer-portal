import { useGithubMarkdownForm } from 'react-tinacms-github';

const useSubNavForm = (mdFile, preview) => {
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
        itemProps: (item) => ({
          key: item.slug,
          label: item.slug,
        }),
      },
      {
        label: 'Edit the description',
        name: 'frontmatter.description',
        component: 'text',
        itemProps: (item) => ({
          key: item.slug,
          label: item.slug,
        }),
      },
      {
        label: 'Edit the tags',
        name: 'frontmatter.tags',
        component: 'tags',
        itemProps: (item) => ({
          key: item.slug,
          label: item.slug,
        }),
      },
      {
        label: 'Edit the components',
        name: 'frontmatter.components',
        component: 'tags',
        itemProps: (item) => ({
          key: item.slug,
          label: item.slug,
        }),
      },
      {
        label: 'Edit the contentType',
        name: 'frontmatter.contentType',
        component: 'select',
        options: ['documentation', 'guides'],
        itemProps: (item) => ({
          key: item.slug,
          label: item.slug,
        }),
      },
    ],
  };

  return useGithubMarkdownForm(mdFile, navFormOptions);
};

export default useSubNavForm;
