import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import PostsList from '../components/PostsList/PostsList';
import * as fromPosts from '../redux/modules/posts';
import Spinner from '../components/Spinner/Spinner';
import {
  makeGetPostsByCategory,
  getIsFetching,
  getErrorMessage,
  getShouldFetch,
} from '../redux/selectors/posts';

class PostsListContainer extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAndHandlePosts: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string,
    category: PropTypes.string.isRequired,
    handleSort: PropTypes.func.isRequired,
    shouldFetch: PropTypes.bool.isRequired,
    match: PropTypes.object,
    location: PropTypes.object,
  }

  componentDidMount() {
    if (this.props.posts.length === 0 || this.props.shouldFetch) {
      this.props.fetchAndHandlePosts(this.props.category);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category &&
      (this.props.shouldFetch || this.props.posts.length === 0)) {
      this.props.fetchAndHandlePosts(this.props.category);
    }
  }

  onRetry = () => {
    this.props.fetchAndHandlePosts(this.props.category);
  }

  render() {
    const { posts, category,
      handleSort, isFetching, errorMessage,
      match, location } = this.props;
    return (
      <div>
        {isFetching && !errorMessage
          ? <Spinner />
          : <PostsList
            posts={posts}
            category={category}
            handleSort={handleSort}
            match={match}
            location={location}
          />
        }
        {errorMessage &&
          <ErrorMessage
            error={errorMessage}
            onRetry={this.onRetry}
          />}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const category = ownProps.match.params.category || 'all';
  const getPostsByCategory = makeGetPostsByCategory();
  return {
    posts: getPostsByCategory(state, category),
    isFetching: getIsFetching(state, category),
    errorMessage: getErrorMessage(state, category),
    shouldFetch: getShouldFetch(state, category),
    category,
  };
}

export default connect(
  mapStateToProps,
  { fetchAndHandlePosts: fromPosts.fetchAndHandlePosts,
    handleSort: fromPosts.handleSort },
)(PostsListContainer);
