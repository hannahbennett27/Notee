import React from 'react';
import SignOut from './SignOut';

const NavBar = ({ searchState, handleChange, handleSearch, handleSort }) => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="nav-item dropdown">
        <a
          className="nav-link dropdown-toggle"
          id="navbarDropdownMenuLink"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          ...
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a className="dropdown-item">Home</a>
          <a className="dropdown-item">Account</a>
          <SignOut />
        </div>
      </div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          aria-label="Text input with segmented dropdown button"
          placeholder="Search"
          value={searchState}
          onChange={handleChange}
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={handleSearch}
          >
            Go!
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" name="showAll" onClick={handleSort}>
              Show All
            </a>
            <a className="dropdown-item" name="sortAZ" onClick={handleSort}>
              Sort A-Z
            </a>
            <a className="dropdown-item" name="sortZA" onClick={handleSort}>
              Sort Z-A
            </a>
            <a
              className="dropdown-item"
              name="newestFirst"
              onClick={handleSort}
            >
              Newest First
            </a>
            <a
              className="dropdown-item"
              name="oldestFirst"
              onClick={handleSort}
            >
              Oldest First
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
