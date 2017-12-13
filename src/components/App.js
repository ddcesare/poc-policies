/* eslint-disable import/no-named-as-default */
import React from 'react'
import PropTypes from 'prop-types'
import Form from "react-jsonschema-form"

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "CORS policy configuration",
  "type": "object",
  "properties": {
    "allow_headers": {
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "allow_methods": {
      "type": "array",
      "items": {
        "type": "string",
        "enum": [
          "GET",
          "HEAD",
          "POST",
          "PUT",
          "DELETE",
          "PATCH",
          "OPTIONS",
          "TRACE",
          "CONNECT"
        ]
      }
    },
    "allow_origin": {
      "type": "string"
    },
    "allow_credentials": {
      "type": "boolean"
    }
  }
}

const log = (type) => console.log.bind(console, type);


class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="col-sm-5">

        </div>
        <Form schema={schema}
              onChange={log("changed")}
              onSubmit={log("submitted")}
              onError={log("errors")} />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
