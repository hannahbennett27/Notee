import React, { Component } from 'react';

class NoteNavBar extends Component {
  render() {
    const { changePage } = this.props;

    return (
      <nav className="navbar navbar-light bg-light">
        <div className="input-group-prepend">
          <button
            className="btn bg-light"
            type="button"
            value="Back"
            onClick={changePage}
          >
            Back
          </button>
        </div>

        <div className="input-group-append">
          <button
            type="button"
            className="btn bg-light"
            //   onClick={handle...}
          >
            Info
          </button>
          <button
            type="button"
            className="btn bg-light"
            //   onClick={handle...}
          >
            Edit
          </button>
          <button
            type="button"
            className="btn bg-light"
            //   onClick={handle...}
          >
            Delete
          </button>
        </div>
      </nav>
    );
  }
}

export default NoteNavBar;
