export const initialState = {
  registry: {
    loading: false,
    policies: [],
    error: {},
    visible: false
  },
  chain: {
    visible: true,
    loading: false,
    policies: [],
    error: {},
  },
  policyConfig: {
    visible: false,
    policy: {
      schema: {},
      data: {},
      id: {},
      policyId: "",
      version: ""
    }
  }
}
