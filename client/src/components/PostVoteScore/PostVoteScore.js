import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaCaretSquareODown, FaCaretSquareOUp } from 'react-icons/lib/fa';
import { votePostById, getPostVoteScore } from '../../redux/modules/posts';

class PostVoteScore extends Component {
  handleVoteUpClick = event => this.props.votePostById(this.props.postId, 'upVote', event)

  handleVoteDownClick = event => this.props.votePostById(this.props.postId, 'downVote', event)

  render() {
    const { voteScore } = this.props;
    return (
      <div className="post-score">
        <span
          role="button"
          className="vote-control-up"
          tabIndex="0"
          onClick={this.handleVoteUpClick}
        >
          <FaCaretSquareOUp />
        </span>
        <div className="vote-score"><span>{voteScore}</span></div>
        <span
          role="button"
          tabIndex="0"
          className="vote-control-down"
          onClick={this.handleVoteDownClick}
        >
          <FaCaretSquareODown />
        </span>
      </div>
    );
  }
}

PostVoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
  votePostById: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    postId: ownProps.postId,
    voteScore: getPostVoteScore(state.posts.byId, ownProps.postId),
  };
}

export default connect(mapStateToProps, { votePostById })(PostVoteScore);
