import { useGithubJsonForm } from 'react-tinacms-github';
import { getRandID } from '@utils';

const useFeaturedGuidesForm = (jsonFile, preview) => {
  if (!preview) {
    // if we are not in preview return the jsonfile and don't register the form
    return [jsonFile.data, null];
  }

  const bannerFormOptions = {
    label: 'Featured Guides',
    __type: 'screen',
    fields: [
      {
        label: 'Edit the featured guides list',
        name: 'featuredGuides',
        component: 'list',
        description: 'You can edit or re-arrange the menu items.',
        itemProps: (item) => ({
          key: item.id,
          label: item.slug,
        }),
        defaultItem: () => ({
          name: 'New Featured Guide',
          url: '/',
          id: getRandID(),
        }),
        field: {
          component: 'text',
        },
      },
    ],
  };

  return useGithubJsonForm(jsonFile, bannerFormOptions);
};
export default useFeaturedGuidesForm;
