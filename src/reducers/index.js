import { combineReducers } from 'redux';

const initialState = {
  chain: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  schema: {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "CORS policy configuration",
    "type": "object",
    "properties": {
      "allow_headers": {
        "type": "array",
        "items": {
          "type": "string"
        }
      }
    }
  }
}

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
