import { Component } from 'solid-js';
import { IAdminLogin } from '../../api/adminAPI';

interface IProps {
  form: IAdminLogin;
  handleSubmit: (event: Event) => Promise<void>;
  updateFormField: (fieldName: 'password' | 'pin') => (event: Event) => void;
}

const Login: Component<IProps> = (props) => {
  return (
    <div class="admin-login-form">
      <form class="admin-form" onSubmit={props.handleSubmit}>
        <label class="admin-label" for="password">
          Password:
        </label>
        <input
          class="admin-input"
          type="password"
          id="password"
          value={props.form.password}
          onChange={props.updateFormField('password')}
        />
        <label class="admin-label" for="pin">
          Pin:
        </label>
        <input
          class="admin-input"
          type="password"
          id="pin"
          value={props.form.pin}
          onChange={props.updateFormField('pin')}
        />
        <button class="admin-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
