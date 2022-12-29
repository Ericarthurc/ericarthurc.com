import { Component, createSignal, Index, Setter } from 'solid-js';
import { adminCreatePost } from '../../../api/adminAPI';
import { IPost } from '../../../api/siteAPI';

interface IProps {
  setCreator: Setter<Boolean>;
}

const Creator: Component<IProps> = (props) => {
  const [newPost, setNewPost] = createSignal<Omit<IPost, 'id'>>({
    title: '',
    date: '',
    series: '',
    categories: [],
    markdown: '',
  });

  const submitNewPost = async (event: Event) => {
    event.preventDefault();
    try {
      const response = await adminCreatePost(newPost());
    } catch (error) {}
  };

  const updatePostField =
    (
      fieldName: 'title' | 'date' | 'series' | 'categories' | 'markdown',
      index?: number
    ) =>
    (event: Event) => {
      const inputElement = event.currentTarget as HTMLInputElement;
      setNewPost((prev) => {
        if (fieldName == 'categories') {
          prev.categories[index as number] = inputElement.value;
          return { ...prev };
        }
        return {
          ...prev,
          [fieldName]: inputElement.value,
        };
      });
    };

  const addCategory = () => {
    setNewPost((prev) => {
      prev.categories.push('');
      return { ...prev };
    });
  };

  const removeCategory = (index: number) => (event: Event) => {
    setNewPost((prev) => {
      return {
        ...prev,
        categories: prev.categories.filter((c) => c !== prev.categories[index]),
      };
    });
  };

  return (
    <>
      <button class="admin-button" onClick={() => props.setCreator(false)}>
        Go Back
      </button>
      <h3>Creater</h3>
      <label for="title">Title:</label>
      <input
        id="title"
        type="text"
        onInput={updatePostField('title')}
        value={newPost().title}
      ></input>

      <label for="date">Date:</label>
      <input
        id="date"
        type="text"
        onInput={updatePostField('date')}
        value={newPost().date}
      ></input>

      <label for="series">Series:</label>
      <input
        type="series"
        onInput={updatePostField('series')}
        value={newPost().series}
      ></input>

      <label for="categories">Categories:</label>
      <Index each={newPost().categories}>
        {(c, i) => (
          <>
            <input
              id="categories"
              type="text"
              onInput={updatePostField('categories', i)}
              value={c()}
            ></input>
            <button onClick={removeCategory(i)}>-</button>
          </>
        )}
      </Index>
      <button onClick={addCategory}>+</button>

      <label for="markdown">Markdown:</label>
      <textarea
        class="admin-textarea"
        id="markdown"
        onInput={updatePostField('markdown')}
        value={newPost().markdown}
      ></textarea>

      <button onClick={submitNewPost}>Submit</button>
    </>
  );
};

export default Creator;
