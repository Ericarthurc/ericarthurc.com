import { A } from '@solidjs/router';
import { Component, For } from 'solid-js';
import { IMeta } from '../../../api/siteAPI';

const Metas: Component<IMeta> = (props) => {
  return (
    <div class="meta-container">
      <A class="meta-anchor" href={`/blog/${props.title}`}>
        <div class="meta-info">
          <span class="meta-info-title">{props.title}</span>
          <span class="meta-info-date">
            {new Date(props.date).toLocaleDateString('us-PT', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </A>
      <span class="meta-categories">
        <For each={props.categories}>
          {(category, i) => (
            <A class="meta-categories-anchor" href={`/category/${category}`}>
              <span class="meta-categories-span">{category}</span>
            </A>
          )}
        </For>
      </span>
    </div>
  );
};

export default Metas;
