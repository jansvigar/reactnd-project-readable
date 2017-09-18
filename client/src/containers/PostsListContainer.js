import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import PostsList from '../components/PostsList/PostsList';
import { fetchAndHandlePosts,
  getPostsByCategory,
  getIsFetching,
  getErrorMessage,
  handleSort as onSort,
} from '../redux/modules/posts';

class PostsListContainer extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchAndHandlePosts: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string,
    category: PropTypes.string.isRequired,
    handleSort: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.fetchAndHandlePosts(this.props.category);
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.fetchAndHandlePosts(this.props.category);
    }
  }

  render() {
    const { posts, category, handleSort, isFetching, error } = this.props;
    return (
      <div>
        {error && <ErrorMessage error={error} />}
        {isFetching && !error
          ? <div>Loading...</div>
          : <PostsList posts={posts} category={category} handleSort={handleSort} />
        }
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const category = ownProps.match.params.category || 'all';
  return {
    posts: getPostsByCategory(state.posts, category),
    isFetching: getIsFetching(state.posts, category),
    error: getErrorMessage(state.posts, category),
    category,
  };
}

export default connect(
  mapStateToProps,
  { fetchAndHandlePosts, handleSort: onSort },
)(PostsListContainer);
