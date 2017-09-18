import React from 'react';
import PropTypes from 'prop-types';

const SortList = (props) => {
  const onSort = (event) => {
    props.handleSort(props.posts, props.category, event.target.value);
  };
  return (
    <select className="sort-list" onChange={onSort}>
      <option value="score_desc">Score: Highest to lowest</option>
      <option value="score_asc">Score: Lowest to highest</option>
      <option value="timestamp_desc">Posted Date: Newest to oldest</option>
      <option value="timestamp_asc">Posted Date: Oldest to newest</option>
    </select>
  );
};

SortList.propTypes = {
  handleSort: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
};

export default SortList;
