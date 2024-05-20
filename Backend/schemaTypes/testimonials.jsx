export  default {
  name: 'testimonials',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string'
    },
    {
      name: 'title',
      title: 'title',
      type: 'string'
    },
    {
      name: 'imageurl',
      title: 'ImgURL',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'feedback',
      title: 'Feedback',
      type: 'string'
    },
  ]
}