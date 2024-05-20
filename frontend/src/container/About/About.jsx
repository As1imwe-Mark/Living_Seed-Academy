import { useState } from 'react';
import { motion } from 'framer-motion';
import { images } from '../../constants';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';

const About = () => {
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => {
    setReadMore(!readMore);
  };

  return (
    <>
      <h2 className="text-4xl font-bold my-8 text-center lg:text-left head-text">
        <span className="text-blue-600">About </span>Living <span className="text-blue-600">Seed</span> Academy
      </h2>

      <div className="flex flex-col lg:flex-row items-center justify-between lg:space-x-8 space-y-8 lg:space-y-0">
        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, type: 'tween' }}
          className="w-full lg:w-1/2"
        >
          <img src={images.pic5} alt="school" className="rounded-lg w-full shadow-xl" />
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, type: 'tween' }}
          className="w-full lg:w-1/2 space-y-4"
        >
        <div className={`${readMore ? 'max-h-[50vh] overflow-y-auto' : ''}`}>
        <div>
            <h2 className="text-xl font-bold my-4 text-slate-600">
              Welcome to Living Seed Academy, a nurturing environment where children are empowered to fulfill their unique calling and purpose in God.
            </h2>
            <p className="p-text">
              Founded in 2005, Living Seed Academy began its journey in Kikaya. In 2020, we relocated to our new, state-of-the-art premises in Nabuzinga, Bulaga, to better serve our growing community. As a Born-Again Christian school, we are deeply rooted in Christian values while embracing and respecting all religions and denominations.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold my-4 text-slate-600 ">Our School Motto</h2>
            <p className="p-text">“Trust God and Be Established”</p>
          </div>

          <div>
            <h2 className="text-xl font-bold my-4 text-slate-600">School Vision</h2>
            <p className="p-text">
              “Nurturing children to fulfill their unique calling/purpose in God” Psalms 139:13-14, Mark 4:1
            </p>
          </div>

          {readMore && (
            <>
              <div>
                <h2 className="text-xl font-bold my-4 text-slate-600">School Mission</h2>
                <p className="p-text">Our mission is articulated through the following commitments:</p>
                <ul className="list-disc list-inside">
                  <li className="p-text"><span className="font-semibold">Spiritual Identity:</span> We teach children their identity through the word of God, helping them to understand and know God.</li>
                  <li className="p-text"><span className="font-semibold">Holistic Growth:</span> We focus on complete growth—spiritual, character, physical, and academic excellence—by imparting biblical values and using hands-on methods.</li>
                  <li className="p-text"><span className="font-semibold">Love and Respect:</span> We love and respect all children as God's creation.</li>
                  <li className="p-text"><span className="font-semibold">Parental Support:</span> We equip parents with biblical parenting skills to enhance their parenting abilities.</li>
                  <li className="p-text"><span className="font-semibold">Talent and Potential:</span> We expose learners to diverse activities to enhance their talents and potential.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4 my-4 text-slate-600">School Logo/Badge</h2>
                <p className="p-text">Our logo is a testament to our mission and vision, embodying our core values and aspirations:</p>
                <ul className="list-disc list-inside">
                  <li className="p-text"><span className="font-semibold">Hoe:</span> Symbolizes our commitment to equipping students with technical and hands-on skills</li>
                  <li className="p-text"><span className="font-semibold">Degree Cap:</span> Represents our dedication to laying a strong academic foundation, aiming for the highest academic achievements.</li>
                  <li className="p-text"><span className="font-semibold">Book:</span> Signifies our focus on academic excellence and our intentionality in ensuring learners excel.</li>
                </ul>
              </div>

              <div>
                <p className="p-text">At Living Seed Academy, we are devoted to providing a nurturing and enriching environment that fosters the holistic development of every child, ensuring they grow into their fullest potential both academically and spiritually.</p>
              </div>
            </>
          )}
        </div>
        <button onClick={toggleReadMore} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
            {readMore ? 'Read Less' : 'Read More'}
          </button>
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'bg-white',
);
