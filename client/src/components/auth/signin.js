import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <label>Email:</label>
          <Field name="email" component="input" type="email" className="form-control" />
        </fieldset>

        <fieldset>
          <label>Password:</label>
          <Field name="password" component="input" type="password" className="form-control" />
        </fieldset>

        <div>
          <button action="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: 'signin'
})(
  connect(null, actions)(Signin)
);

