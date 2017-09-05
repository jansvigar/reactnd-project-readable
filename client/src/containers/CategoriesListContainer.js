import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoriesList from '../components/CategoriesList/CategoriesList';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import * as fromCategories from '../redux/modules/categories';


class CategoriesListContainer extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAndHandleCategories: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.props.fetchAndHandleCategories();
  }

  render() {
    const { categories, isFetching, errorMessage } = this.props;
    return (
      <div>
        {errorMessage && <ErrorMessage error={errorMessage} />}
        {isFetching && !errorMessage
          ? <div>Loading...</div>
          : <CategoriesList categories={categories} />
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    categories: fromCategories.getCategories(state.categories),
    isFetching: fromCategories.getIsFetching(state.categories),
    errorMessage: fromCategories.getErrorMessage(state.categories),
  }),
  { fetchAndHandleCategories: fromCategories.fetchAndHandleCategories },
)(CategoriesListContainer);
