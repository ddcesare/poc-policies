import { combineReducers } from 'redux';
import { initialState } from './initialState'

function PolicySchemaReducer (state = initialState.schema, action) {

  switch (action.type) {
    case 'NO_OP': return state
    default:
      return state
  }
}

function PolicyChainReducer (state = initialState.chain, action) {
  switch (action.type) {
    case 'LOADING_CHAIN_START': return {...state, ...{loading: true}}
    case 'LOADING_CHAIN_STOP': return {...state, ...{loading: false}}
    case 'LOAD_CHAIN_SUCCESS':
      return {...state, ...{policies: action.policies}}
    case 'SORT_POLICY_CHAIN': return {...state, ...{policies: action.policies}}
    default: return state
  }
}

function PolicyListReducer (state = initialState.registry, action) {
  switch (action.type) {
    case 'LOADING_POLICIES_START': return {...state, ...{loading: true}}
    case 'LOADING_POLICIES_STOP': return {...state, ...{loading: false}}
    case 'LOAD_POLICIES_SUCCESS':
      console.log('LOAD_POLICIES_SUCCESS')
      return {...state, ...{policies: action.policies}}
    case 'LOAD_POLICIES_ERROR':
      console.log('LOAD_POLICIES_ERROR')
      return {...state, ...action.error}

    default: return state
  }
}

const rootReducer = combineReducers({
  schema: PolicySchemaReducer,
  chain: PolicyChainReducer,
  registry: PolicyListReducer
})

export default rootReducer
