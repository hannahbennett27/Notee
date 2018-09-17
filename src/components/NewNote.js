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
        <form>
          <div className="form-group mx-auto">
            <input
              type="text"
              className="form-control"
              // id="exampleFormControlInput1"
              placeholder="Note Title"
              onChange={this.handleChange}
              onKeyPress={this.handleEnter}
            />
          </div>
          <div className="form-group mx-auto">
            <textarea
              className="form-control"
              id="disabledInput"
              rows="2"
              placeholder="Add bullet point..."
              disabled
            />
          </div>
        </form>
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
      Storage.put(
        `${newNoteTitle}.txt`,
        JSON.stringify({
          created_at: Date.now(),
          subnotes: []
        }),
        {
          level: 'private',
          contentType: 'JSON'
        }
      )
        .then(result => {
          console.log('File created! >>>', result);
          changePage(result.key);
        })
        .catch(err => console.log(err));
    }
  };
}

// const testPutFile = () => {
//   Storage.put(
//     'Test Note One.txt',
//     JSON.stringify({
//       created_at: 'timestamp01',
//       subnotes: [
//         'First note bullet point',
//         'And a second one...',
//         'And a third!'
//       ]
//     }),
//     {
//       level: 'private',
//       contentType: 'JSON'
//     }
//   )
//     .then(result => console.log(result))
//     .catch(err => console.log(err));
// };

export default NewNote;
