import React from 'react';
import PropTypes from 'prop-types';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ensureSlug, makePostPath } from '../utils/slugify';

export default function PostCard({ post, animationDelay = 0 }) {
  const p = ensureSlug(post);
  return (
    <motion.article
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: animationDelay }}
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
    >
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(p.date).toLocaleDateString()}</span>
          </div>
          <span>•</span>
          <span>{p.readTime}</span>
        </div>
        <h3 className="text-2xl font-bold mb-3">
          <Link to={makePostPath(p)} className="text-gray-900 hover:text-blue-600 transition-colors">
            {p.title}
          </Link>
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">{p.excerpt}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {(p.tags || []).map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))}
        </div>
        <Link to={makePostPath(p)} className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired,
  animationDelay: PropTypes.number
};
