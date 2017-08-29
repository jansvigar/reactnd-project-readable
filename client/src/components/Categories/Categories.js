import React from 'react';
import PropTypes from 'prop-types';
import { FaThList } from 'react-icons/lib/fa';
import { capitalize } from '../../utils/helpers';

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

function Categories(props) {
  return (
    <nav className="nav">
      <span className="nav-header">
        <FaThList /> Categories
      </span>
      {props.categories.map(category => (
        <a href={`/${category.path}/posts`}>
          {capitalize(category.name)}
        </a>
      ))}
    </nav>
  );
}

export default Categories;
