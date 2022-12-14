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
import Spinner from '../../components/Spinner/Spinner';
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
        class="admin-button"
        style={{ 'margin-bottom': '25px' }}
        onClick={props.logout}
        type="submit"
      >
        Logout
      </button>
      <button
        class="admin-button"
        style={{ 'margin-bottom': '25px' }}
        type="submit"
      >
        Force Cache Reload
      </button>

      <Show when={loaded()}>
        <Switch>
          <Match when={!selectedPost()}>
            <Switch>
              <Match when={!creator()}>
                <button
                  class="admin-button"
                  style={{ 'margin-bottom': '25px' }}
                  onClick={() => setCreator(!creator())}
                >
                  Create Post
                </button>
                <div class="admin-post-container">
                  <For
                    fallback={<Spinner startTime={500}></Spinner>}
                    each={posts()}
                  >
                    {(post, _) => (
                      <Post
                        meta={post}
                        setSelectedPost={setSelectedPost}
                      ></Post>
                    )}
                  </For>
                </div>
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
