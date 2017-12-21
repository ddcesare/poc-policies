import React from 'react'
import Form from "react-jsonschema-form"
import '../styles/bootstrap/_bootstrap.scss' // react-jsonschema-form

const log = (type) => console.log.bind(console, type);

function PoliciesForm({visible, policy, submitForm}) {
  const onSubmit = (policy) => {
    return ({formData, schema}) => {
      submitForm({...policy, ...{schema: schema, data: formData}})
    }

  }

  const hidden = visible ? '' : 'hidden'

  return (
    <div className={"container-fluid "+ hidden}>
      <div className="col-sm-5">
        <Form schema={policy.schema}
              formData={policy.data}
              onChange={log("changed")}
              onSubmit={onSubmit(policy)}
              onError={log("errors")}/>
      </div>
    </div>
  )
}

const PolicyConfig = ({visible, policy, actions}) => {
  return <PoliciesForm visible={visible} policy={policy} submitForm={actions.submitPolicyConfig} />
}

export default PolicyConfig
