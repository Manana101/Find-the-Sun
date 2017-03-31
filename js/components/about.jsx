import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

export class About extends React.Component {
  render(){
    return <section className='content'>
      <div className='text-content'>
        <h1>About the app</h1>
        <h2 className='question'>How does it work?</h2>
        <p className='answer'>
          When you click on the search button, we search through a list of destinations, for each one of them checking if the weather forecast for the period you specified matches your criteria.<br/>
          If you would like to know the details, you can read the <a href='https://github.com/Manana101/coders_lab_final_project/blob/master/README.md' target='blank'>docs</a>.
        </p>
        <h2 className='question'>What destinations are searched through?</h2>
        <p className='answer'>
          Because of the limited access to the weather forecast API, for the time being only 73 cities are searched through<br/>
        (you can find the full list <Link to="/about/destinations" className='link'>here</Link>). These particular destinations were chosen because they can be reached from Warsaw, Poland, with a direct, low-cost flight (i.e. with Wizzair or Ryanair, as of 12/03/2017). This is the reason why the app only works optimally for people who live in Warsaw.
        </p>
        <h2 className='question'>How do you check weather forecasts?</h2>
        <p className='answer'>
          Weather forecasts are taken from <a href='https://www.apixu.com/' target='blank'>Apixu.com</a> weather API. Because of the limited access to the API, forecasts are checked only once per day. After being checked for the first time on a given day, forecasts are storred in our local database for the rest of the day. Therefore, you might find more actual weather forecasts if you connect to the API directly.
        </p>
        <h2 className='question'>Why I'm getting an error?</h2>
        <p className='answer'>
          It is possible that the limit of the weather API usage for this app for a given month has been reached.<br/>
          We are terribly sorry!
        </p>
      </div>
      </section>
  }
}
