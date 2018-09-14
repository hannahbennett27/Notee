import React, { Component } from 'react';
import UserHome from './UserHome';
import NewNote from './NewNote';

class UserPage extends Component {
  state = {
    page: 'NewNote'
  };

  render() {
    const { page } = this.state;

    switch (page) {
      case 'UserHome':
        return <UserHome changePage={this.changePage} />;
      case 'NewNote':
        return <NewNote changePage={this.changePage} />;
      default:
        return <UserHome />;
    }
  }

  changePage = e => {
    e.target.value === 'NewNote'
      ? this.setState({ page: 'NewNote' })
      : e.target.value === 'Back'
        ? this.setState({ page: 'UserHome' })
        : console.log('render note page');
  };
}

export default UserPage;
