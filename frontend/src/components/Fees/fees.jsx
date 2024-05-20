import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import client from '../../client';
import { AppWrap, MotionWrap } from '../../wrapper';

const SchoolFees = () => {
  const [fees, setFees] = useState([]);
  const [displayedFees, setDisplayedFees] = useState(3); // Initially display 3 fees

  useEffect(() => {
    const fetchFees = async () => {
      const query = '*[_type == "fee"]{grade, amount, boarding, day}';
      const result = await client.fetch(query);
      setFees(result);
    };

    fetchFees();
  }, []);

  const handleShowMore = () => {
    setDisplayedFees(displayedFees + 1);
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h2 className="text-4xl font-bold mb-6 text-center head-text">Our<span> Fees</span> Structure</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {fees.slice(0, displayedFees).map((fee, index) => (
          <motion.div
            key={index}
            className="bg-blue-50 shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-center text-blue-800 mb-4">Class: {fee.grade}</h3>
              <div className="border-t-2 border-blue-100 pt-4">
                <p className="text-lg text-center mb-2"><span className="font-medium">Boarding Fee:</span> UGX.{fee.boarding}</p>
                <p className="text-lg text-center"><span className="font-medium">Day Fee:</span> UGX.{fee.day}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      {fees.length > displayedFees && (
        <div className="text-center mt-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleShowMore}>
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default AppWrap(
  MotionWrap(SchoolFees, 'app__testimonial'),
  'fees',
  'app__whitebg',
);
