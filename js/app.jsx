import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
import {Search} from './search.jsx';
import {Results} from './results.jsx';

class Home extends React.Component{
  constructor(props){
    super(props);
    //TODO: sprawdzić, czy działa przekazywanie informacji bez użycia state (czy results będzie się updejtował)
    this.state={
      minTemp: '',
      maxTemp: '',
      fromDate: '',
      toDate: '',
      formOk: false
    }
  }
  //funkcja do odbierania od Search informacji:
  formInfoFn = (formOkfromSearch, minTempFromSearch, maxTempFromSearch, fromDateFromSearch, toDateFromSearch) => {
  console.log('jestem w home w odebraniu parametrów');
    this.setState({
      minTemp: minTempFromSearch,
      maxTemp: maxTempFromSearch,
      fromDate: fromDateFromSearch,
      toDate: toDateFromSearch,
      formOk: formOkfromSearch
    })
  }
  //TODO: dodaj warunek, by results nie był w ogóle renderowany, jeśli this.state.formOk === false
  render(){
    return <div className="container main-container">
      <section className='content'>
        <Search formInfoFn={this.formInfoFn}/>
        <Results minTemp={this.state.minTemp} maxTemp={this.state.maxTemp} fromDate={this.state.fromDate} toDate={this.state.toDate} formOk={this.state.formOk}/>
      </section>
    </div>
  }
}

class Header extends React.Component {
  render(){
    return   <header>
        <div className="container header-container">
          <div className='logo'>
            Find the Sun
          </div>
          <nav>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Author</li>
            </ul>
          </nav>
        </div>
      </header>;
  }
}

class Main extends React.Component {
  render(){
    return <main>
      {this.props.children}
    </main>;
  }
}

//TODO? tu może być disclaimer, który się otwiera, tak jak na RW
class Footer extends React.Component {
  render(){
    return <footer>
            <div className='container footer-container'>
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


class App extends React.Component {
  render(){
    return <div id='site'>
      <Header/>
      <Main>
            <Home/>
      </Main>
      <Footer/>
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
