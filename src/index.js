/* eslint-disable import/default */

import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './components/Root'
import configureStore from './store/configureStore'

import './styles/bootstrap.css'


const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CORS policy configuration",
  "type": "object",
  "properties": {
    "allow_headers": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "allow_methods": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "GET",
          "HEAD",
          "POST",
          "PUT",
          "DELETE",
          "PATCH",
          "OPTIONS",
          "TRACE",
          "CONNECT"
        ]
      }
    },
    "allow_origin": {
      "type": "string"
    },
    "allow_credentials": {
      "type": "boolean"
    }
  }
}

const initialState = {
  chain: [],
  schema: schema
}

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
