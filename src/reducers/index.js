import { combineReducers } from 'redux';

const initialState = {
  chain: [],
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

const rootReducer = combineReducers({
  schema: PolicySchemaReducer
})

export default rootReducer
