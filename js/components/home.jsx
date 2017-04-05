import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export class Home extends React.Component {
  render(){
    return <section className='content'>
        <div className='text-content'>
          <div><h1><div>Welcome to </div><div><span className='logo'> Find the Sun </span></div><div>app</div></h1></div>
          <p>
          With this app, you can find out where to go to enjoy your preferred weather.<br/>
          <br/>
          <span className='note'>Note:</span> This is a prototype of the app, which works optimally only for people who live in Warsaw, Poland. <br/>
          You can find out why in the <Link to="/about" className='link'>About</Link> section.<br/>
          <br/>
          However, you can still use the app if you don't live in Warsaw.
          </p>
          <Link to="/search" className='link'><button>Start</button></Link>
        </div>
      </section>
  }
}
