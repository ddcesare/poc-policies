import * as PolicyApi from '../api/mockPolicyApi'

// POLICY REGISTRY AND CHAIN

const chainRecipient = 'CHAIN'
const registryRecipient = 'REGISTRY'

// get policies (chain or registry)
function loadPolicies (recipient, fn) {
  return function (dispatch) {
    dispatch(loadingPoliciesStart(recipient))
    return fn(recipient).then(policies => {
      dispatch(loadPoliciesSuccess(recipient, policies))
    }).catch(error => {
      dispatch(loadPoliciesError(recipient, error))
    }).then(dispatch(loadingPoliciesStop(recipient)))
  }
}

export function getChain () {
  return loadPolicies(chainRecipient, PolicyApi.getChain)
}

export function getRegistry () {
  return loadPolicies(registryRecipient, PolicyApi.getRegistry)
}

// success get policies
export function loadPoliciesSuccess (recipient, policies) {
  return {type: 'LOAD_POLICIES_SUCCESS_'+recipient, policies}
}
// failure get policies
export function loadPoliciesError (recipient, error) {
  return {type: 'LOAD_POLICIES_ERROR_'+recipient, error}
}

// wait for policies start
export function loadingPoliciesStart (recipient) {
  return {type: 'LOADING_POLICIES_START_'+recipient}
}

// wait for policies stop
export function loadingPoliciesStop (recipient) {
  return {type: 'LOADING_POLICIES_STOP_'+recipient}
}

// search policies (?)



// CHAIN specifics (?)

// add policy to chain
export function addPolicyToChain (policy) {
  return {type: 'ADD_POLICY_TO_CHAIN', policy}
}

// show policies
export function showPolicyRegistry () {
  return {type: 'SHOW_POLICY_REGISTRY'}
}

// hide policy registry
export function hidePolicyRegistry () {
  return {type: 'HIDE_POLICY_REGISTRY'}
}

// remove policy from chain
export function removePolicyFromChain (policy) {
  return {type: 'REMOVE_POLICY_FROM_CHAIN', policy}
}
// toggle policy (enable/disable)
export function togglePolicyState (policy) {
  return {type: 'TOGGLE_POLICY_STATE', policy}
}

//sort chain
export function sortPolicyChain (policies) {
  return { type: 'SORT_POLICY_CHAIN', policies}
}

// save chain
export function savePolicyChain (policies) {
  return { type: 'SAVE_POLICY_CHAIN', policies}
}

// update policy in chain
export function updatePolicyInChain (policy) {
  return {type: 'UPDATE_POLICY_IN_CHAIN', policy}
}


// EDIT CONFIG
export function editPolicyConfig (policy) {
  return function(dispatch) {
    dispatch(setPolicyConfig(policy))
    dispatch(showPolicyConfig())
  }

}

// show policy config
export function showPolicyConfig () {
  return {type: 'SHOW_POLICY_CONFIG'}
}

// hide policy config
export function hidePolicyConfig () {
  return {type: 'HIDE_POLICY_CONFIG'}
}

// load policy config
export function setPolicyConfig (policy) {
  return {type: 'SET_POLICY_CONFIG', policy}
}

// save policy config
export function savePolicyConfig (policy) {
  return {type: 'SAVE_POLICY_CONFIG', policy}
}

// submit policy config
export function submitPolicyConfig (policy) {
  return function (dispatch) {
    dispatch(savePolicyConfig(policy))
    dispatch(updatePolicyInChain(policy))
    dispatch(hidePolicyConfig())
  }
}

// wait for response
// success save chain
// failure save chain

