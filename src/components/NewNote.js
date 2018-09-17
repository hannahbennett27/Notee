import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import NoteNavBar from './NoteNavBar';

class NewNote extends Component {
  state = { newNoteTitle: '' };

  render() {
    const { changePage } = this.props;

    return (
      <div>
        <NoteNavBar changePage={changePage} />
        <ul className="list-group mx-auto">
          <li className="list-group-item">
            <input
              type="text"
              className="form-control"
              placeholder="Note Title"
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
            />
            <p />
            <textarea
              className="form-control"
              id="disabledInput"
              rows="2"
              placeholder="Add bullet point..."
              disabled
            />
          </li>
        </ul>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ newNoteTitle: e.target.value });
  };

  handleEnter = e => {
    const { newNoteTitle } = this.state;
    const { changePage } = this.props;

    if (e.which === 13) {
      // CHECK IF FILENAME ALREADY EXISTS
      Storage.list(`${newNoteTitle}.txt`, { level: 'private' })
        .then(result => {
          if (result.length) {
            throw new Error('username exists');
          } else {
            return Storage.put(
              `${newNoteTitle}.txt`,
              JSON.stringify({
                created_at: Date.now(),
                subnotes: []
              }),
              {
                level: 'private',
                contentType: 'JSON'
              }
            );
          }
        })
        .then(result => {
          changePage(result.key);
        })
        .catch(err => console.log('ERROR >>>', err));
    }
  };
}

export default NewNote;
