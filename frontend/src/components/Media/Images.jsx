import { useEffect, useState } from 'react';
import client from '../../client';
import imageUrlBuilder from '@sanity/image-url';

// Function to build image URLs
const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const Images = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesQuery = `*[_type == "Images"]{_id, title, "asset": image.asset->}`;
        const imagesData = await client.fetch(imagesQuery);
        setImages(imagesData);
      } catch (error) {
        console.error('Error fetching images from Sanity:', error);
      }
    };

    fetchImages();
  }, []);

  const getImageUrl = (image) => {
    try {
      return urlFor(image.asset).url();
    } catch (error) {
      console.error('Error generating image URL:', error, image);
      return null;
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Image Gallery</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          image.asset ? (
            <div key={image._id} className="border p-2">
              <img
                src={getImageUrl(image)}
                alt={image.title}
                className="w-full h-auto"
              />
              <p className="mt-2 text-center">{image.title}</p>
            </div>
          ) : (
            <div key={image._id} className="border p-2">
              <p className="text-center">Image not available</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default Images;
