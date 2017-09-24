import React from 'react';
import PropTypes from 'prop-types';
import { FaThList } from 'react-icons/lib/fa';
import Category from '../Category/Category';
import './CategoriesList.css';

const CategoriesList = ({ categories }) => (
  <div>
    <nav className="nav">
      <span className="nav-header">
        <FaThList /> Categories
      </span>
      { categories.map(category => (
        <Category key={category.name} {...category} />
      ))}
    </nav>
  </div>
);

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CategoriesList;
