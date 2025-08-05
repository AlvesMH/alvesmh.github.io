import React from 'react';
import PropTypes from 'prop-types';

const CategoryFilter = ({ categories, selected, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((cat) => {
      const isActive = selected === cat.id;
      return (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
            isActive
              ? 'bg-blue-600 text-white shadow'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
          }`}
        >
          {cat.name} ({cat.count})
        </button>
      );
    })}
  </div>
);

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      count: PropTypes.number
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default CategoryFilter;
