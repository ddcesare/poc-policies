import { combineReducers } from 'redux';
import { initialState } from './initialState'

function PolicyConfigReducer (state = initialState.config, action) {

  switch (action.type) {
    case 'NO_OP': return state
    default:
      return state
  }
}

function updatePolicyState (recipient, state, newState) {
  return {...state, [recipient]: {...state[recipient], ...newState}}
}

function PolicyReducer (state = initialState, action) {
  const {recipient, ...rest} = action
  switch (action.type) {
    case 'LOADING_POLICIES_START':
      return updatePolicyState(recipient, state, {loading: true})
    case 'LOADING_POLICIES_STOP':
      return updatePolicyState(recipient, state, {loading: false})
    case 'LOAD_POLICIES_SUCCESS':
      return updatePolicyState(recipient, state, {policies: rest.policies})
    case 'LOAD_POLICIES_ERROR':
      return updatePolicyState(recipient, state, rest.error)
    case 'SHOW_POLICY_REGISTRY':
      return updatePolicyState('registry', state, {visible: true})
    case 'HIDE_POLICY_REGISTRY':
      return updatePolicyState('registry', state, {visible: false})
    case 'ADD_POLICY_TO_CHAIN':
      return updatePolicyState('chain', state, {policies: state.chain.policies.concat([rest.policy])})
    default: return state
  }
}

const rootReducer = combineReducers({
  config: PolicyConfigReducer,
  policies: PolicyReducer
})

export default rootReducer
