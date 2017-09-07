import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import './PostForm.css';

const PostForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <h1>Add New Post</h1>
      <hr />
      <form className="post-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rdTitle">Title</label>
          <div>
            <Field id="rdTitle" name="title" component="input" type="text" placeholder="Post Title" />
          </div>
        </div>
        <div>
          <label htmlFor="rdBody">Body</label>
          <div>
            <Field id="rdBody" name="body" component="textarea" placeholder="Post Body" />
          </div>
        </div>
        <div>
          <label htmlFor="rdAuthor">Author</label>
          <div>
            <Field id="rdAuthor" name="author" component="input" type="text" placeholder="Author" />
          </div>
        </div>
        <div>
          <label htmlFor="rdCategory">Category</label>
          <div>
            <Field id="rdCategory" name="category" component="select" placeholder="Category">
              <option />
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </Field>
          </div>
        </div>
        <div>
          <button type="submit" disabled={pristine || submitting}>
          Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear
          </button>
        </div>
      </form>
    </div>
  );
};

PostForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'postForm',
})(PostForm);
