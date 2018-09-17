import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import NoteNavBar from './NoteNavBar';

class Note extends Component {
  state = { activeNote: { created_at: '', subnotes: [] } };

  componentDidMount = () => {
    const { activeNoteFilename } = this.props;

    Storage.get(activeNoteFilename, { level: 'private' })
      .then(fileURL => fetch(fileURL))
      .then(res => {
        return res.json();
      })
      .then(fileData => this.setState({ activeNote: fileData }))
      .catch(err => console.log('ERROR >>>', err));
  };

  render() {
    const { changePage, activeNoteFilename } = this.props;
    const {
      activeNote: { created_at, subnotes }
    } = this.state;
    const titleRegExp = /(\D+).txt/;
    const noteTitle = titleRegExp.exec(activeNoteFilename)[1];

    return (
      <div>
        <NoteNavBar changePage={changePage} />
        <ul className="list-group mx-auto">
          <li className="list-group-item">
            <p className="card-title">
              <strong>{noteTitle}</strong>
            </p>
            {subnotes.map((subnote, index) => {
              return (
                <li key={index} className="card-text list-unstyled">
                  - {subnote}
                </li>
              );
            })}
            <form>
              <textarea
                className="form-control"
                rows="2"
                placeholder="- Add bullet point..."
              />
            </form>
          </li>
        </ul>
      </div>
    );
  }
}

export default Note;
