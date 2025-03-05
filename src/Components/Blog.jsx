import { color, motion } from 'framer-motion';
import React from 'react';

const Blog = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <h1 className="gradient-text animated-text" style={{color: '#8892b0'}}>Coming Soon ...</h1>
    </motion.div>
  );
};

export default Blog;