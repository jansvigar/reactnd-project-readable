import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { capitalize } from '../../utils/helpers';

const Category = ({ name, path }) => (
  <NavLink activeClassName="active" to={`/${path}`}>
    {capitalize(name)}
  </NavLink>
);

Category.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Category;
