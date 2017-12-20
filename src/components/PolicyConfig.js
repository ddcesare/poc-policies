import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import Form from "react-jsonschema-form"
import { connect } from 'react-redux'
import '../styles/bootstrap/_bootstrap.scss' // react-jsonschema-form


const log = (type) => console.log.bind(console, type);


/*
const mapStateToProps = state => {
  return {
    config: state.config
  }
}

const mapDispatchToProps = dispatch => {
  return {
    boundActionCreators: bindActionCreators(actions, dispatch)
  }
}
*/

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


// render in policychain
// modify state to have a "currentPolicy" or "editPolicy" or whaeva
// add some visibility state


/*
const PolicyConfig = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoliciesForm)
*/


export default PolicyConfig
