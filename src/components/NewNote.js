import React, { Component } from 'react';
import NoteNavBar from './NoteNavBar';

class NewNote extends Component {
  state = { newTitle: '' };

  render() {
    const { changePage } = this.props;

    return (
      <div>
        <NoteNavBar changePage={changePage} />
        <form>
          <div className="form-group mx-auto">
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
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
    this.setState({ newTitle: e.target.value });
  };

  handleEnter = e => {
    if (e.which === 13) {
      console.log('SUBMIT! Create file...');
      console.log("Redirect to 'add bullet point' page...");
    }
  };
}

// testPutFile = () => {
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
