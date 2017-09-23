import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostFooter from '../components/PostFooter/PostFooter';
import { getPostComments } from '../redux/selectors/posts';
import { disablePost } from '../redux/modules/posts';

function mapStateToProps(state, ownProps) {
  return {
    comments: getPostComments(state, ownProps.postId),
    postId: ownProps.postId,
    category: ownProps.category,
  };
}

export default withRouter(connect(
  mapStateToProps, {
    disablePost,
  })(PostFooter));
