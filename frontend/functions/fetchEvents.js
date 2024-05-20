import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET, 
  token: import.meta.env.VITE_APP_SANITY_TOKEN,
  apiVersion: '2023-01-08',
  useCdn: true,
});

exports.handler = async (event, context) => {
  try {
    const data = await client.fetch('*[_type == "event"] | order(date asc)');
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch data' }),
    };
  }
};
