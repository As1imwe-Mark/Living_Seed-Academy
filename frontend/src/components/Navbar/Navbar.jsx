import { useState } from 'react';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';
import images from '../../constants/images'
import './Navbar.scss';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className="app__navbar md:bg-transparent md:border-none text-pink-600">
     <div className="flex items-center">
        <img src={images.Badge} alt='badge' className="h-12 mr-2" />
        <h3 className="p-text font-bold">Living Seed Academy</h3>
      </div>
      <ul className="app__navbar-links">
        {['home', 'about','academics','staff', 'gallery','news', 'testimonial', 'contact'].map((item) => (
          <li className="app__flex font-semibold" key={`link-${item}`}>
            <div />
            <a href={`#${item}`}>{item}</a>
          </li>
        ))}
      </ul>

      <div className="app__navbar-menu">
        {!toggle && <HiMenuAlt4 onClick={() => setToggle(true)} />}
        
        <AnimatePresence>
          {toggle && (
            <motion.div
              className="app__navbar-menu-content"
              initial={{ x: 300 }}
              animate={{ x: 0 }}
              exit={{ x: 300 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
            >
              <HiX onClick={() => setToggle(false)} />
              <ul>
                {['home', 'about','academics','staff', 'gallery','news', 'testimonial', 'contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item}`} onClick={() => setToggle(false)}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
