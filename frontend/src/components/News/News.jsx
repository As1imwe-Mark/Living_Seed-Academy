import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import { AppWrap, MotionWrap } from '../../wrapper';
import client, { urlFor } from '../../client';

const News = () => {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    client.fetch('*[_type == "news"] | order(publishedAt desc)').then((data) => {
      setNews(data);
    });
  }, []);

  const handleReadMore = (article) => {
    setSelectedArticle(article);
    document.body.style.overflowY = 'hidden';
  };

  const closeModal = () => {
    setSelectedArticle(null);
    document.body.style.overflowY = 'auto';
  };

  const displayedNews = showAll ? news : news.slice(0, 3);

  return (
    <div className="container mx-auto p-4">
      <h1 className="font-bold head-text mb-4">Latest <span>News</span> At <span>School</span></h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
        {displayedNews.map((article) => (
          <div key={article._id} className="shadow-md rounded-lg overflow-hidden bg-slate-100 flex flex-col">
            <img
              src={urlFor(article.image.asset).url()}
              alt={article.title}
              className="w-full h-48 object-cover md:h-64"
            />
            <div className="p-4 flex-grow">
              <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
              <p className="text-gray-700 mb-4">{article.content.substring(0, 100)}...</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => handleReadMore(article)}
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mt-3"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? 'Show Less' : 'Show More'}
        </button>
      </div>

      {selectedArticle && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center cursor-pointer items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <div className="bg-white p-4 rounded-lg max-w-[60%] max-h-[70%] overflow-y-auto relative">
            {/* <button className="absolute bottom-10 top-2 right-1 text-xl" onClick={closeModal}>
              <MdClose />
            </button> */}
            <h2 className="text-2xl font-semibold mb-2">{selectedArticle.title}</h2>
            <p className="text-gray-700 mb-4">{selectedArticle.content}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(News, 'app__testimonial'),
  'news',
  'app__whitebg',
);
