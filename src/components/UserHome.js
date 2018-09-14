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
        <div>
          <ul className="list-group mx-auto">
            {notes.map(note => {
              const titleRegExp = /([\D]+).txt/;
              const noteTitle = titleRegExp.exec(note.key)[1];

              return (
                <li key={note.eTag} className="list-group-item">
                  <p className="card-title">{noteTitle}</p>
                  <p className="card-subtitle mb-2 text-muted">
                    <small>
                      Last modified {note.lastModified.toDateString()}
                    </small>
                  </p>
                  <ul>
                    <li className="card-text">
                      <small>Content preview...?</small>
                    </li>
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
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

  // testGetFile = () => {
  //   Storage.get('testThree.txt', { level: 'private' })
  //     .then(fileURL => fetch(fileURL))
  //     .then(res => {
  //       console.log(res);
  //       return res.json();
  //     })
  //     .then(fileData => console.log(fileData))
  //     .catch(err => console.log('ERROR >>>', err));
  // };
}

export default UserHome;
