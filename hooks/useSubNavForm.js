import { useGithubJsonForm } from 'react-tinacms-github';
import { getRandID } from '@utils';

const useSubNavForm = (jsonFile, preview) => {
  if (!preview) {
    // if we are not in preview return the jsonfile and don't register the form
    return [jsonFile?.data, null];
  }

  const navFormOptions = {
    label: 'Sub-Navigation',
    __type: 'screen',
    fields: [
      {
        label: 'Edit the subnavigation menu',
        name: 'navItems',
        component: 'group-list',
        description: 'You can edit or re-arrange the menu items.',
        itemProps: (item) => ({
          key: item.id,
          label: item.name,
        }),
        defaultItem: () => ({
          name: 'New SubNav Item',
          url: '/',
          id: getRandID(),
        }),
        fields: [
          {
            label: 'name',
            name: 'name',
            component: 'text',
          },
          {
            label: 'url',
            name: 'url',
            component: 'text',
          },
        ],
      },
    ],
  };

  return useGithubJsonForm(jsonFile, navFormOptions);
};
export default useSubNavForm;
