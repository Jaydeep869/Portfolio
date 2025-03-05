import { motion } from 'framer-motion';
import React from 'react';

const Navbar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container"
    >
      <h1>Your Content Navbar</h1>
      {/* Component content */}
    </motion.div>
  );
};

export default Navbar;