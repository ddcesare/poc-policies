const delay = 2000


const chain = [
    {id: 1, policyId: 1, enabled: true, name: 'Policy 1'},
    {id: 2, policyId: 1, enabled: true, name: 'Policy 1'},
    {id: 3, policyId: 2, enabled: true, name: 'Policy 2'},
    {id: 4, policyId: 3, enabled: true, name: 'Policy 3'},
    {id: 5, policyId: 4, enabled: true, name: 'Policy 4'},
    {id: 6, policyId: 5, enabled: true, name: 'Policy 5'}
]

const policyList = [
  {id: 1, name: 'Policy 1'},
  {id: 2, name: 'Policy 2'},
  {id: 3, name: 'Policy 3'},
  {id: 4, name: 'Policy 4'},
  {id: 5, name: 'Policy 5'}
]

const schema1 = {
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

const schema2 = {
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


const schemas = new Map ()

schemas.set(1, schema1)
schemas.set(2, schema2)
schemas.set(3, schema1)
schemas.set(4, schema2)
schemas.set(5, schema1)


//This would be performed on the server in a real app. Just stubbing in.
const generateId = (chain) => {
  return chain.length +1
}

function getPolicies () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], policyList))
    }, delay)
  })
}

function getChain () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(Object.assign([], chain))
    }, delay)
  })
}

function getSchema (policyId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(schemas.get(policyId))
    }, delay)
  })
}
