import { A } from '@solidjs/router';
import { Component, For } from 'solid-js';
import { IMeta } from '../../api/siteAPI';

const Metas: Component<IMeta> = (props) => {
  return (
    <div class="card">
      <A class="card-header" href={`/blog/${props.title}`}>
        <div class="card-header-info">
          <span class="card-title">{props.title}</span>
          <span class="card-date">
            {new Date(props.date).toLocaleDateString('en', {
              timeZone: 'PST',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </A>
      <span class="card-categories">
        <For each={props.categories}>
          {(category, i) => (
            <A class="card-category" href={`/category/${category}`}>
              <span class="card-category-info">{category}</span>
            </A>
          )}
        </For>
      </span>
    </div>
  );
};

export default Metas;
