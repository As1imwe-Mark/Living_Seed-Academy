export default {
  name: 'video',
  type: 'document',
  title: 'Video',
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
      name: 'videoFile',
      type: 'file',
      title: 'Video File',
      description: 'Upload the video file here',
      options: {
        accept: 'video/*',
      },
    },
  ],
};
