// schemas/pic.js

export default {
    name: 'Images',
    type: 'document',
    title: 'Images',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Title',
      },
      {
        name: 'description',
        type: 'text',
        title: 'Description',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Image',
        options: {
          hotspot: true,
        },
      },
    ],
  };
  