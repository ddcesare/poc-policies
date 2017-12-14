export const initialState = {
  chain: [
    {id: 1, name: 'Policy 1'},
    {id: 2, name: 'Policy 1'},
    {id: 3, name: 'Policy 2'},
    {id: 4, name: 'Policy 3'},
    {id: 5, name: 'Policy 4'},
    {id: 6, name: 'Policy 5'}
  ],
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
