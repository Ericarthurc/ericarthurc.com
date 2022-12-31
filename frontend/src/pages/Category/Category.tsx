import { useParams } from '@solidjs/router';
import { Component, createSignal, For, onMount } from 'solid-js';
import { getCategoryMeta, IMeta } from '../../api/siteAPI';
import Metas from '../../components/Meta/Meta';

const Category: Component = () => {
  const params = useParams();
  const [posts, setPosts] = createSignal<IMeta[]>([]);

  onMount(async () => {
    const jsonResponse = await getCategoryMeta(params.category);
    setPosts(jsonResponse);
  });

  return (
    <div class="main-container">
      <h1 class="main-header">{params.category} Category</h1>
      <div class="metas-container">
        <For each={posts()}>{(post, _) => <Metas {...post}></Metas>}</For>
      </div>
    </div>
  );
};

export default Category;
