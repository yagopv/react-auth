import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import {connect} from 'react-redux';

class Signin extends Component {
  handleFormSubmit({email, password}) {
    this.props.signinUser({email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger m-t-1">
          <strong>Ooops!!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <label>Email</label>
          <Field name="email" component="input" type="email" className="form-control" />
        </fieldset>

        <fieldset className="m-t-1">
          <label>Password:</label>
          <Field name="password" component="input" type="password" className="form-control" />
        </fieldset>

        {this.renderAlert()}

        <div className="m-t-1">
          <button action="submit" className="btn btn-primary">Sign in</button>
        </div>
      </form>
    )
  }
}


const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.auth.error
})

export default reduxForm({
  form: 'signin'
})(
  connect(mapStateToProps, actions)(Signin)
);

