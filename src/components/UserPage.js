import React, { Component } from 'react';
import UserHome from './UserHome';
import Note from './Note';
import NewNote from './NewNote';
import EditNote from './EditNote';

class UserPage extends Component {
  // page options: 'UserHome', 'NewNote', ':note-key' (NotePage)
  state = {
    page: 'Test Note One.txt'
  };

  render() {
    const { page } = this.state;
    const noteRegExp = /\D+.txt/;

    switch (page) {
      case 'UserHome':
        return <UserHome changePage={this.changePage} />;
      case 'NewNote':
        return <NewNote changePage={this.changePage} />;
      default:
        return noteRegExp.test(page) ? (
          <Note
            activeNoteFilename={this.state.page}
            changePage={this.changePage}
          />
        ) : (
          <UserHome />
        );
    }
  }

  changePage = e => {
    !e.target
      ? this.setState({ page: e })
      : e.target.value === 'NewNote'
        ? this.setState({ page: 'NewNote' })
        : this.setState({ page: 'UserHome' });
  };
}

export default UserPage;
