import React from 'react';
import PropTypes from 'prop-types';
import { FaCaretSquareODown, FaCaretSquareOUp } from 'react-icons/lib/fa';
import './VoteScore.css';

const VoteScore = (props) => {
  const { score, onVoteUp, onVoteDown } = props;
  return (
    <div className="vote-score-wrapper">
      <span
        role="button"
        className="vote-control-up"
        tabIndex="0"
        onClick={onVoteUp}
      >
        <FaCaretSquareOUp />
      </span>
      <div className={`vote-score ${score < 0 ? 'negative' : 'positive'}`}><span>{score}</span></div>
      <span
        role="button"
        tabIndex="0"
        className="vote-control-down"
        onClick={onVoteDown}
      >
        <FaCaretSquareODown />
      </span>
    </div>
  );
};

VoteScore.propTypes = {
  score: PropTypes.number.isRequired,
  onVoteUp: PropTypes.func.isRequired,
  onVoteDown: PropTypes.func.isRequired,
};

export default VoteScore;
