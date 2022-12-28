import { Component, For, Setter } from 'solid-js';

import { IMeta } from '../../../api/siteAPI';

interface IProps {
  meta: IMeta;
  setSelectedPost: Setter<String>;
}

const Post: Component<IProps> = (props) => {
  return (
    <div style={{ 'margin-bottom': '30px' }}>
      <p>{props.meta.id}</p>
      <p>{props.meta.title}</p>
      <p>{props.meta.date}</p>
      <p>{props.meta.series}</p>
      <For each={props.meta.categories}>{(c) => <span>{c} </span>}</For>
      <button onClick={() => props.setSelectedPost(props.meta.id)}>Edit</button>
    </div>
  );
};

export default Post;
