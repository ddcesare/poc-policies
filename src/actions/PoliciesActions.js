export function noOp(value) {
  return { type: 'NO_OP', value: value }
}


// POLICY LIST

// get policies
// wait for policies
// success get policies
// failure get policies

// CHAIN

// get chain
// wait for chain
// success get chain
// failure get chain

// add policy to chain
// remove policy from chain
// toggle policy (enable/disable)

//sort chain
export function sortChain(chain) {
  return { type: 'SORT_CHAIN', chain: chain}
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
