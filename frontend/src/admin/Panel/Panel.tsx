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
import Creator from './Creator/Creator';
import Editor from './Editor/Editor';
import Post from './Post/Post';

interface IProps {
  logout: (event: Event) => Promise<void>;
}

const Panel: Component<IProps> = (props) => {
  const [loaded, isLoaded] = createSignal<Boolean>(false);
  const [posts, setPosts] = createSignal<IMeta[]>([]);
  const [selectedPost, setSelectedPost] = createSignal<String>('');
  const [creator, setCreator] = createSignal<Boolean>(false);

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
      <button style={{ 'margin-bottom': '25px' }} type="submit">
        Force Cache Reload
      </button>

      <Show when={loaded()}>
        <Switch fallback={<></>}>
          <Match when={!selectedPost()}>
            <Switch fallback={<></>}>
              <Match when={!creator()}>
                <button
                  style={{ 'margin-bottom': '25px' }}
                  onClick={() => setCreator(!creator())}
                >
                  Create Post
                </button>
                <For each={posts()}>
                  {(post, _) => (
                    <Post meta={post} setSelectedPost={setSelectedPost}></Post>
                  )}
                </For>
              </Match>
              <Match when={creator()}>
                <Creator setCreator={setCreator}></Creator>
              </Match>
            </Switch>
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
