import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import images from '../../constants/images';
import './Header.scss';

const Bg = [
  images.pic10, images.pic13, images.pic4, images.pic5, images.pic7,images.pic11
];

const texts = [
  "Welcome to Living Seed Academy, Our mission is to provide a holistic education that fosters spiritual growth, academic excellence, and character development.",
];

const preloadImages = (imageArray) => {
  imageArray.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
};

const Header = () => {
  const [bgIndex, setBgIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    preloadImages(Bg);

    const interval = setInterval(() => {
      setBgIndex(prevIndex => (prevIndex + 1) % Bg.length);
      setTextIndex(prevIndex => (prevIndex + 1) % texts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id='home' className="relative flex items-center justify-center w-full min-h-screen">
      <AnimatePresence>
        <motion.div
          key={bgIndex}
          className="absolute inset-0 bg-cover bg-center w-full h-full"
          style={{ backgroundImage: `url(${Bg[bgIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1}}
        >
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </motion.div>
      </AnimatePresence>

      <div className="flex relative  z-2 flex-col items-center justify-center text-center">
      <div className="flex items-center gap-1 justify-center">
        <div className="md:w-56 w-24 shadow-md">
        <img src={images.Badge} alt='School badge' className="w-full object-cover inline-block" />
         </div>
          <div>
            <motion.h1 
            animate={{ y: [0, -10, 0], transition: { duration: 1, repeat: Infinity } }}
            className="md:text-7xl font-extrabold text-white text-xl">LIVING <span className='text-pink-400'> SEED </span>ACADEMY</motion.h1>
            </div>
              </div>

              <p className="md:text-3xl font-semibold text-center mt-1 mb-6 md:max-w-[60%] text-pink-300"> <TypeAnimation
                sequence={[texts[textIndex], 7000]}
                wrapper="span"
                cursor={true}
                repeat={Infinity}
                style={{ display: 'inline-block' }}
              /></p>
              
              <div className="flex items-center justify-center gap-2">
                <a href='#about' className="px-6 font-semibold hover:text-white py-2 bg-blue-700 hover:bg-blue-500 text-slate-300 rounded-xl">About Us</a>
                <a href='#contact' className="px-5 font-semibold py-2 hover:text-white bg-blue-700 hover:bg-blue-500 text-slate-300 rounded-xl">Contact Us</a>
              </div>
              </div>
     
    </div>
  );
};

export default Header
