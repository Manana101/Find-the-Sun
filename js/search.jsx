import React from 'react';
import ReactDOM from 'react-dom';

//dostaje w propsach: <Search formInfoFn={this.formInfoFn}/>
export class Search extends React.Component{
  constructor(props){
    super(props);
    this.state={
      minTemp: '',
      maxTemp: '',
      fromDate: '',
      toDate: '',
      formOk: true
    }
  }
  //funkcje obsługujące formularz:
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
    //walidacja formularza - wywołuję osobną funkcję
    let isFormOk = this.checkFormOk(); //wynik to true lub false
    //jeśli formularz jest wypełniony niepoprawnie, zmień formOk w state na false - co spowoduje wyświetlenie odpowiedniej informacji
    if (isFormOk === false){
      console.log('formOk z if w handleSearchClick w komponencie Search', isFormOk);
      this.setState({
        formOk: false
      });
      //oraz przekaż rodzicowi, że został wysłany niepoprawny formularz - jeśli otrzymałeś w propsie funkcję
      if ( typeof this.props.formInfoFn === 'function' ){
        this.props.formInfoFn(this.state.formOk, this.state.minTemp, this.state.maxTemp, this.state.fromDate, this.state.toDate);
      }
    //jeśli formularz jest wypełniony poprawnie, zmień formOk w state na true - jeśli alert był wcześniej wyświetlony, to zniknie
    } else if (isFormOk === true){
      console.log('formOk z else w handleSearchClick w komponencie Search', isFormOk);
      this.setState({
        formOk: true
      });
      //oraz przekaż rodzicowi wyniki formularza - jeśli otrzymałeś w propsie funkcję
      if ( typeof this.props.formInfoFn === 'function' ){
        console.log('jestem w Search w wywołaniu funkcji z propsów z parametrami');
        this.props.formInfoFn(this.state.formOk, this.state.minTemp, this.state.maxTemp, this.state.fromDate, this.state.toDate);
      }
    };
  } //koniec handleSearchClick

  //walidacja formularza
  //TODO poprawić walidację - niech każdy element formularza ma swoją
  checkFormOk = () => {
    console.log('sprawdzanie formularza');
    let toDate = new Date(this.state.toDate);
    let fromDate = new Date(this.state.fromDate);
    let maxTemp = parseInt(this.state.maxTemp);
    let minTemp = parseInt(this.state.minTemp);
    if (toDate>=fromDate&&maxTemp>=minTemp&&this.state.toDate!=''&&this.state.fromDate!=''&&this.state.minTemp!=''&&this.state.maxTemp!='') {
      console.log('formOK');
      return true;
    } else {
      console.log('formNotOK');
      return false;
    }
  }
  render(){
    //obliczam zakres dni, który ma być możliwy do wybrania w input type='date'
    //TODO: wrzucić to gdzieś indziej...
    let today = new Date().toISOString().substring(0, 10);
    let todayMs = new Date(today).getTime();
    let oneDayInMs = 1000*60*60*24;
    let todayPlus9Ms = todayMs + 9*oneDayInMs;
    let todayPlus9Date = new Date(todayPlus9Ms);
    let todayPlus9 = todayPlus9Date.toISOString().substring(0, 10);

    return <div id='search'>
      <h1>Hello, Warsovian!</h1>
      <h2>Find out where you can fly to enjoy your dream weather.</h2>
      <form>
        Min. temp. (Celsius): <input type='number' value={this.state.minTemp} onChange={this.handleMinTempChange}/><br/><br/>
        Max. temp. (Celsius): <input type='number' value={this.state.maxTemp} onChange={this.handleMaxTempChange}/><br/><br/>
        From: <input type='date' min={today} max={todayPlus9} value={this.state.fromDate} onChange={this.handleFromDateChange}/><br/><br/>
        To*: <input type='date' min={today} max={todayPlus9} value={this.state.toDate} onChange={this.handleToDateChange}/><br/><br/>
        *We can check the weather max. 10 days from now<br/><br/>
      <div>{this.state.formOk === false? 'Formularz wypełniony niepoprawnie' : ''}</div>
        <button onClick={this.handleSearchClick}>Search</button>
      </form>
    </div>;
  }//koniec render
}//koniec Search
