import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import PostCard from './PostCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const PostsGrid = ({ posts }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    className="grid gap-8"
  >
    {posts.map((post, idx) => (
      <PostCard key={post.id} post={post} animationDelay={idx * 0.05} />
    ))}
  </motion.div>
);

PostsGrid.propTypes = {
  posts: PropTypes.array.isRequired
};

export default PostsGrid;
