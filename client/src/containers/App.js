import React from 'react';
import { FaCaretSquareODown, FaCaretSquareOUp, FaCommentingO, FaPlus, FaEdit, FaTimesCircle } from 'react-icons/lib/fa';
import './App.css';
import CategoriesContainer from './CategoriesContainer';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Readable</h1>
      </header>
      <div className="app-container">
        <div className="sidebar">
          <CategoriesContainer />
        </div>
        <div className="inner-container">
          <div className="subheader">
            <h2>All Categories</h2>
            <select className="sort-posts">
              <option>Score: Highest to lowest</option>
              <option>Score: Lowest to highest</option>
              <option>Posted Date: Newest to oldest</option>
              <option>Posted Date: Oldest to newest</option>
            </select>
          </div>
          <div className="list-posts">
            <div className="post">
              <div className="post-score">
                <span className="vote-control-up">
                  <FaCaretSquareOUp />
                </span>
                <div className="vote-score"><span>{'1.8k'}</span></div>
                <span className="vote-control-down">
                  <FaCaretSquareODown />
                </span>
              </div>
              <div className="post-content">
                <div className="post-categories">
                  <span className="post-category">React</span>
                  <span className="post-category">Udacity</span>
                </div>
                <div className="post-title">
                  <h2>Udacity is the best place to learn React</h2>
                </div>
                <div className="post-details">
                  <span>{'Posted by thingtwo on 08/24/2017 at 9:27PM'}</span>
                </div>
                <div className="post-footer">
                  <FaCommentingO />
                  <span className="post-comments-count"><a href="">{'2 comments'}</a></span>
                  <span className="post-edit-link"><FaEdit /><a href="">{'Edit'}</a></span>
                  <span className="post-delete-link"><FaTimesCircle /><a href="">{'Delete'}</a></span>
                </div>
              </div>
            </div>
            <div className="post">
              <div className="post-score">
                <span className="vote-control-up">
                  <FaCaretSquareOUp />
                </span>
                <div className="vote-score"><span>{'900'}</span></div>
                <span className="vote-control-down">
                  <FaCaretSquareODown />
                </span>
              </div>
              <div className="post-content">
                <div className="post-categories">
                  <span className="post-category">Redux</span>
                </div>
                <div className="post-title">
                  <h2>{'Learn Redux in 10 minutes!'}</h2>
                </div>
                <div className="post-details">
                  <span>{'Posted by thingone on 08/24/2017 at 5:00PM'}</span>
                </div>
                <div className="post-footer">
                  <span className="post-comments-count"><FaCommentingO /><a href="">{'4 comments'}</a></span>
                  <span className="post-edit-link"><FaEdit /><a href="">{'Edit'}</a></span>
                  <span className="post-delete-link"><FaTimesCircle /><a href="">{'Delete'}</a></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="add-new-post">
        <button><FaPlus /> <span>Add new post</span></button>
      </div>
      <footer className="app-footer">
        <span>Readable Project - Udacity React NanoDegree course<br />
          © 2017 Jan Vigar All Rights Reserved
        </span>
      </footer>
    </div>
  );
}


export default App;
