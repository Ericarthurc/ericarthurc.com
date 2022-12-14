import { useParams } from '@solidjs/router';
import { Component, createSignal, onMount, Show } from 'solid-js';

import { getPost, IPost } from '../../api/siteAPI';
import Spinner from '../../components/Spinner/Spinner';

const Blog: Component = () => {
  const params = useParams();

  const [post, setPost] = createSignal<IPost>();

  onMount(async () => {
    const data = await getPost(params.blog);
    setPost(data);
  });

  return (
    <div class="blog-container">
      <Show when={post()} fallback={<Spinner startTime={500}></Spinner>}>
        <div innerHTML={post()?.markdown}></div>
      </Show>
    </div>
  );
};

export default Blog;
