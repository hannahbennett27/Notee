import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import NoteNavBar from './NoteNavBar';

class Note extends Component {
  state = { activeNote: { subnotes: [] }, newSubnote: '' };

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
      activeNote: { subnotes },
      newSubnote
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
            <ul className="list-unstyled">
              {subnotes.map((subnote, index) => {
                return (
                  <li key={index} className="card-text list-unstyled">
                    - {subnote}
                  </li>
                );
              })}
            </ul>
            <form>
              <textarea
                className="form-control"
                rows="2"
                placeholder="- Add bullet point..."
                value={newSubnote}
                onChange={this.handleChange}
                onKeyPress={this.handleEnter}
              />
            </form>
          </li>
        </ul>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ newSubnote: e.target.value });
  };

  handleEnter = e => {
    const { activeNoteFilename } = this.props;
    const { activeNote, newSubnote } = this.state;

    if (e.which === 13) {
      const updatedNote = activeNote;
      updatedNote.subnotes.push(newSubnote);

      Storage.put(`${activeNoteFilename}`, JSON.stringify(updatedNote), {
        level: 'private',
        contentType: 'JSON'
      })
        .then(result => {
          this.setState({ newSubnote: '' });
        })
        .catch(err => console.log(err));
    }
  };
}

export default Note;
