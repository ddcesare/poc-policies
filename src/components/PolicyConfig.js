import React from 'react'
import Form from "react-jsonschema-form"
import '../styles/bootstrap/_bootstrap.scss' // react-jsonschema-form

const log = (type) => console.log.bind(console, type);

function PoliciesForm({visible, policy, submitForm, removePolicyFromChain}) {
  const onSubmit = (policy) => {
    return ({formData, schema}) => {
      submitForm({...policy, ...{schema: schema, data: formData}})
    }

  }

  const hidden = visible ? '' : 'hidden'
  const remove = () => removePolicyFromChain(policy)

  return (
    <section className={"PolicyConfiguration "+ hidden}>
      <header className="PolicyConfiguration-header">
        <h2>{policy.name}</h2>
        <div className="PolicyConfiguration-cancel"><i className="fas fa-caret-square-left"></i> Cancel</div>
        <p className="PolicyConfiguration-summary">
          <span className="Policy-version">{policy.version}</span>
          {' - '}
          <span className="Policy-description">{policy.description}</span>
        </p>
      </header>

      <Form className="PolicyConfiguration-form" schema={policy.schema}
            formData={policy.data}
            onChange={log("changed")}
            onSubmit={onSubmit(policy)}
            onError={log("errors")}/>
      <button className="PolicyConfiguration-remove btn btn-danger btn-sm" onClick={remove}><i className="fas fa-trash"></i> Remove</button>
    </section>
  )
}

const PolicyConfig = ({visible, policy, actions}) => {
  return <PoliciesForm visible={visible} policy={policy} submitForm={actions.submitPolicyConfig} removePolicyFromChain={actions.removePolicyFromChain}/>
}

export default PolicyConfig
