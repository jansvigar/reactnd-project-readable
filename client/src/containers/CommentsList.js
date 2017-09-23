import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Comment from '../components/Comment/Comment';
import CommentForm from '../components/CommentForm/CommentForm';
import SortList from '../components/SortList/SortList';
import { getIsCommentAddFormOpen } from '../redux/selectors/posts';
import { getCommentsByPost } from '../redux/selectors/comments';
import {
  fetchAndHandleComments,
  saveNewComment,
  updateComment,
  toggleCommentAddForm,
  handleSort,
} from '../redux/modules/comments';

class CommentsList extends Component {
  componentDidMount() {
    if (this.props.comments.length === 0) {
      this.props.fetchAndHandleComments(this.props.postId);
    }
  }
  toggleCommentAddForm = () => {
    const postId = this.props.postId;
    this.props.toggleCommentAddForm(postId);
  }
  render() {
    return (
      <div>
        <div className="comments-list-header">
          <h3>Comments</h3>
          <button className="btn-addNewComment" onClick={this.toggleCommentAddForm}>Add New Comment</button>
        </div>
        {this.props.isCommentAddFormOpen &&
          <CommentForm
            postId={this.props.postId}
            onSaveComment={this.props.saveNewComment}
            onUpdateComment={this.props.updateComment}
            onToggleCommentAdd={this.toggleCommentAddForm}
          />}
        <SortList
          items={this.props.comments}
          handleSort={this.props.handleSort}
          parentId={this.props.postId}
        />
        <div className="comments-list">
          {
            this.props.comments.length
              ? this.props.comments.map(comment => comment && (
                <Comment
                  key={comment.id}
                  comment={comment}
                />
              ))
              : <div>{'There is no comment for this post yet'}</div>
          }
        </div>
      </div>
    );
  }
}

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  fetchAndHandleComments: PropTypes.func.isRequired,
  saveNewComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  isCommentAddFormOpen: PropTypes.bool,
  toggleCommentAddForm: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  handleSort: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    comments: getCommentsByPost(state, ownProps.postId),
    isCommentAddFormOpen: getIsCommentAddFormOpen(state, ownProps.postId),
  };
}

export default connect(
  mapStateToProps,
  { fetchAndHandleComments, saveNewComment, updateComment, toggleCommentAddForm, handleSort },
)(CommentsList);
