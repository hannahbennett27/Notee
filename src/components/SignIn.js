import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  render() {
    const { updateAuthState } = this.props;

    const signInForm = (
      <div className="card mx-auto">
        <div className="card-body">
          <form>
            <p>
              <strong>Sign in to your account</strong>
            </p>
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
                aria-describedby="forgotPasswordHelp"
                placeholder="Password*"
                name="password"
                onChange={this.handleChange}
              />
              <small id="passwordHelp" className="form-text text-muted">
                <a href="#" onClick={() => updateAuthState('forgotPassword')}>
                  Forgot your password?
                </a>
              </small>
            </div>
            <div className="form-group">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleSignIn}
              >
                Sign In
              </button>
            </div>
            <div>
              <p>
                No account?{' '}
                <a href="#" onClick={() => updateAuthState('signUp')}>
                  Create account
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );

    return signInForm;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignIn = () => {
    const { email, password } = this.state;
    const { updateAuthState } = this.props;

    Auth.signIn(email, password)
      .then(user => {
        updateAuthState('signedIn');
      })
      .catch(err => console.log('ERROR >>>', err));
  };
}

export default SignIn;
