import { combineReducers } from 'redux';
import { initialState } from './initialState'

function PolicySchemaReducer (state = initialState.schema, action) {

  switch (action.type) {
    case 'NO_OP': return state
    default:
      return state
  }
}

function PolicyReducer (state = initialState, action) {
  const {recipient, ...rest} = action
  console.log(action)
  switch (action.type) {
    case 'LOADING_POLICIES_START':
      return {...state, [recipient]: {...state[recipient], ...{loading: true}}}
    case 'LOADING_POLICIES_STOP':
      return {...state, [recipient]: {...state[recipient], ...{loading: false}}}
    case 'LOAD_POLICIES_SUCCESS':
      return {...state, [recipient]: {...state[recipient], ...{policies: rest.policies}}}
    case 'LOAD_POLICIES_ERROR':
      return {...state, [recipient]: {...state[recipient], ...rest.error}}

    default: return state
  }
}

const rootReducer = combineReducers({
  schema: PolicySchemaReducer,
  policies: PolicyReducer
})

export default rootReducer
