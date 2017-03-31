import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from './form.jsx';
import {Results} from './results.jsx';

export class Search extends React.Component{
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
  //funkcja do odbierania od Form informacji:
  formInfoFn = (formOkFromForm, minTempFromForm, maxTempFromForm, fromDateFromForm, toDateFromForm) => {
  console.log('jestem w Search w odebraniu parametrów');
    this.setState({
      minTemp: minTempFromForm,
      maxTemp: maxTempFromForm,
      fromDate: fromDateFromForm,
      toDate: toDateFromForm,
      formOk: formOkFromForm
    })
  }
  render(){
    console.log('jestem w Search', this.state.formOk);
    return <section className='content'>
        <Form formInfoFn={this.formInfoFn}/>
        <Results minTemp={this.state.minTemp} maxTemp={this.state.maxTemp} fromDate={this.state.fromDate} toDate={this.state.toDate} formOk={this.state.formOk}/>
      </section>
  }
}
