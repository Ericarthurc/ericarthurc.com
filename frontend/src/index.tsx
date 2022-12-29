/* @refresh reload */
import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';

import App from './App';
import './styles/main.scss';
import { MetaProvider, Title } from '@solidjs/meta';

render(
  () => (
    <Router>
      <MetaProvider>
        <Title>EricArthurC</Title>
        <App />
      </MetaProvider>
    </Router>
  ),
  document.getElementById('solid') as HTMLElement
);
