import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class ResetPasswordReq extends Component {
  state = {
    email: ''
  };

  render() {
    const { updateAuthState } = this.props;

    const resetPasswordRequestForm = (
      <div className="card mx-auto">
        <div className="card-body">
          <form>
            <p>
              <strong>Reset your password</strong>
            </p>
            <p>
              <small>
                You will receive a verification code from Notee by email to
                reset your password
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
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleResetPasswordReq}
              >
                Send Code
              </button>
            </div>
            <div>
              <p className="bottom-p-tag">
                <a href="#" onClick={() => updateAuthState('signIn')}>
                  Back to Sign In
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    );

    return resetPasswordRequestForm;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleResetPasswordReq = () => {
    const { email } = this.state;
    const { updateAuthState } = this.props;

    Auth.forgotPassword(email)
      .then(data => {
        updateAuthState('resetPassword');
      })
      .catch(err => console.log('ERROR >>>', err));
  };
}

export default ResetPasswordReq;
