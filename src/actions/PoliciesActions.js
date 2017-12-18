import * as PolicyApi from '../api/mockPolicyApi'

export function noOp (value) {
  return { type: 'NO_OP', value: value }
}


// POLICY LIST

// get policies
export function loadPolicies () {
  return function (dispatch) {
    dispatch(loadingPoliciesStart())
    return PolicyApi.getPolicies().then(policies => {
      dispatch(loadPoliciesSuccess(policies))
    }).catch(error => {
      dispatch(loadPoliciesError(error))
    }).then(dispatch(loadingPoliciesStop()))
  }
}

// success get policies
export function loadPoliciesSuccess (policies) {
  return {type: 'LOAD_POLICIES_SUCCESS', policies}
}
// failure get policies
export function loadPoliciesError (error) {
  return {type: 'LOAD_POLICIES_ERROR', error}
}

// wait for policies start
export function loadingPoliciesStart () {
  return {type: 'LOADING_POLICIES_START'}
}

// wait for policies stop
export function loadingPoliciesStop () {
  return {type: 'LOADING_POLICIES_STOP'}
}

// search policies (?)



// CHAIN
// get chain
export function loadChain () {
  return function (dispatch) {
    dispatch(loadingChainStart())
    return PolicyApi.getRegistry().then(policies => {
      dispatch(loadChainSuccess(policies))
    }).catch(error => {
      dispatch(loadChainError(error))
    }).then(dispatch(loadingChainStop()))
  }
}

// success get chain
export function loadChainSuccess (policies) {
  return {type: 'LOAD_CHAIN_SUCCESS', policies}
}
// failure get chain
export function loadChainError (error) {
  return {type: 'LOAD_CHAIN_ERROR', error}
}

// wait for chain start
export function loadingChainStart () {
  return {type: 'LOADING_CHAIN_START', loadingChain: true}
}

// wait for chain stop
export function loadingChainStop () {
  return {type: 'LOADING_CHAIN_STOP', loadingChain: false}
}


// add policy to chain
export function addPolicyToChain () {
  return {type: 'ADD_POLICY_TO_CHAIN'}
}

// show policies
export function showPolicyRegistry () {
  return {type: 'SHOW_POLICY_REGISTRY'}
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
