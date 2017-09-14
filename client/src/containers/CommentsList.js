import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Comment from '../components/Comment/Comment';
import CommentForm from '../components/CommentForm/CommentForm';
import { getCommentsByPost, getIsCommentAddFormOpen } from '../redux/modules/posts';
import { saveNewComment, updateComment, toggleCommentAddForm } from '../redux/modules/comments';

class CommentsList extends Component {
  handleCommentDelete = () => {
    console.log('comment deleted');
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
        <div className="comments-list">
          {
            this.props.comments.length
              ? this.props.comments.map(comment => (
                <Comment
                  key={comment.id}
                  comment={comment}
                  onDelete={this.handleCommentDelete}
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
  saveNewComment: PropTypes.func.isRequired,
  updateComment: PropTypes.func.isRequired,
  isCommentAddFormOpen: PropTypes.bool,
  toggleCommentAddForm: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    comments: getCommentsByPost(state, ownProps.postId),
    isCommentAddFormOpen: getIsCommentAddFormOpen(state, ownProps.postId),
  };
}

export default connect(
  mapStateToProps,
  { saveNewComment, updateComment, toggleCommentAddForm },
)(CommentsList);
