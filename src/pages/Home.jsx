import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import OurProducts from '../components/OurProducts';
import BestSeller from '../components/BestSeller';
import LoadingSpinner from '../components/LoadingSpinner'; // Import the spinner
import { motion } from 'framer-motion';

const Home = ({ language = 'en' }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={fadeIn}>
      {loading ? (
        <LoadingSpinner language={language} />
      ) : (
        <>
          <motion.div variants={fadeIn}>
            <Banner language={language} />
          </motion.div>
          <motion.div variants={fadeIn}>
            <OurProducts language={language} />
          </motion.div>
          <motion.div variants={fadeIn}>
            <BestSeller language={language} />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Home;