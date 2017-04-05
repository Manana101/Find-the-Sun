import React from 'react';
import ReactDOM from 'react-dom';

export class Form extends React.Component{
  constructor(props){
    super(props);
    this.oneDayInMs = 1000*60*60*24;
    let todayMs = Date.now();
    this.todayDays = Math.floor(todayMs/this.oneDayInMs);
    this.todayDaysPlus9 = this.todayDays + 9;
    this.state={
      minTemp: '',
      maxTemp: '',
      fromDate: '',
      toDate: '',
      formOk: true,
      datesOk: true
    }
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
    let toDateMs = new Date(this.state.toDate).getTime();
    let toDateDays = Math.floor(toDateMs/this.oneDayInMs);
    let fromDateMs = new Date(this.state.fromDate).getTime();
    let fromDateDays = Math.floor(fromDateMs/this.oneDayInMs);
    let isFormOk = this.checkFormOk(toDateDays, fromDateDays, this.todayDays, this.todayDaysPlus9);
    if (isFormOk === false){
      this.setState({
        formOk: false
      });
      if ( typeof this.props.formInfoFn === 'function' ){
        this.props.formInfoFn(false, this.state.minTemp, this.state.maxTemp, this.state.fromDate, this.state.toDate, toDateDays, fromDateDays, this.todayDays, this.todayDaysPlus9);
      }
    } else if (isFormOk === true){
      let areDatesCorrect = this.checkDatesCorrect(toDateDays, fromDateDays);
      if (areDatesCorrect === false) {
        this.setState({
          formOk: true,
          datesOk: false
        });
      } else if (areDatesCorrect === true) {
        this.setState({
          formOk: true,
          datesOk: true
        });
        if ( typeof this.props.formInfoFn === 'function' ){
          this.props.formInfoFn(true, this.state.minTemp, this.state.maxTemp, this.state.fromDate, this.state.toDate, toDateDays, fromDateDays, this.todayDays, this.todayDaysPlus9);
        }
      }
    };
  }
  checkFormOk = (toDate, fromDate, today, todayPlus9) => {
    let maxTemp = parseInt(this.state.maxTemp);
    let minTemp = parseInt(this.state.minTemp);
    if (toDate<=todayPlus9&&fromDate>=today&&toDate>=fromDate&&maxTemp>=minTemp&&this.state.toDate!=''&&this.state.fromDate!=''&&this.state.minTemp!=''&&this.state.maxTemp!='') {
      return true;
    } else {
      return false;
    }
  }
  checkDatesCorrect = (toDateDays, fromDateDays) => {
    let startDay = fromDateDays - this.todayDays;
    let endDay = toDateDays - this.todayDays;
    if (startDay === undefined || startDay < 0 || startDay > 9 || endDay === undefined || endDay < 0 || endDay > 9){
      return false;
    } else {
      return true;
    }
  }
  render(){
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
        <div className='form-between'>
        </div>
        <div className='form-half form-right'>
          <div className='form-item'>
            <label htmlFor="from-date-input">From:</label>
            <input type='date' min={today} max={todayPlus9} value={this.state.fromDate} onChange={this.handleFromDateChange} id='from-date-input' placeholder='yyyy-mm-dd'/>
          </div>
          <div className='form-between'>
          </div>
          <div className='form-item'>
            <label htmlFor="to-date-input">To*:</label>
            <input type='date' min={today} max={todayPlus9} value={this.state.toDate} onChange={this.handleToDateChange} id='to-date-input' placeholder='yyyy-mm-dd'/>
          </div>
          <div className='form-p'><p>*We can check the weather for max. 10 days from now</p></div>
        </div>
        <div className='search-bar'>
          <div className='alert'>
            {this.state.formOk === false? <ul> Incorrect form! Please make sure that:
                <li key='all-questions'>- all the questions are answered</li>
                <li key='temps-logic'>- 'Max. temp' is higher or equal to 'Min. temp'</li>
                <li key='dates-logic'>- 'To' date is later or equal to 'From' date</li>
                <li key='dates-format'>- both dates are in the suggested format</li>
                <li key='dates-between'>- both dates are between {today} and {todayPlus9}</li>
              </ul> : ''}
            {this.state.datesOk === false? <p>
              Ups, it seems that this app doesn't work correctly in your browser. Please try updating your browser or using another one.
            </p> : ''}
          </div>
          <div className='button-div'>
            <button onClick={this.handleSearchClick} id='search-button'>Search</button>
          </div>
        </div>
      </form>
    </div>;
  }
}
