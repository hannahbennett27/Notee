import React, { Component } from 'react';

class NonUserHome extends Component {
  render() {
    const { updateAuthState } = this.props;

    return (
      <div>
        {/* FIX FLEX DISPLAY MALARKEY! */}
        <div>
          <a
            className="p-2 flex-fill"
            href="#"
            onClick={() => updateAuthState('signUp')}
          >
            Create Account
          </a>
          <a
            className="p-2 flex-fill"
            href="#"
            onClick={() => updateAuthState('signIn')}
          >
            Sign In
          </a>
        </div>
        <div>
          <ul class="list-group">
            <li class="list-group-item">Notee Spiel Here...</li>
            <li class="list-group-item">Dapibus ac facilisis in</li>
            <li class="list-group-item">Morbi leo risus</li>
            <li class="list-group-item">Porta ac consectetur ac</li>
            <li class="list-group-item">Vestibulum at eros</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NonUserHome;
