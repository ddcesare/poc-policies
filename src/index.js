/* eslint-disable import/default */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './components/Root'
import configureStore from './store/configureStore'

import './styles/fontawesome/scss/fa-solid.scss'
import './styles/fontawesome/scss/fontawesome.scss'
import './styles/policies.scss'

const store = configureStore();


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
