import { createStore } from 'solid-js/store';
import { IAdminLogin } from '../api/adminAPI';

const adminForm = () => {
  const [form, setForm] = createStore<IAdminLogin>({
    password: '',
    pin: '',
  });

  const clearForm = () => {
    setForm({
      password: '',
      pin: '',
    });
  };

  const updateFormField = (fieldName: 'password' | 'pin') => (event: Event) => {
    const inputElement = event.currentTarget as HTMLInputElement;
    setForm({
      [fieldName]: inputElement.value,
    });
  };

  return { form, updateFormField, clearForm };
};

export { adminForm };
