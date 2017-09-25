import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PostFooter from '../components/PostFooter/PostFooter';
import { getPostComments } from '../redux/selectors/posts';
import { getConfirmDeletePostModalOpen } from '../redux/selectors/ui';
import { disablePost } from '../redux/modules/posts';
import { openConfirmDeletePostModal, closeConfirmDeletePostModal } from '../redux/modules/modal';

function mapStateToProps(state, ownProps) {
  return {
    comments: getPostComments(state, ownProps.postId),
    postId: ownProps.postId,
    category: ownProps.category,
    showBody: ownProps.showBody,
    confirmDeletePostModalOpen: getConfirmDeletePostModalOpen(state),
  };
}

export default withRouter(connect(
  mapStateToProps, {
    disablePost,
    openConfirmDeletePostModal,
    closeConfirmDeletePostModal,
  })(PostFooter));
