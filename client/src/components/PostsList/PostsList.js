import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/lib/fa';
import Post from '../Post/Post';
import { capitalize } from '../../utils/helpers';

const PostsList = ({ posts, category }) => (
  <div>
    <div className="subheader">
      <h2><Link to="/">All Categories</Link>{`${category !== 'all' ? ` > ${capitalize(category)}` : ''}` }</h2>
      <select className="sort-posts">
        <option>Score: Highest to lowest</option>
        <option>Score: Lowest to highest</option>
        <option>Posted Date: Newest to oldest</option>
        <option>Posted Date: Oldest to newest</option>
      </select>
    </div>
    <div className="list-posts">
      {posts.map(post => (
        <Post key={post.id} {...post} />
      ))}

    </div>
    <div className="add-new-post">
      <button><FaPlus /> <span>Add new post</span></button>
    </div>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
};

export default PostsList;
