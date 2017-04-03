import React from 'react';
import ReactDOM from 'react-dom';

//dostaje w propsach: <Form formInfoFn={this.formInfoFn}/>
export class Form extends React.Component{
  constructor(props){
    super(props);
    this.oneDayInMs = 1000*60*60*24;
    let todayMs = Date.now();
    this.todayDays = Math.floor(todayMs/this.oneDayInMs); //in days instead of ms
    this.todayDaysPlus9 = this.todayDays + 9; //in days instead of ms
    // console.log(this.todayDays);
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
    //obliczam zakres dni, który ma być możliwy do wybrania w input type='date' (tutaj, bo chcę to przekazać w propsach do results)
    // console.log(this.state.toDate);
    // console.dir(this.state.toDate);
    // console.log(this.state.fromDate);

    let toDateMs = new Date(this.state.toDate).getTime();
    let toDateDays = Math.floor(toDateMs/this.oneDayInMs); //in days instead of ms
    let fromDateMs = new Date(this.state.fromDate).getTime();
    let fromDateDays = Math.floor(fromDateMs/this.oneDayInMs); //in days instead of ms
    //
    // console.log('toDate: ', toDate);
    // console.log('fromDate: ', fromDate);
    // console.log('today: ', today);
    // console.log('todayPlus9: ', todayPlus9);

    //walidacja formularza - wywołuję osobną funkcję
    let isFormOk = this.checkFormOk(toDateDays, fromDateDays, this.todayDays, this.todayDaysPlus9); //wynik to true lub false
    //jeśli formularz jest wypełniony niepoprawnie, zmień formOk w state na false - co spowoduje wyświetlenie odpowiedniej informacji
    if (isFormOk === false){
      // console.log('formOk z if w handleSearchClick w komponencie Form', isFormOk);
      this.setState({
        formOk: false
      });
      //oraz przekaż rodzicowi, że został wysłany niepoprawny formularz - jeśli otrzymałeś w propsie funkcję
      if ( typeof this.props.formInfoFn === 'function' ){
        this.props.formInfoFn(false, this.state.minTemp, this.state.maxTemp, this.state.fromDate, this.state.toDate, toDateDays, fromDateDays, this.todayDays, this.todayDaysPlus9);
      }
    //jeśli formularz jest wypełniony poprawnie, zmień formOk w state na true - jeśli alert był wcześniej wyświetlony, to zniknie
    } else if (isFormOk === true){
      // console.log('formOk z else w handleSearchClick w komponencie Form', isFormOk);
      this.setState({
        formOk: true
      });
      //oraz przekaż rodzicowi wyniki formularza - jeśli otrzymałeś w propsie funkcję
      if ( typeof this.props.formInfoFn === 'function' ){
        // console.log('jestem w Form w wywołaniu funkcji z propsów z parametrami');
        this.props.formInfoFn(true, this.state.minTemp, this.state.maxTemp, this.state.fromDate, this.state.toDate, toDateDays, fromDateDays, this.todayDays, this.todayDaysPlus9);
      }
    };
  } //koniec handleSearchClick

  //walidacja formularza
  //TODO poprawić walidację - niech każdy element formularza ma swoją
  checkFormOk = (toDate, fromDate, today, todayPlus9) => {
    // console.log('sprawdzanie formularza');
    let maxTemp = parseInt(this.state.maxTemp);
    let minTemp = parseInt(this.state.minTemp);
    if (toDate<=todayPlus9&&fromDate>=today&&toDate>=fromDate&&maxTemp>=minTemp&&this.state.toDate!=''&&this.state.fromDate!=''&&this.state.minTemp!=''&&this.state.maxTemp!='') {
      // console.log('formOK');
      return true;
    } else {
      // console.log('formNotOK');
      return false;
    }
  }//koniec checkFormOk
  render(){
    //obliczam zakres dni, który ma być możliwy do wybrania w input type='date'
    let today = new Date(this.todayDays*this.oneDayInMs).toISOString().substring(0, 10);
    let todayPlus9 = new Date(this.todayDaysPlus9*this.oneDayInMs).toISOString().substring(0, 10);
    return <div id='form'>
      <h1>Hello, Warsovian!</h1>
      <h2>Find out where you can fly to enjoy your dream weather.</h2>
      <form id='search-form'>
        <div className='form-half form-left'>
          <div className='form-item'>
            <label htmlFor="min-temp-input">Min. temp. (Celsius):</label>
            <input type='number' value={this.state.minTemp} onChange={this.handleMinTempChange} id='min-temp-input' />
          </div>
          <div className='form-item'>
            <label htmlFor="max-temp-input">Max. temp. (Celsius):</label>
            <input type='number' value={this.state.maxTemp} onChange={this.handleMaxTempChange} id='max-temp-input'/>
          </div>
        </div>
        <div className='form-half form-right'>
          <div className='form-item'>
            <label htmlFor="from-date-input">From:</label>
            <input type='date' min={today} max={todayPlus9} value={this.state.fromDate} onChange={this.handleFromDateChange} id='from-date-input' placeholder='yyyy-mm-dd'/>
          </div>
          <div className='form-item'>
            <label htmlFor="to-date-input">To*:</label>
            <input type='date' min={today} max={todayPlus9} value={this.state.toDate} onChange={this.handleToDateChange} id='to-date-input' placeholder='yyyy-mm-dd'/>
          </div>
          <p>*We can check the weather for max. 10 days from now</p>
        </div>
        <div className='search-bar'>
          <div className='alert'>
            {this.state.formOk === false? <p>
              <ul> Incorrect form! Please make sure that:
                <li key='all-questions'>- all the questions are answered</li>
                <li key='temps-logic'>- 'Max. temp' is higher or equal to 'Min. temp'</li>
                <li key='dates-logic'>- 'To' date is later or equal to 'From' date</li>
                <li key='dates-format'>- both dates are in the suggested format</li>
                <li key='dates-between'>- both dates are between {today} and {todayPlus9}</li>
              </ul>
            </p> : ''}
          </div>
          <div className='button-div'>
            <button onClick={this.handleSearchClick} id='search-button'>Search</button>
          </div>
        </div>
      </form>
    </div>;
  }//koniec render
}//koniec Form
