import React from 'react';
import ReactDOM from 'react-dom';

export class Author extends React.Component {
  render(){
    return <section className='content'>
      <div className='text-content'>
        <h1>
          My name is Manana.
        </h1>
        <p>
          I started learning web development in January 2017, and this is my very first project.
        </p>
        <p>
          I would really like to hear your feedback!
        </p>
        <p>
          If you have any suggestions, please contact me via <a href='https://github.com/Manana101' target='blank'>GitHub</a> or <a href='https://www.linkedin.com/in/mananajaworska/' target='blank'>LinkedIn</a>.
        </p>
      </div>
      </section>
  }
}
