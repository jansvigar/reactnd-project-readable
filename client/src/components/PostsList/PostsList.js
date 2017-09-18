import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/lib/fa';
import Post from '../Post/Post';
import SortList from '../SortList/SortList';
import { capitalize } from '../../utils/helpers';


const PostsList = ({ posts, category, handleSort }) => (
  <div>
    <div className="subheader">
      <h2><Link to="/">All Categories</Link>{`${category !== 'all' ? ` > ${capitalize(category)}` : ''}` }</h2>
      <SortList posts={posts} category={category} handleSort={handleSort} />
    </div>
    <div className="list-posts">
      {posts && posts.map(post => (
        <Post key={post.id} {...post} />
      ))}

    </div>
    <div className="add-new-post">
      <Link to="/posts/new"><FaPlus /><span>{'Add new post'}</span></Link>
    </div>
  </div>
);

PostsList.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  category: PropTypes.string.isRequired,
  handleSort: PropTypes.func.isRequired,
};

export default PostsList;
