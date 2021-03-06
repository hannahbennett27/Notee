import React, { Component } from 'react';
import { Auth } from 'aws-amplify';

class SignOut extends Component {
  render() {
    return (
      // <div>
      //   <button
      //     type="button"
      //     className="btn btn-outline-primary"
      //     onClick={this.handleSignOut}
      //   >
      //     Sign Out
      //   </button>
      // </div>
      <a href="# " className="dropdown-item" onClick={this.handleSignOut}>
        Sign Out
      </a>
    );
  }

  handleSignOut = () => {
    Auth.signOut()
      .then(() => window.location.reload())
      .catch(err => console.log('ERROR >>>', err));
  };
}

export default SignOut;
