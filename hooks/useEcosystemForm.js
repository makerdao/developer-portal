import { useGithubJsonForm } from 'react-tinacms-github';
import { getRandID } from '@utils';
import { EcosystemCategories } from '../utils/constants';

const useEcosystemForm = (jsonFile, preview) => {
  if (!preview) {
    // if we are not in preview return the jsonfile and don't register the form
    return [jsonFile.data, null];
  }

  const navFormOptions = {
    label: 'Ecosystem',
    __type: 'screen',
    fields: [
      {
        label: 'Add item',
        name: 'ecosystem',
        component: 'group-list',
        description: 'You can edit or re-arrange the menu items.',
        itemProps: (item) => ({
          key: item.id,
          label: item.title,
        }),
        defaultItem: () => ({
          title: 'New Ecosystem Item',
          url: '/',
          id: getRandID(),
        }),
        fields: [
          {
            label: 'title',
            name: 'title',
            component: 'text',
            required: true,
          },
          {
            label: 'link',
            name: 'link',
            component: 'text',
            required: true,
          },
          {
            name: 'categories',
            component: 'tags',
            label: 'Tags',
            required: true,
            description: `Choose from: ${Object.keys(EcosystemCategories).join(', ')}`,
            validate(value, allValues, meta, field) {
              if (!value) return 'Category is required';
            },
          },
        ],
      },
    ],
  };

  return useGithubJsonForm(jsonFile, navFormOptions);
};
export default useEcosystemForm;
