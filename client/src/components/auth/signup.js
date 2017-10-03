import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit({email, password, passwordConfirm}) {
    this.props.signupUser({email, password});
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

  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset>
          <Field label="Email" name="email" component="input" type="email" component={this.renderField} className="form-control" />
        </fieldset>

        <fieldset className="m-t-1">
          <Field label="Password" name="password" component="input" type="password" component={this.renderField} className="form-control" />          
        </fieldset>

        <fieldset className="m-t-1">          
          <Field label="Confirm Password" name="passwordConfirm" component="input" type="password" component={this.renderField} className="form-control" />
        </fieldset>

        {this.renderAlert()}

        <div className="m-t-1">
          <button action="submit" className="btn btn-primary">Sign up</button>
        </div>
      </form>
    )
  }
}

const validate = (formProps) => {
  const errors = {};  

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }  

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an password confirmation';
  }    

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

const mapStateToProps = (state, ownProps) => ({
  errorMessage: state.auth.error
})

export default reduxForm({
  form: 'signup',
  validate
})(
  connect(mapStateToProps, actions)(Signup)
);

