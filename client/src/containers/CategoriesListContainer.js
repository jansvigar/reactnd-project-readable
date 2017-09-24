import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoriesList from '../components/CategoriesList/CategoriesList';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import * as fromCategories from '../redux/modules/categories';
import * as categoriesSelectors from '../redux/selectors/categories';
import Spinner from '../components/Spinner/Spinner';

class CategoriesListContainer extends Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAndHandleCategories: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
  }

  componentDidMount() {
    this.props.fetchAndHandleCategories();
  }

  onRetry = () => {
    this.props.fetchAndHandleCategories();
  }

  render() {
    const { categories, isFetching, errorMessage } = this.props;
    return (
      <div>
        {isFetching && !errorMessage
          ? <Spinner />
          : <CategoriesList categories={categories} />
        }
        {errorMessage && <ErrorMessage error={errorMessage} onRetry={this.onRetry} />}
      </div>
    );
  }
}

export default connect(
  state => ({
    categories: categoriesSelectors.getCategories(state),
    isFetching: categoriesSelectors.getIsFetching(state),
    errorMessage: categoriesSelectors.getErrorMessage(state),
  }),
  { fetchAndHandleCategories: fromCategories.fetchAndHandleCategories },
)(CategoriesListContainer);
