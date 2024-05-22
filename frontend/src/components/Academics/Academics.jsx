import { useState, useEffect } from 'react';
import client, { urlFor } from '../../client';
import Results from './Results';
import { motion } from 'framer-motion';
import {AppWrap, MotionWrap} from '../../wrapper'
import SchoolFees from '../Fees/fees'

const PupilCards = () => {
  const [pupils, setPupils] = useState([]);

  useEffect(() => {
    const fetchPupilData = async () => {
      try {
        const query = '*[_type == "pupil"]';
        const data = await client.fetch(query);
        setPupils(data);
      } catch (error) {
        console.error('Error fetching pupil data from Sanity:', error);
      }
    };

    fetchPupilData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <h1 className="head-text mb-4">Academics</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full mb-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview of Curriculum</h2>
            <p className="text-gray-800">
              Our curriculum is designed to provide students with a well-rounded education,
              focusing on both academic excellence and personal development. Key subjects
              include Mathematics, Science, Language Arts, Social Studies, and Physical Education.
              Additionally, students have access to a variety of extracurricular activities such
              as music, art, sports, and community service projects.
            </p>
          </div>
          <div>
            <Results />
          </div>
        </div>
      </div>
      <div>
      <h2 className="text-center text-2xl font-bold mb-7">Top Performers</h2>
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {pupils.map((pupil, index) => (
          <motion.div key={index} className="border rounded-lg p-4 shadow-lg"
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            {pupil.image && (
              <img
                src={urlFor(pupil.image).url()}
                alt={pupil.name}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
            )}
            <h2 className="text-xl font-semibold">{pupil.name}</h2>
            <p className="mt-2"><strong>Aggregates:</strong> {pupil.performance}</p>
            <p className="mt-2"><strong>Division:</strong> {pupil.division}</p>
          </motion.div>
        ))}
      </div>
      <div>
        <SchoolFees />
      </div>
      </div>
      
    </div>
  );
};
export default AppWrap(
  MotionWrap(PupilCards),
  'academics',
  'app__whitebg',
);

