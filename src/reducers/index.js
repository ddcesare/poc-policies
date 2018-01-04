import { combineReducers } from 'redux';
import { initialState } from './initialState'

function updateObject(oldObject, newValues) {
  return {...oldObject, ...newValues}
}

function createReducer(initialState, handlers) {
  return function reducer(state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}

function toggleLoading (bool) {
  return (state) => {
    return updateObject(state, {loading: bool})
  }
}

function toggleVisibility (bool) {
  return (state) => {
    return updateObject(state, {visible: bool})
  }
}

function updatePolicies (state, action) {
  return updateObject(state, {policies: action.policies})
}

function updateError (state, action) {
  return updateObject(state, {error: action.error})
}

function generateGuid () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function createChainPolicy (policy) {
  const policyId = policy.id
  const guid = generateGuid()
  return {...policy, ...{id: guid, policyId}}
}

function addPolicyToChain (state, action) {
  return updateObject(state, {policies: state.policies.concat([createChainPolicy(action.policy)])})
}

function removePolicyFromChain (state, action) {
  return updateObject(state, {policies: state.policies.filter( policy => policy !== action.policy)})
}

function updatePolicyInChain (state, action) {
  const updatedPolicy = action.policy
  const updatedPolicies = state.policies.map(policy => (policy.id === updatedPolicy.id) ? updatedPolicy : policy )
  return updateObject(state, {policies: updatedPolicies})
}

function setPolicyConfig (state, action) {
  return updateObject(state, {policy: action.policy})
}

function savePolicyConfig (state, action) {
  const updatedPolicy = updateObject(state.policy, action.policy)
  return updateObject(state, {policy: updatedPolicy})
}

const ChainReducer = createReducer(initialState.chain, {
  'SHOW_POLICY_CHAIN' : toggleVisibility(true),
  'HIDE_POLICY_CHAIN' : toggleVisibility(false),
  'ADD_POLICY_TO_CHAIN' : addPolicyToChain,
  'SORT_POLICY_CHAIN' : updatePolicies,
  'LOADING_POLICIES_START_CHAIN' : toggleLoading(true),
  'LOADING_POLICIES_STOP_CHAIN' : toggleLoading(false),
  'LOAD_POLICIES_SUCCESS_CHAIN' : updatePolicies,
  'LOAD_POLICIES_ERROR_CHAIN' : updateError,
  'UPDATE_POLICY_IN_CHAIN' : updatePolicyInChain
})

const RegistryReducer = createReducer(initialState.registry, {
  'SHOW_POLICY_REGISTRY' : toggleVisibility(true),
  'HIDE_POLICY_REGISTRY' : toggleVisibility(false),
  'LOADING_POLICIES_START_REGISTRY' : toggleLoading(true),
  'LOADING_POLICIES_STOP_REGISTRY' : toggleLoading(false),
  'LOAD_POLICIES_SUCCESS_REGISTRY' : updatePolicies,
  'LOAD_POLICIES_ERROR_REGISTRY' : updateError
})

const PolicyConfigReducer = createReducer(initialState.policyConfig, {
  'SHOW_POLICY_CONFIG' : toggleVisibility(true),
  'HIDE_POLICY_CONFIG' : toggleVisibility(false),
  'SET_POLICY_CONFIG' : setPolicyConfig,
  'SAVE_POLICY_CONFIG' : savePolicyConfig,
  'REMOVE_POLICY_FROM_CHAIN' : removePolicyFromChain
})

const rootReducer = combineReducers({
  chain: ChainReducer,
  registry: RegistryReducer,
  policyConfig: PolicyConfigReducer
})

export default rootReducer
