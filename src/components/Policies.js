import React from 'react'
import { bindActionCreators } from 'redux'
import * as actions from '../actions/PoliciesActions'
import Form from "react-jsonschema-form"
import { connect } from 'react-redux'


const log = (type) => console.log.bind(console, type);

const mapStateToProps = state => {
  return {
    schema: state.schema
  }
}

const mapDispatchToProps = dispatch => {
  return {
    boundActionCreators: bindActionCreators(actions, dispatch)
  }
}


function PoliciesForm({schema}) {
  return (
    <div className="container-fluid">
      <div className="col-sm-5">
        <Form schema={schema}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")}/>
      </div>
    </div>
  )

}

const Policies = connect(
  mapStateToProps,
  mapDispatchToProps
)(PoliciesForm)


export default Policies
