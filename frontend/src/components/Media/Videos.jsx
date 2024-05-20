import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import client from '../../client';

const Videos = () => {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  // Fetch video data from Sanity.io
  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const data = await client.fetch('*[_type == "video"]{title, description, "url": videoFile.asset->url}');
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    let interval;
    if (!isPaused && videos.length > 0) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isPaused, videos.length]);

  useEffect(() => {
    const handlePlay = () => setIsPaused(true);
    const handlePause = () => setIsPaused(false);

    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('play', handlePlay);
        videoElement.removeEventListener('pause', handlePause);
      }
    };
  }, [currentIndex]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length);
  };

  const renderVideo = () => {
    const video = videos[currentIndex];

    return (
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col items-center m-4 cursor-pointer rounded-lg shadow-lg overflow-hidden max-h-[400px]"
      >
        <video
          className="w-full h-auto rounded-t-lg"
          controls
          ref={videoRef}
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="p-4 bg-white rounded-b-lg w-full flex flex-col justify-between">
          <h2 className="font-bold mb-2 text-lg">{video.title}</h2>
          <p className="text-sm">{video.description}</p>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative mt-2 rounded-lg flex flex-col items-center w-full min-h-[600px]">
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <p>Loading videos...</p>
        </div>
      ) : (
        <>
          <div
            className="flex justify-center items-center w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence>{renderVideo()}</AnimatePresence>
          </div>
          <div className="app__testimonial-btns app__flex justify-center mt-4">
            <button
              className="flex justify-center items-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 mx-2"
              onClick={handlePrev}
              disabled={isPaused}
            >
              <HiChevronLeft className="cursor-pointer text-xl" />
            </button>
            <button
              className="flex justify-center items-center p-2 rounded-full bg-gray-200 hover:bg-gray-300 mx-2"
              onClick={handleNext}
              disabled={isPaused}
            >
              <HiChevronRight className="cursor-pointer text-xl" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Videos;
