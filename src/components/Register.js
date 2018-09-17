import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
const uuidv1 = require('uuid/v1');

class Register extends Component {
  state = {
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: ''
  };

  render() {
    const { updateAuthState } = this.props;

    const registrationForm = (
      <div className="card mx-auto">
        <div className="card-body">
          <form>
            <p>
              <strong>Create a new account</strong>
            </p>
            <div className="form-group">
              <input
                className="form-control"
                placeholder="Full Name*"
                name="name"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email*"
                name="email"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                aria-describedby="passwordHelp"
                placeholder="Password*"
                name="passwordOne"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                aria-describedby="passwordHelp"
                placeholder="Confirm Password*"
                name="passwordTwo"
                onChange={this.handleChange}
              />
              <small id="passwordHelp" className="form-text text-muted">
                Your password must be a minimum of 8 characters long
              </small>
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleRegister}
              >
                Create Account
              </button>
            </div>
            <div>
              <p className="bottom-p-tag">
                Have an account?{' '}
                <a href="# " onClick={() => updateAuthState('signIn')}>
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );

    return registrationForm;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = () => {
    const { name, email, passwordOne, passwordTwo } = this.state;
    const { updateAuthState } = this.props;

    if (passwordOne === passwordTwo) {
      Auth.signUp({
        username: email,
        password: passwordOne,
        attributes: {
          name,
          email,
          'custom:UUID': uuidv1()
        }
      })
        .then(res => {
          updateAuthState('confirmSignUp');
        })
        .catch(err => console.log('ERROR >>>', err));
    }
  };
}

export default Register;
