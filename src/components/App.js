/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import PolicyConfig from './PolicyConfig'
import PolicyChain from './PolicyChain'


// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {

  render() {
    const {store} = this.props

    return (
      <div>
        <PolicyConfig store={store} />
        <PolicyChain store={store} />
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

export default App
