import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import Form from "react-jsonschema-form"
import { connect } from 'react-redux'
import '../styles/bootstrap/_bootstrap.scss' // react-jsonschema-form


const log = (type) => console.log.bind(console, type);

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

function PoliciesForm({config}) {
  return (
    <div className="container-fluid">
      <div className="col-sm-5">
        <Form schema={config.schema}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")}/>
      </div>
    </div>
  )
}

const PolicyConfig = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoliciesForm)


export default PolicyConfig
