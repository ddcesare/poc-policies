import { combineReducers } from 'redux';
import { initialState } from './initialState'

function PolicySchemaReducer(state = initialState.schema, action) {

  switch (action.type) {
    case 'NO_OP':

      return state

    default:
      return state
  }
}

function PolicyChainReducer(state = initialState.chain, action) {
  switch (action.type) {
    case 'SORT_CHAIN': return action.chain
    default: return state
  }
}

const rootReducer = combineReducers({
  schema: PolicySchemaReducer,
  chain: PolicyChainReducer
})

export default rootReducer
