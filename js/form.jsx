class Form extends React.Component {
  constructor(props){
    super(props);
    this.state={
      minTemp: '',
      maxTemp: '',
      fromDate: '',
      toDate: '',
      formOk: false
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
    //walidacja formularza
    this.isFormOk = this.checkFormOk(); //true lub false
    // console.log('formOk z handleSearchClick', formOk);
    // this.setState({
    //   formOk: formOk
    // });
    if ( typeof this.props.formOkFn === 'function' ){
      this.props.formOkFn(this.isFormOk);
    }
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
    return <form>
      Min. temp. (Celsius): <input type='number' value={this.state.minTemp} onChange={this.handleMinTempChange}/><br/><br/>
      Max. temp. (Celsius): <input type='number' value={this.state.maxTemp} onChange={this.handleMaxTempChange}/><br/><br/>
      From: <input type='date' min={today} max={todayPlus9} value={this.state.fromDate} onChange={this.handleFromDateChange}/><br/><br/>
      To*: <input type='date' min={today} max={todayPlus9} value={this.state.toDate} onChange={this.handleToDateChange}/><br/><br/>
      *We can check the weather max. 10 days from now<br/><br/>
      <button onClick={this.handleSearchClick}>Search</button>
    </form>;
  }
}
