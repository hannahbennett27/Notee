import React, { Component } from 'react';

class NonUserHome extends Component {
  render() {
    const { updateAuthState } = this.props;

    return (
      <div>
        <nav className="navbar navbar-dark d-flex justify-content-around">
          <a href="#" onClick={() => updateAuthState('signUp')}>
            Create Account
          </a>
          <a href="#" onClick={() => updateAuthState('signIn')}>
            Sign In
          </a>
        </nav>
        <ul className="list-group mx-auto">
          <li className="list-group-item">
            <br />
            Notee screenshots here...
            <br />
            <br />
            <br />
          </li>
          <li className="list-group-item">
            <br />
            Notee spiel here...
            <br />
            <br />
            <br />
          </li>
          <li className="list-group-item">
            <br />
            Notee features here...
            <br />
            <br />
            <br />
          </li>
        </ul>
      </div>
    );
  }
}

export default NonUserHome;
