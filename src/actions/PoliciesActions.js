import * as PolicyApi from '../api/mockPolicyApi'

export function noOp (value) {
  return { type: 'NO_OP', value: value }
}


// POLICY REGISTRY AND CHAIN

// get policies (chain or registry)
export function loadPolicies (recipient) {
  return function (dispatch) {
    dispatch(loadingPoliciesStart(recipient))
    return PolicyApi.getPolicies(recipient).then(policies => {
      dispatch(loadPoliciesSuccess(recipient, policies))
    }).catch(error => {
      dispatch(loadPoliciesError(recipient, error))
    }).then(dispatch(loadingPoliciesStop(recipient)))
  }
}



// success get policies
export function loadPoliciesSuccess (recipient, policies) {
  return {type: 'LOAD_POLICIES_SUCCESS', recipient, policies}
}
// failure get policies
export function loadPoliciesError (recipient, error) {
  return {type: 'LOAD_POLICIES_ERROR', recipient, error}
}

// wait for policies start
export function loadingPoliciesStart (recipient) {
  return {type: 'LOADING_POLICIES_START', recipient}
}

// wait for policies stop
export function loadingPoliciesStop (recipient) {
  return {type: 'LOADING_POLICIES_STOP', recipient}
}

// search policies (?)



// CHAIN especifics (?)

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
// toggle policy (enable/disable)

//sort chain
export function sortPolicyChain (policies) {
  return { type: 'SORT_POLICY_CHAIN', policies}
}

// save chain
// wait for response
// success save chain
// failure save chain


// CONFIG

// get config
// wait for config
// success get config
// failure get config
