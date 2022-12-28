import { Component } from 'solid-js';
import { IAdminLogin } from '../../api/adminAPI';

interface IProps {
  form: IAdminLogin;
  handleSubmit: (event: Event) => Promise<void>;
  updateFormField: (fieldName: 'password' | 'pin') => (event: Event) => void;
}

const Login: Component<IProps> = (props) => {
  return (
    <form
      style={{ display: 'flex', 'flex-direction': 'column' }}
      onSubmit={props.handleSubmit}
    >
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        value={props.form.password}
        onChange={props.updateFormField('password')}
      />
      <label for="pin">Pin:</label>
      <input
        type="password"
        id="pin"
        value={props.form.pin}
        onChange={props.updateFormField('pin')}
      />
      <input class="form-submit" type="submit" value="Login" />
    </form>
  );
};

export default Login;
