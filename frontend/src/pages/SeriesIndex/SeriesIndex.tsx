import { A } from '@solidjs/router';
import { Component, createSignal, For, onMount } from 'solid-js';
import { getSeries, ISeries } from '../../api/siteAPI';
import Spinner from '../../components/Spinner/Spinner';

const SeriesIndex: Component = () => {
  const [series, setSeries] = createSignal<ISeries[]>([]);

  onMount(async () => {
    const jsonResponse = await getSeries();
    setSeries(jsonResponse);
  });

  return (
    <div class="main-container">
      <div class="cards-container">
        <For fallback={<Spinner startTime={500}></Spinner>} each={series()}>
          {(s, _) => (
            <div class="card-series">
              <A class="card-header-series" href={`/series/${s.series}`}>
                <div class="card-header-info">
                  <span class="card-title">{s.series}</span>
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
