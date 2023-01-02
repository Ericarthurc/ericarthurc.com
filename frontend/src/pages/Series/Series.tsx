import { useParams } from '@solidjs/router';
import { Component, createSignal, For, onMount } from 'solid-js';
import { getSeriesMeta, IMeta } from '../../api/siteAPI';
import Metas from '../../components/Meta/Meta';
import Spinner from '../../components/Spinner/Spinner';

const Series: Component = () => {
  const params = useParams();
  const [posts, setPosts] = createSignal<IMeta[]>([]);

  onMount(async () => {
    const jsonResponse = await getSeriesMeta(params.series);
    setPosts(jsonResponse);
  });

  return (
    <div class="main-container">
      <h1 class="main-header">{params.series} Series</h1>
      <div class="cards-container">
        <For fallback={<Spinner startTime={500}></Spinner>} each={posts()}>
          {(post, _) => <Metas {...post}></Metas>}
        </For>
      </div>
    </div>
  );
};

export default Series;
