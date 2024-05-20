export default {
    name: 'staff',
    title: 'Staff',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'position',
        title: 'Position',
        type: 'string',
      },
      {
        name: 'contact',
        title: 'Contact',
        type: 'string',
      },
      {
        name: 'imgUrl',
        title: 'Image URL',
        type: 'image',
        options: {
          hotspot: true,
        },
      },
      {
        name: 'socialMedia',
        title: 'Social Media Links',
        type: 'array',
        of: [
          {
            type: 'object',
            fields: [
              {
                name: 'platform',
                title: 'Platform',
                type: 'string',
                options: {
                  list: [
                    { title: 'Twitter', value: 'twitter' },
                    { title: 'Facebook', value: 'facebook' },
                    { title: 'Instagram', value: 'instagram' },
                  ],
                },
              },
              {
                name: 'url',
                title: 'URL',
                type: 'url',
              },
            ],
          },
        ],
      },
    ],
  };
  