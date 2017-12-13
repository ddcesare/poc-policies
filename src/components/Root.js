import React from 'react'
import PropTypes from 'prop-types'

import { Provider } from 'react-redux'

import Policies from './Policies'


export default function Root(props) {
  const { store } = props

  return(

      <Provider store={store}>
          <Policies store={store} />
      </Provider>
    )
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
