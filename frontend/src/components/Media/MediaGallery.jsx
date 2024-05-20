import { useState } from 'react';
import  Pic  from './Images';
import  Videos from './Videos';
import { AppWrap, MotionWrap } from '../../wrapper';


const Gallery = () => {
  const [mediaType, setMediaType] = useState('image');

  const toggleMediaType = (type) => {
    setMediaType(type);
  };

  return (
    <div>
     <div>
      <h2 className="head-text mb-1">
        <span>Our</span> Media <span>Gallery</span>
      </h2>
      </div>
      <div className='flex space-x-3 justify-center items-center'>
        <button onClick={() => toggleMediaType('image')}  className={`${mediaType === 'image' ? 'app__work-filter-item app__flex p-text bg-blue-700 py-2 px-5 rounded-xl text-white' : 'py-2 px-5 bg-slate-500  text-white rounded-xl'}`}>Gallery</button>
        <button onClick={() => toggleMediaType('video')}  className={`${mediaType === 'video' ? 'app__work-filter-item app__flex p-text bg-blue-700 rounded-xl text-white px-5 py-2' : 'py-2 px-5 bg-slate-500  text-white rounded-xl'}`}>Videos</button>
      </div>
      <div>
        {mediaType === 'image' && (
          <Pic />
        )}
        {mediaType === 'video' && (
         <Videos />
        )}
      </div>
    </div>
  );
};

export default AppWrap(
  MotionWrap(Gallery, 'app__about'),
  'gallery',
  'app__primarybg',
);
