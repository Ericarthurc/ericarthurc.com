import { A } from '@solidjs/router';
import { Component, createSignal, Switch, Match, onMount } from 'solid-js';

import { adminGetMe, adminLogin, adminLogout } from '../api/adminAPI';
import Login from './Login/Login';
import { adminForm } from './adminForm';
import Panel from './Panel/Panel';

import './style/admin.scss';

const Admin: Component = () => {
  const [loaded, isLoaded] = createSignal<Boolean>(false);
  const [authorized, setAuthorized] = createSignal<Boolean>(false);

  const { form, updateFormField, clearForm } = adminForm();

  const handleSubmit = async (event: Event) => {
    event.preventDefault();

    try {
      await adminLogin(form);

      setAuthorized(true);
      isLoaded(true);
    } catch (error) {
      clearForm();
    }
  };

  const logout = async (event: Event) => {
    event.preventDefault();

    await adminLogout();
    setAuthorized(false);
    clearForm();
  };

  onMount(async () => {
    try {
      await adminGetMe();
      setAuthorized(true);
    } catch (error) {}
    isLoaded(true);
  });

  return (
    <>
      <nav class="admin-navbar" id="navbar">
        <A class="admin-navbar-link" end={true} href="/blog">
          Return to Home
        </A>
      </nav>

      <div class="admin-container">
        <Switch fallback={<></>}>
          <Match when={loaded()}>
            <Switch fallback={<></>}>
              <Match when={authorized()}>
                <Panel logout={logout} />
              </Match>
              <Match when={!authorized()}>
                <Login
                  form={form}
                  handleSubmit={handleSubmit}
                  updateFormField={updateFormField}
                />
              </Match>
            </Switch>
          </Match>
        </Switch>
      </div>
    </>
  );
};

export default Admin;
