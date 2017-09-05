import React from 'react';
import PropTypes from 'prop-types';

const Sidebar = props => (
  <div className="sidebar">
    {props.children}
  </div>
);

Sidebar.propTypes = {
  children: PropTypes.element,
};

export default Sidebar;
