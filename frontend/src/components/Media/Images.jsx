import { useEffect, useState } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import client, { urlFor } from '../../client';

const Pic = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setIsLoading(true);
        const data = await client.fetch('*[_type == "Images"]');
        setImages(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image data:', error);
        setIsLoading(false);
      }
    };

    fetchImageData();
  }, []);

  const handleClick = (item) => {
    setSelectedImage(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 6, images.length - 6));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 6, 0));
  };

  const getImageUrl = (image) => {
    try {
      return urlFor(image).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return '';
    }
  };

  return (
    <>
      <div className="mt-8">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center p-4 space-y-4 md:space-y-0 md:space-x-4">
            {images.slice(currentIndex, currentIndex + 6).map((image, index) => (
              <div
                key={index}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 relative cursor-pointer bg-white p-1 rounded-lg overflow-hidden mb-5"
                onClick={() => handleClick(image)}
              >
                <div className="shadow-lg overflow-hidden">
                  <img 
                    src={getImageUrl(image.image)} 
                    alt={image.title} 
                    className="w-full h-72 object-cover rounded-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && selectedImage && (
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="bg-black bg-opacity-50 fixed inset-0 cursor-pointer" onClick={closeModal}></div>
            <div className="relative bg-opacity-85 p-4 md:w-[70%] w-full shadow-xl">
              <img src={getImageUrl(selectedImage.image)} alt={selectedImage.title} className="w-full h-auto" />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="flex justify-center items-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          <HiChevronLeft className="text-xl" />
        </button>
        <button
          className="flex justify-center items-center p-2 rounded-full bg-gray-200 hover:bg-gray-300"
          onClick={handleNext}
          disabled={currentIndex >= images.length - 6}
        >
          <HiChevronRight className="text-xl" />
        </button>
      </div>
    </>
  );
};

export default Pic;
