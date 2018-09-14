import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class VerifyEmail extends Component {
  state = {
    email: '',
    verificationCode: ''
  };

  render() {
    const verificationForm = (
      <div className="card mx-auto">
        <div className="card-body">
          <form>
            <p>
              <strong>Verify your account</strong>
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
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.handleVerification}
              >
                Verify
              </button>
            </div>
          </form>
        </div>
      </div>
    );

    return verificationForm;
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleVerification = e => {
    const { email, verificationCode } = this.state;
    const { updateAuthState } = this.props;

    Auth.confirmSignUp(email, verificationCode)
      .then(res => {
        updateAuthState('signedIn');
      })
      .catch(err => console.log('ERROR >>>', err));
  };
}

export default VerifyEmail;
