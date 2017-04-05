import React from 'react';
import ReactDOM from 'react-dom';
import {IndexLink, Link} from 'react-router';

//TODO: linki, linkActive
export class Header extends React.Component {
  render(){
    return   <header>
        <div className="header-container">
          <div className='logo'>
            <Link to="/" className='link'>Find the Sun</Link>
          </div>
          <nav>
            <ul>
              <li key='search'><IndexLink to="/search" className='link' activeClassName="active">Search</IndexLink></li>
              <li key='about'><IndexLink to="/about" className='link' activeClassName="active">About</IndexLink></li>
              <li key='author'><IndexLink to="/author" className='link' activeClassName="active">Author</IndexLink></li>
            </ul>
          </nav>
        </div>
      </header>;
  }
}
