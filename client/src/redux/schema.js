import { schema } from 'normalizr';

export const categorySchema = new schema.Entity(
  'categories', undefined, { idAttribute: value => value.name },
);

export const categoryListSchema = new schema.Array(categorySchema);

export const commentSchema = new schema.Entity('comments');

export const postSchema = new schema.Entity('posts', {
  category: categorySchema,
  comments: [commentSchema],
});

export const postListSchema = new schema.Array(postSchema);

export const commentListSchema = new schema.Array(commentSchema);
