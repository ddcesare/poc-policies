const delay = 1000

const schema1 = {
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


const chain = [
    {id: 1, policyId: 1, enabled: true, name: 'Policy 1', version: '1.0.0', schema: schema1, data: {}},
    {id: 2, policyId: 1, enabled: true, name: 'Policy 1', version: '1.0.0', schema: schema2, data: {}},
    {id: 3, policyId: 2, enabled: true, name: 'Policy 2', version: '1.0.0', schema: schema1, data: {}},
    {id: 4, policyId: 3, enabled: true, name: 'Policy 3', version: '1.0.0', schema: schema2, data: {}},
    {id: 5, policyId: 4, enabled: true, name: 'Policy 4', version: '1.0.0', schema: schema1, data: {}},
    {id: 6, policyId: 5, enabled: true, name: 'Policy 5', version: '1.0.0', schema: schema2, data: {}}
]

const registry = [
  {id: 1, name: 'Policy 1', version: '1.0.0', schema: schema1},
  {id: 2, name: 'Policy 2', version: '1.0.0', schema: schema2},
  {id: 3, name: 'Policy 3', version: '1.0.0', schema: schema1},
  {id: 4, name: 'Policy 4', version: '1.0.0', schema: schema2},
  {id: 5, name: 'Policy 5', version: '1.0.0', schema: schema1}
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
