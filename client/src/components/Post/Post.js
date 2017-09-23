import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { convertUnixTimestampToDate } from '../../utils/helpers';
import PostFooterContainer from '../../containers/PostFooterContainer';
import PostVoteScore from '../../containers/PostVoteScore';

const Post = ({
  id,
  category,
  title,
  author,
  timestamp,
  body,
  showBody,
  location,
  match,
}) => (
  <div className="post">
    <PostVoteScore postId={id} />
    <div className="post-content">
      <div className="post-categories">
        <span className="post-category">{category}</span>
      </div>
      <div className="post-title">
        <h2>
          <Link
            to={{ pathname: `/${category}/${id}`,
              state: { prevPath: location, prevMatch: match } }}
          >
            {title}
          </Link>
        </h2>
      </div>
      <div className="post-details">
        <span>{`Posted by ${author} on ${convertUnixTimestampToDate(timestamp)}`}</span>
      </div>
      { showBody && (
        <div className="post-body">
          <p>{body}</p>
        </div>)
      }
      <PostFooterContainer postId={id} category={category} />
    </div>
  </div>
);

Post.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
  showBody: PropTypes.bool,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default withRouter(Post);
