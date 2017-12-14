export function noOp(value) {
  return { type: 'NO_OP', value: value }
}

// CHAIN

export function sortChain(chain) {
  return { type: 'SORT_CHAIN', chain: chain}
}

// CONFIG

