export const initialState = {
  registry: {
    loading: false,
    policies: [],
    error: {}
  },
  chain: {
    loading: false,
    policies: [],
    error: {}
  },
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
