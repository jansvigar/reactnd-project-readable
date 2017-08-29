import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Categories from '../components/Categories/Categories';
import { fetchAndHandleCategories } from '../redux/modules/categories';

class CategoriesContainer extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    fetchAndHandleCategories: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.fetchAndHandleCategories();
  }

  render() {
    return (
      <Categories categories={this.props.categories} />
    );
  }
}

export default connect(
  ({ categories }) => ({
    categories: categories.all,
  }),
  dispatch => ({
    fetchAndHandleCategories: () => dispatch(fetchAndHandleCategories()),
  }),
)(CategoriesContainer);
