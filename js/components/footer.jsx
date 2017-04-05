import React from 'react';
import ReactDOM from 'react-dom';

export class Footer extends React.Component {
  render(){
    return <footer>
            <div className='footer-container'>
                <div id='disclaimer'>
                  Disclaimer: Results are based on a weather forecast. Weather forecasts do not always come true. Please don't blame us for ruining your holiday :)
                </div>
                <div id='powered'>
                  Powered by <a href='https://www.apixu.com/' target='blank'>Apixu.com</a>
                </div>
            </div>
          </footer>;
  }
}
