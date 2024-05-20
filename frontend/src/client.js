import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
  projectId: '4g6nda3q',
  dataset: 'production', 
  token: 'sksvdwTx6R4GV2hbBUI2Zms3sPQ16eRFYHbWXGG4oi2vjkqaXAHpVJilJu9DP7ZYauJSrEBcRLP5VYFojJVZHRbRblRbSQR9uZxByAe2WNcemNqx07J2vY4DGgXgL0ZjQLhSpDg9jhfANRfiQEC6km0GPZhM8uDkMHFNBWjxO9cChcWRnY3G',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;
