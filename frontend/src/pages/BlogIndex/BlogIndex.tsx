import { Component, createSignal, For, onMount } from 'solid-js';
import { getMeta, IMeta } from '../../api/siteAPI';
import Meta from '../../components/Meta/Meta';
import Spinner from '../../components/Spinner/Spinner';

const BlogIndex: Component = () => {
  const [posts, setPosts] = createSignal<IMeta[]>([]);

  onMount(async () => {
    const jsonResponse = await getMeta();
    setPosts(jsonResponse);
  });

  return (
    <div class="main-container">
      <div class="cards-container">
        <For fallback={<Spinner startTime={500}></Spinner>} each={posts()}>
          {(post, _) => <Meta {...post}></Meta>}
        </For>
      </div>
    </div>
  );
};

export default BlogIndex;
