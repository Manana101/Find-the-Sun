import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';

class Search extends React.Component{
  //TODO podział na subkomponenty!
  constructor(props){
    super(props);
    this.state={
      minTemp: '',
      maxTemp: '',
      area: 'Europe',
      fromDate: '',
      toDate: ''
    }
  }
  handleAreaChange = (event) => {
    this.setState({
      area: event.target.value
    })
  }
  handleMinTempChange = (event) => {
    this.setState({
      minTemp: event.target.value
    })
  }
  handleMaxTempChange = (event) => {
    this.setState({
      maxTemp: event.target.value
    })
  }
  handleFromDateChange = (event) => {
    this.setState({
      fromDate: event.target.value
    })
  }
  handleToDateChange = (event) => {
    this.setState({
      toDate: event.target.value
    })
  }
  handleSearchClick = (event) => {
    event.preventDefault();
    console.log('Szukamy na obszarze', this.state.area, 'miejsca o temperaturze pomiędzy', this.state.minTemp, 'a', this.state.maxTemp, 'stopni Celsjusza, w dniach od', this.state.fromDate, 'do', this.state.toDate);
  }
  render(){
    //TODO ograniczyć wybór dat do today-today+5
    //https://tiffanybbrown.com/2013/10/24/date-input-in-html5-restricting-dates-and-thought-for-working-around-limitations/
    //http://stackoverflow.com/questions/17182544/disable-certain-dates-from-html5-datepicker
    //http://stackoverflow.com/questions/23671407/restrict-future-dates-in-html-5-data-input

    //TODO walidacja:
    //max temp musi być większe od min temp, DateTo musi być później niż DateFrom
    //pola min i max nie mogą być puste, ew. dodać domyślne wartości
    //dodać dopuszczalny zakres min i max temp?

    return <div>
      <p>Find out where you can go to enjoy your dream weather!</p>
      <form>
      Search area:
      <select value={this.state.area} onChange={this.handleAreaChange}>
        <option value='Europe'>Europe</option>
        <option value='Albania'>Albania</option>
        <option value='Andorra'>Andorra</option>
        <option value='Armenia'>Armenia</option>
      </select><br/><br/>
      Min. temp. (Celsius): <input type='number' value={this.state.minTemp} onChange={this.handleMinTempChange}/><br/><br/>
      Max. temp. (Celsius): <input type='number' value={this.state.maxTemp} onChange={this.handleMaxTempChange}/><br/><br/>
      From: <input type='date' min='' max='' value={this.state.fromDate} onChange={this.handleFromDateChange}/><br/><br/>
    To*: <input type='date' min='' max='' value={this.state.toDate} onChange={this.handleToDateChange}/><br/><br/>
      *Sorry, we can check the weather max. 5 days from now<br/><br/>
      <button onClick={this.handleSearchClick}>Search</button>
      </form>
    </div>
  }
}

class Results extends React.Component{
  render(){
    return <div>{}</div>
  }
}

class Footer extends React.Component{
  //TODO? tu może być disclaimer, który się otwiera, tak jak na RW
  render(){
    return <div>{}</div>
  }
}

//TODO będzie trzeba stworzyć jakiś grid i to wszystko opakować w grid (RWD)
//TODO CSSy tzn Sass - zainstalować odpowiednie paczki. Jak to się podłącza? napisać sass.

class App extends React.Component{
  render(){
    return <div className='container'>
      <Search className='search'/>
      <Results className='results'/>
      <Footer className='footer'/>
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        // <App/>,
        document.getElementById('app')
    );
});
