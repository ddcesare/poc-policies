const delay = 1000

const schemaCors = {
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

const schemaEcho = {
  "title": "Echo policy configuration",
  "type": "object",
  "properties": {
    "status": {
      "type": "integer"
    },
    "exit": {
      "type": "string",
      "enum": ["request", "phase"]
    }
  }
}

const schemaHeaders = {
  "title": "Headers policy configuration",
  "type": "object",
  "definitions": {
    "commands": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "op": {
            "type": "string",
            "enum": ["add", "set", "push"]
          },
          "header": {
            "type": "string"
          },
          "value": {
            "type": "string"
          }
        },
        "required": ["op", "header", "value"]
      }
    }
  },
  "properties": {
    "request": { "$ref": "#/definitions/commands" },
    "response": { "$ref": "#/definitions/commands" }
  }
}


const chain = [
    {id: 1, policyId: 1, enabled: true, name: 'CORS', version: '1.0.0', schema: schemaCors, data: {}}
]

const registry = [
  {id: 1, name: 'CORS policy configuration', version: '1.0.0', schema: schemaCors},
  {id: 2, name: 'Echo policy configuration', version: '1.0.0', schema: schemaEcho},
  {id: 3, name: 'Headers policy configuration', version: '1.0.0', schema: schemaHeaders}
]


//This would be performed on the server in a real app. Just stubbing in.
const generateId = (chain) => {
  return chain.length +1
}

export function getRegistry () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], registry))
    }, delay)
  })
}

export function getChain () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], chain))
    }, delay)
  })
}
