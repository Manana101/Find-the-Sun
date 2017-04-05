import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from './form.jsx';
import {Results} from './results.jsx';

export class Search extends React.Component{
  constructor(props){
    super(props);
    this.state={
      minTemp: '',
      maxTemp: '',
      formOk: false,
      toDateDays: '',
      fromDateDays: '',
      todayDays: '',
      todayDaysPlus9: ''
    }
  }
  formInfoFn = (formOkFromForm, minTempFromForm, maxTempFromForm, fromDateFromForm, toDateFromForm, toDateDays, fromDateDays, todayDays, todayDaysPlus9) => {
    this.setState({
      minTemp: minTempFromForm,
      maxTemp: maxTempFromForm,
      fromDate: fromDateFromForm,
      toDate: toDateFromForm,
      formOk: formOkFromForm,
      toDateDays: toDateDays,
      fromDateDays: fromDateDays,
      todayDays: todayDays,
      todayDaysPlus9: todayDaysPlus9
    })
  }
  render(){
    return <section className='content'>
        <Form formInfoFn={this.formInfoFn}/>
        <Results formOk={this.state.formOk} minTemp={this.state.minTemp} maxTemp={this.state.maxTemp} fromDate={this.state.fromDate} toDate={this.state.toDate} toDateDays={this.state.toDateDays} fromDateDays={this.state.fromDateDays} todayDays={this.state.todayDays} todayDaysPlus9={this.state.todayDaysPlus9}/>
      </section>
  }
}
