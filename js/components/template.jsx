import React from 'react';
import ReactDOM from 'react-dom';
import {Header} from './header.jsx';
import {Footer} from './footer.jsx';

export class Template extends React.Component {
  render(){
    return <div id='site'>
      <Header/>
      <main>
        <div className="container main-container">
          {this.props.children}
        </div>
      </main>
      <Footer/>
    </div>
  }
}
