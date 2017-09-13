import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { votePostById, getPostVoteScore } from '../redux/modules/posts';
import VoteScore from '../components/VoteScore/VoteScore';

class PostVoteScore extends Component {
  handleVoteUpClick = event => this.props.votePostById(this.props.postId, 'upVote', event)
  handleVoteDownClick = event => this.props.votePostById(this.props.postId, 'downVote', event)

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
  return {
    postId: ownProps.postId,
    voteScore: getPostVoteScore(state.posts.byId, ownProps.postId),
  };
}

export default connect(mapStateToProps, { votePostById })(PostVoteScore);
