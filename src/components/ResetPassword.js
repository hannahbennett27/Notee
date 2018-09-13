import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class ResetPassword extends Component {
  state = {
    email: '',
    verificationCode: '',
    passwordOne: '',
    passwordTwo: ''
  };

  render() {
    const { updateAuthState } = this.props;

    const resetPasswordForm = (
      <div className="card">
        <div className="card-body">
          <form>
            <p>
              <strong>Reset your password</strong>
            </p>
            <p>
              <small>
                Enter the code you received from Notee by email and set a new
                password
              </small>
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
                className="form-control"
                placeholder="Verification Code*"
                name="verificationCode"
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
                onClick={this.handlePasswordReset}
              >
                Submit
              </button>
            </div>
            {/* <div>
              <p>
                <a href="#" onClick={() => updateAuthState('signIn')}>
                 TBC: Resend Code
                </a>
              </p>
            </div> */}
          </form>
        </div>
      </div>
    );

    return resetPasswordForm;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handlePasswordReset = () => {
    const { email, verificationCode, passwordOne, passwordTwo } = this.state;
    const { updateAuthState } = this.props;

    if (passwordOne === passwordTwo) {
      Auth.forgotPasswordSubmit(email, verificationCode, passwordOne)
        .then(() => {
          Auth.signIn(email, passwordOne);
        })
        .then(user => {
          updateAuthState('signedIn');
        })
        .catch(err => console.log('ERROR >>>', err));
    }
  };
}

export default ResetPassword;
