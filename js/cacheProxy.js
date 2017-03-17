const API_KEY = 'c382af1a4f89492198f79b8e10125e23';

class CacheProxy {
    _fetchData( url ){
        /*
         * @TODO - Uzupełnij tą metodę tak, aby zwracała Promise,
         * które spełnia się do rozkodowanego z JSON
         * obiektu. Wykorzystaj fetch() do pobrania zawartości z argumentu url.
         */
         return fetch(url, {
          //  headers: {
          //    "X-Auth-Token": API_KEY
          //  }
         }).then(resp=> resp.json())
    }


    constructor(){
        this.cache = {}

        this.get = url => {
            if (url in this.cache)
                return Promise.resolve(this.cache[url]);
            else
                return this._fetchData( url ).then( data => {
                    this.cache[url] = data; return data;
                } );
        }
    }
}

module.exports = new CacheProxy();

//stara klasa App z użyciem cache proxy:

// import cacheProxy from './cacheProxy';

// constructor(props){
//   super(props);
//   this.state = {
//     minTemp: '',
//     maxTemp: '',
//     fromDate: '',
//     toDate: ''
//   }
// }
//   componentDidMount(){
//   console.log('componentDidMount');
//   // cacheProxy.get('http://api.football-data.org/v1/competitions').then(data=>{
//   //   // console.log(data);
//   //   // console.log(id);
//   //   this.setState({
//   //     content: data[0].id
//   //   });
//   //   console.log(this.state.content);
//   // });
// }
// handleButtonClick = (event) => {
//   event.preventDefault();
  // console.log('button click');
  // console.log(destinations.cities[0].name);
  // console.log(destinations.cities[0].country);
  // let city = destinations.cities[1].name;
  // let country = destinations.cities[1].country;
  // let url = 'http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q='+city+'&days=10';
  // console.log(url);
  // cacheProxy.get(url).then(data=>{
  //   // console.log(data);
  //   // console.log(id);
  //   // this.setState({
  //   //   content: data[0].id
  //   // });
  //   // console.log(this.state.content);
  //   console.log(data);
  //   console.log(data.forecast.forecastday[0].date);
  //   console.log(data.forecast.forecastday[0].day.avgtemp_c);
  //   console.log(data.forecast.forecastday[2].date);
  //   console.log(data.forecast.forecastday[2].day.avgtemp_c);
  //   console.log(data.forecast.forecastday[9].date);
  //   console.log(data.forecast.forecastday[9].day.avgtemp_c);
  // });
  // this.setState({
  //   fetch: 'we changed the state, so fetch should start now'
  // })
// }
