import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BsTwitter, BsInstagram } from 'react-icons/bs';
import { FaFacebookF } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { AppWrap, MotionWrap } from '../../wrapper';
import client,{urlFor} from '../../client';

const Staff = () => {
  const [staffData, setStaffData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const query = '*[_type == "staff"]';
      const data = await client.fetch(query);
      setStaffData(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % staffData.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, staffData.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? staffData.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % staffData.length);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div className="bg-white">
      <h2 className="head-text">
        Meet <span>Our</span> Amazing <span>Staff</span>
      </h2>

      <div
        className="relative mt-[2rem] rounded-lg flex justify-center items-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {staffData.length > 0 && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 1 }}
            className="w-[320px] md:w-[450px] shadow-xl mx-4 text-center"
          >
            <img src={urlFor(staffData[currentIndex].imgUrl).url()} alt="staff" className="w-full h-auto" />
            <div className="p-4 justify-center">
              <h2 className="bold-text text-center" style={{ marginTop: 10 }}>{staffData[currentIndex].name}</h2>
              <p className="p-text" style={{ marginTop: 10 }}>{staffData[currentIndex].position}</p>
              <p className="p-text" style={{ marginTop: 10 }}>{staffData[currentIndex].contact}</p>
            </div>
            <div className="flex space-x-5 mb-2 pl-4">
              {staffData[currentIndex].socialMedia.map((social, index) => {
                const Icon = social.platform === 'twitter' ? BsTwitter : social.platform === 'facebook' ? FaFacebookF : BsInstagram;
                return (
                  <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
                    <Icon className={`text-${social.platform === 'twitter' ? 'blue-500' : social.platform === 'facebook' ? 'blue-700' : 'pink-300'} cursor-pointer`} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
      <div className="app__testimonial-btns app__flex">
        <div className="app__flex" onClick={handlePrev}>
          <HiChevronLeft />
        </div>

        <div className="app__flex" onClick={handleNext}>
          <HiChevronRight />
        </div>
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Staff, 'app__about'),
  'staff',
  'app__whitebg',
);
