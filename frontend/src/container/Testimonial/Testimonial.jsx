import React, { useState, useEffect } from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

import { AppWrap, MotionWrap } from '../../wrapper';
import client, { urlFor } from '../../client'; // Assuming client and urlFor are imported correctly
import './Testimonial.scss';

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [testimonials, setTestimonials] = useState([]);
  const [slideDirection, setSlideDirection] = useState('slide-in-right');

  const handleClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const query = '*[_type == "testimonials"]';
    
    client.fetch(query).then((data) => {
      setTestimonials(data);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSlideDirection('slide-in-right'); // Set slide direction to right
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [testimonials.length]);

  return (
    <>
      <h2 className='head-text mb-5'>What <span>Our</span> Parents <br className='md:none'/> <span>Say</span></h2>
      {testimonials.length > 0 && (
        <>
          <div className="app__testimonial-item app__flex" style={{ animation: `${slideDirection} 0.5s forwards` }}>
            {testimonials[currentIndex].imageurl && (
              <img src={urlFor(testimonials[currentIndex].imageurl).url()} alt={testimonials[currentIndex].name} />
            )}
            <div className="app__testimonial-content">
              <p className="p-text">{testimonials[currentIndex].feedback}</p>
              <div>
                <h4 className="bold-text">{testimonials[currentIndex].name}</h4>
                <h5 className="p-text">{testimonials[currentIndex].title}</h5>
              </div>
            </div>
          </div>

          <div className="app__testimonial-btns app__flex">
            <div className="app__flex" onClick={() => handleClick(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}>
              <HiChevronLeft />
            </div>

            <div className="app__flex" onClick={() => handleClick(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}>
              <HiChevronRight />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AppWrap(
  MotionWrap(Testimonial, 'app__testimonial'),
  'testimonial',
  'app__primarybg',
);
