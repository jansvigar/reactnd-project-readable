import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import './PostForm.css';

/* eslint-disable react/prop-types */
const renderInputField = (props) => {
  const { input, label, type, id, placeholder, meta } = props;
  const { touched, error } = meta;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input {...input} id={id} type={type} placeholder={placeholder} />
        {touched && (error && <span>{error}</span>) }
      </div>
    </div>
  );
};

const renderTextAreaField = (props) => {
  const { input, label, id, placeholder, meta } = props;
  const { touched, error } = meta;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <textarea {...input} rows="4" placeholder={placeholder} />
        {touched && (error && <span>{error}</span>) }
      </div>
    </div>
  );
};

const renderSelectField = (props) => {
  const { input, label, id, children, meta } = props;
  const { touched, error } = meta;
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <select {...input}>
          {children}
        </select>
        {touched && (error && <span>{error}</span>) }
      </div>
    </div>
  );
};
/* eslint-enable react/prop-types */

const required = value => (value ? undefined : 'This field is required');
const maxLength = max => value =>
  (value && value.length > max ? `Must be ${max} characters or less` : undefined);
const maxLength50 = maxLength(50);
const maxLength140 = maxLength(140);
const maxLength500 = maxLength(500);

const PostForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <div>
      <h1>Add New Post</h1>
      <hr />
      <form className="post-form" onSubmit={handleSubmit}>
        <Field
          id="rdTitle"
          name="title"
          type="text"
          component={renderInputField}
          label="Title"
          placeholder="Enter the post title"
          validate={[required, maxLength140]}
        />
        <Field
          id="rdBody"
          name="body"
          component={renderTextAreaField}
          label="Body"
          placeholder="Write some content here"
          validate={[required, maxLength500]}
        />
        <Field
          id="rdAuthor"
          name="author"
          component={renderInputField}
          type="text"
          label="Author"
          placeholder="Enter the author of this post"
          validate={[required, maxLength50]}
        />
        <Field
          id="rdCategory"
          name="category"
          component={renderSelectField}
          label="Category"
          validate={[required]}
        >
          <option>Select a category</option>
          <option value="react">React</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
        </Field>
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
