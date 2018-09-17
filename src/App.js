import React, { Component } from 'react';
// import { withAuthenticator, Authenticator, Greetings } from 'aws-amplify-react';
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';

import './App.css';
import Register from './components/Register';
import VerifyEmail from './components/VerifyEmail';
import UserPage from './components/UserPage';
import SignIn from './components/SignIn';
import ResetPasswordReq from './components/ResetPasswordReq';
import ResetPassword from './components/ResetPassword';
import NonUserHome from './components/NonUserHome';

Amplify.configure(aws_exports);

class App extends Component {
  // authState options: 'signIn', 'signUp', 'confirmSignUp', 'forgotPassword', "resetPassword", 'signedIn', 'signedOut'
  state = {
    authState: ''
  };

  componentDidMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.setState({ authState: 'signedIn' });
      })
      .catch(err => {
        console.log('ERROR >>>', err);
        this.setState({ authState: '' });
      });
  }

  render() {
    const { authState } = this.state;
    const props = { updateAuthState: this.updateAuthState };

    const appHeader = (
      <header className="App-header">
        <h1 className="App-title">
          <strong>Notee!</strong>
        </h1>
      </header>
    );

    let appPage;

    switch (authState) {
      case 'signUp':
        appPage = <Register {...props} />;
        break;
      case 'confirmSignUp':
        appPage = <VerifyEmail {...props} />;
        break;
      case 'signIn':
        appPage = <SignIn {...props} />;
        break;
      case 'forgotPassword':
        appPage = <ResetPasswordReq {...props} />;
        break;
      case 'resetPassword':
        appPage = <ResetPassword {...props} />;
        break;
      case 'signedIn':
        appPage = <UserPage />;
        break;
      case 'signedOut':
        appPage = <NonUserHome {...props} />;
        break;
      default:
        appPage = <NonUserHome {...props} />;
    }

    return (
      <div className="App">
        {appHeader}
        {appPage}
      </div>
    );
  }

  updateAuthState = newState => {
    this.setState({ authState: newState });
  };
}

// export default withAuthenticator(App, false, [<SignIn />]);
// export default withAuthenticator(App);
export default App;
