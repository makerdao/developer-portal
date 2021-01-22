import { useGithubJsonForm } from 'react-tinacms-github';
import { getRandID } from '@utils';

const useBannerForm = (jsonFile, preview) => {
  if (!preview) {
    // if we are not in preview return the jsonfile and don't register the form
    return [jsonFile.data, null];
  }

  const bannerFormOptions = {
    label: 'Banner',
    __type: 'screen',
    fields: [
      {
        label: 'Edit the banner content',
        name: 'banner',
        component: 'group-list',
        description: 'You can edit or re-arrange the menu items.',
        itemProps: (item) => ({
          key: item.id,
          label: item.slug,
        }),
        defaultItem: () => ({
          name: 'New Banner Item',
          url: '/',
          id: getRandID(),
        }),
        fields: [
          {
            label: 'Text',
            name: 'text',
            component: 'text',
          },
          {
            label: 'URL',
            name: 'url',
            component: 'text',
          },
          {
            label: 'Link Text',
            name: 'linkText',
            component: 'text',
          },
        ],
      },
    ],
  };

  return useGithubJsonForm(jsonFile, bannerFormOptions);
};
export default useBannerForm;
