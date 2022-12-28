import {
  Component,
  createSignal,
  For,
  Match,
  onMount,
  Show,
  Switch,
} from 'solid-js';
import { adminGetPosts } from '../../api/adminAPI';

import { IMeta } from '../../api/siteAPI';
import Editor from './Editor/Editor';
import Post from './Post/Post';

interface IProps {
  logout: (event: Event) => Promise<void>;
}

const Panel: Component<IProps> = (props) => {
  const [loaded, isLoaded] = createSignal<Boolean>(false);
  const [posts, setPosts] = createSignal<IMeta[]>([]);
  const [selectedPost, setSelectedPost] = createSignal<String>('');

  onMount(async () => {
    try {
      const response = await adminGetPosts();

      setPosts(await response.json());
      isLoaded(true);
    } catch (error) {}
  });

  return (
    <>
      <h2>ADMIN PANEL</h2>
      <button
        style={{ 'margin-bottom': '25px' }}
        onClick={props.logout}
        type="submit"
      >
        Logout
      </button>
      <Show when={loaded()}>
        <Switch fallback={<></>}>
          <Match when={!selectedPost()}>
            <button style={{ 'margin-bottom': '25px' }} type="submit">
              Create Post
            </button>
            <For each={posts()}>
              {(post, _) => (
                <Post meta={post} setSelectedPost={setSelectedPost}></Post>
              )}
            </For>
          </Match>
          <Match when={selectedPost()}>
            <Editor
              postId={selectedPost()}
              setSelectedPost={setSelectedPost}
            ></Editor>
          </Match>
        </Switch>
      </Show>
    </>
  );
};

export default Panel;
