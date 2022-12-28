import { Component, createSignal, For, onMount } from 'solid-js';
import { getMeta, IMeta } from '../../api/siteAPI';
import Meta from './Meta/Meta';

const BlogIndex: Component = () => {
  const [posts, setPosts] = createSignal<IMeta[]>([]);

  onMount(async () => {
    const jsonResponse = await getMeta();
    setPosts(jsonResponse);
  });

  return (
    <div class="main-container">
      <div class="metas-container">
        <For each={posts()}>{(post, _) => <Meta {...post}></Meta>}</For>
      </div>
    </div>
  );
};

export default BlogIndex;
