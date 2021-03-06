import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import UserHomeNavBar from './UserHomeNavBar';

class UserHome extends Component {
  state = {
    search: '',
    sort: '',
    notes: []
  };

  componentDidMount = () => {
    Storage.list('', { level: 'private' })
      .then(result => {
        this.setState({ notes: result });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { search, notes } = this.state;
    const { changePage } = this.props;

    return (
      <div>
        <UserHomeNavBar
          searchState={search}
          handleChange={this.handleChange}
          handleSearch={this.handleSearch}
          handleSort={this.handleSort}
          changePage={changePage}
        />

        <ul className="list-group mx-auto">
          {notes.map(note => {
            const titleRegExp = /(\D+).txt/;
            const noteTitle = titleRegExp.exec(note.key)[1];

            return (
              <button
                key={note.eTag}
                className="note-title-btn btn btn-link"
                value={note.key}
                onClick={this.handleNoteClick}
              >
                <li className="list-group-item">
                  <p className="card-title">
                    <strong>{noteTitle}</strong>
                  </p>

                  <p className="card-subtitle mb-2 text-muted">
                    <small>
                      Last modified {note.lastModified.toDateString()}
                    </small>
                  </p>
                  <ul className="list-unstyled">
                    <li className="card-text list-unstyled">
                      - Content preview...?
                    </li>
                    <li className="card-text list-unstyled">
                      - Content preview...?
                    </li>
                  </ul>
                </li>
              </button>
            );
          })}
        </ul>
      </div>
    );
  }

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSearch = () => {
    console.log(`Search: "${this.state.search}"`);
  };

  handleSort = e => {
    e.target.name === 'showAll'
      ? this.setState({ search: '', sort: e.target.name })
      : this.setState({ sort: e.target.name });
  };

  handleNoteClick = e => {
    const { changePage } = this.props;
    changePage(e.target.value);
  };
}

export default UserHome;
