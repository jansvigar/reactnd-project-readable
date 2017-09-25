import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/lib/fa';
import Post from '../Post/Post';
import SortList from '../SortList/SortList';
import { capitalize } from '../../utils/helpers';
import './PostsList.css';

const PostsList = ({ posts, category, handleSort, location, match }) => (
  <div>
    <div className="subheader">
      <h2><Link to="/">All Categories</Link>{`${category !== 'all' ? ` > ${capitalize(category)}` : ''}` }</h2>
      <SortList items={posts} parentId={category} handleSort={handleSort} />
    </div>
    <div className="list-posts">
      {posts.length > 0 ? posts.map(post => (
        <Post key={post.id} {...post} />
      ))
        : <p>There are no posts to display</p>}

    </div>
    <div className="add-new-post">
      <Link to={{ pathname: '/posts/new', state: { prevPath: location, prevMatch: match } }}>
        <FaPlus />
        <span>{'Add new post'}</span>
      </Link>
    </div>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default PostsList;
