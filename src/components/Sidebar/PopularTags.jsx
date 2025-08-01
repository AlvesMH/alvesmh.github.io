import React from 'react';
import PropTypes from 'prop-types';

const PopularTags = ({ tags, onClick }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Topics</h3>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onClick?.(tag)}
          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
        >
          {tag}
        </button>
      ))}
    </div>
  </div>
);

PopularTags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func
};

export default PopularTags;
