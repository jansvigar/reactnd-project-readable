import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { votePostById } from '../redux/modules/posts';
import { getPostVoteScore } from '../redux/selectors/posts';
import VoteScore from '../components/VoteScore/VoteScore';

class PostVoteScore extends Component {
  handleVoteUpClick = (event) => {
    event.stopPropagation();
    this.props.votePostById(this.props.postId, 'upVote');
  }
  handleVoteDownClick = (event) => {
    event.stopPropagation();
    this.props.votePostById(this.props.postId, 'downVote');
  };

  render() {
    const { voteScore } = this.props;
    return (
      <VoteScore
        score={voteScore}
        onVoteUp={this.handleVoteUpClick}
        onVoteDown={this.handleVoteDownClick}
      />
    );
  }
}

PostVoteScore.propTypes = {
  voteScore: PropTypes.number.isRequired,
  votePostById: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
};

function mapStateToProps(state, ownProps) {
  const postId = ownProps.postId;
  return {
    postId,
    voteScore: getPostVoteScore(state, postId),
  };
}

export default connect(mapStateToProps, { votePostById })(PostVoteScore);
