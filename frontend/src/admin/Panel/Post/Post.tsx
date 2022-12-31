import { Component, For, Setter } from 'solid-js';
import { adminDeletePost } from '../../../api/adminAPI';

import { IMeta } from '../../../api/siteAPI';

interface IProps {
  meta: IMeta;
  setSelectedPost: Setter<String>;
}

const Post: Component<IProps> = (props) => {
  const deletePost = async () => {
    try {
      await adminDeletePost(props.meta.id);
    } catch (error) {}
  };

  return (
    <div class="admin-post">
      <label class="admin-post-label">Title:</label>
      <span>{props.meta.title}</span>
      <label class="admin-post-label">Date:</label>
      <span>
        {new Date(props.meta.date).toLocaleDateString('en', {
          timeZone: 'UTC',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </span>
      <label class="admin-post-label">Series:</label>
      <span>{props.meta.series}</span>
      <label class="admin-post-label">Categories:</label>
      <div>
        <For each={props.meta.categories}>{(c) => <span>{c} </span>}</For>
      </div>
      <div>
        <button
          class="admin-post-button"
          onClick={() => props.setSelectedPost(props.meta.id)}
        >
          Edit
        </button>
        <button class="admin-post-button" onClick={deletePost}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default Post;
