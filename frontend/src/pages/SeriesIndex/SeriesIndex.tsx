import { A } from '@solidjs/router';
import { Component, createSignal, For, onMount } from 'solid-js';
import { getSeries, ISeries } from '../../api/siteAPI';

const SeriesIndex: Component = () => {
  const [series, setSeries] = createSignal<ISeries[]>([]);

  onMount(async () => {
    const jsonResponse = await getSeries();
    setSeries(jsonResponse);
  });

  return (
    <div class="main-container">
      <div class="metas-container">
        <For each={series()}>
          {(s, _) => (
            <div class="meta-container-series">
              <A class="meta-anchor-series" href={`/series/${s.series}`}>
                <div class="meta-info">
                  <span class="meta-info-title">{s.series}</span>
                </div>
              </A>
            </div>
          )}
        </For>
      </div>
    </div>
  );
};

export default SeriesIndex;
