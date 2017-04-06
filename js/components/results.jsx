import React from 'react';
import ReactDOM from 'react-dom';

export class Results extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataReady: 'beforeSearch',
      destinations: {},
      countries: []
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      dataReady: 'beforeSearch'
    });
  }
  componentDidUpdate(){
    if (this.props.formOk === true && this.state.dataReady === 'beforeSearch'){
      this.search();
    }
  }

  search = () => {
    this.setState({
      dataReady: 'loading'
    })
    let ids = [];
    for (var i = 0; i < 73; i++) {
      ids.push(i+1);
    }
    this.getCities = ids => ids.map(id => this.getCity(id));
    this.getCity = (id) => {
      return fetch("http://find-the-sun.com:3000/destinations/"+id)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
      .then(data => {
        return data.json()
      })
      .catch(error => {
        console.log(error);
      });
    }
    this.getActualForecasts = citiesArray => citiesArray.map(city => this.getActualForecast(city));
    this.getActualForecast = (city) => {
      let checkedAt = city.checkedAt;
      if (checkedAt !== this.props.todayDays){
        let url = "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q="+city.location.name+"&days=10"
        return fetch(url)
        .then(response => {
          if (response.status >= 200 && response.status < 300) {
            return response
          } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
          }
        })
        .then(data => data.json())
        .then(data=>{
          let temp_day0 = data.forecast.forecastday[0].day.avgtemp_c;
          let temp_day1 = data.forecast.forecastday[1].day.avgtemp_c;
          let temp_day2 = data.forecast.forecastday[2].day.avgtemp_c;
          let temp_day3 = data.forecast.forecastday[3].day.avgtemp_c;
          let temp_day4 = data.forecast.forecastday[4].day.avgtemp_c;
          let temp_day5 = data.forecast.forecastday[5].day.avgtemp_c;
          let temp_day6 = data.forecast.forecastday[6].day.avgtemp_c;
          let temp_day7 = data.forecast.forecastday[7].day.avgtemp_c;
          let temp_day8 = data.forecast.forecastday[8].day.avgtemp_c;
          let temp_day9 = data.forecast.forecastday[9].day.avgtemp_c;

          let cityUpdated =
          {
            "location": {
              "name": data.location.name,
              "lat": data.location.lat,
              "lon": data.location.lon,
              "country": data.location.country
            },
                "forecast": {
                  "forecastday": [
                    {
                        "day": {
                          "avgtemp_c" : temp_day0
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day1
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day2
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day3
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day4
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day5
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day6
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day7
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day8
                        }
                    },
                    {
                        "day": {
                          "avgtemp_c" : temp_day9
                        }
                    }
                  ]
                },
                "checkedAt": this.props.todayDays,
                "status": "new",
                "id": city.id
              }
              return cityUpdated;
          }).catch(error=>{
            console.log(error);
          }
        );
      } else {
        let cityNotUpdated =
        {
          "location": {
            "name": city.location.name,
            "lat": city.location.lat,
            "lon": city.location.lon,
            "country": city.location.country
          },
              "forecast": {
                "forecastday": [
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[0].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[1].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[2].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[3].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[4].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[5].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[6].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[7].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[8].day.avgtemp_c
                      }
                  },
                  {
                      "day": {
                        "avgtemp_c" : city.forecast.forecastday[9].day.avgtemp_c
                      }
                  }
                ]
              },
              "checkedAt": this.props.todayDays,
              "status": "old",
              "id": city.id
            }
        return cityNotUpdated;
      }
    }

    this.updateForecasts = actualForecastsArray => {
      let index = 0;
      this.updateForecast = index => {
        if (actualForecastsArray[index].status === "new"){
          return fetch("http://find-the-sun.com:3000/destinations/"+actualForecastsArray[index].id, {
                  method: 'put',
                  body: JSON.stringify(actualForecastsArray[index]),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
          })
          .then(response => {
            if (response.status >= 200 && response.status < 300) {
              return response
            } else {
              var error = new Error(response.statusText)
              error.response = response
              throw error
            }
          })
          .then(result => {
                  index ++;
                  if (index < actualForecastsArray.length){
                    this.updateForecast(index);
                  }
          })
          .catch(error=>{
            console.log(error);
          });
        } else {
          index ++;
          if (index < actualForecastsArray.length){
            this.updateForecast(index);
          }
        }
      }
      this.updateForecast(index);
    }

    this.filterCities = actualForecastsArray => {
      let destinations = {};
      let countries = [];

      let startDay = this.props.fromDateDays - this.props.todayDays;
      let endDay = this.props.toDateDays - this.props.todayDays;

      actualForecastsArray.forEach(cityToFilter => {
        let tempsToCheck = [];
        for (var i = startDay; i <= endDay; i++) {
          tempsToCheck.push(cityToFilter.forecast.forecastday[i].day.avgtemp_c);
        }
        let tempsOk = [];
        for (var i = 0; i < tempsToCheck.length; i++) {
          if (tempsToCheck[i] < this.props.minTemp || tempsToCheck[i] > this.props.maxTemp) {
            tempsOk.push(false);
            break;
          } else {
            tempsOk.push(true);
          }
        }
        if (tempsOk.indexOf(false)===-1){
          if (destinations[cityToFilter.location.country]===undefined){
            destinations[cityToFilter.location.country] = [cityToFilter.location.name];
            countries.push(cityToFilter.location.country);
          } else {
            destinations[cityToFilter.location.country].push(cityToFilter.location.name);
          }
        }
      });
      if (countries.length === 0){
        this.setState({
          destinations: destinations,
          countries: countries,
          dataReady: 'ready',
          noResultsFound: true
        });
      } else {
        this.setState({
          destinations: destinations,
          countries: countries,
          dataReady: 'ready',
          noResultsFound: false
        });
      }
    }

    let startPromiseChain = Promise.resolve(ids);
    startPromiseChain.then(ids => {
      return Promise.all(this.getCities(ids)); //getCities tworzy tablicę, w której wywołana jest funkcja getCity dla każdego id. getCity pobiera miasto z mojej bazy. Efektem jest tablica miast z mojej bazy.
    })
    .then(citiesArray => {
      return Promise.all(this.getActualForecasts(citiesArray)); //getActualForecasts tworzy tablicę, w której wywołana jest funkcja getActualForecast dla każdego miasta z tablicy. Sprawdza, czy prognoza pogody dla tego miasta była sprawdzona dziś. Jeśli nie, wysyła zapytanie do API i zwraca zaktualizowane miasto ze statusem 'new'. Jeśli tak, zwraca miasto z niezmienionej postaci, dodając mu status 'old'. Efektem jest tablica, gdzie wszystkie miasta są już zaktualizowane, i mają status new albo old.
    })
    .then(actualForecastsArray => {
      // console.log('actualForecastsArray z PromiseChain w Fetch', actualForecastsArray);
      let startAsynchronousUpdateForecasts = Promise.resolve(actualForecastsArray);
      startAsynchronousUpdateForecasts.then(actualForecastsArray => {
        return this.updateForecasts(actualForecastsArray)
      })//updateForecasts dla każdego miasta po kolei uruchamia funkcję updateForecast. Funkcja updateForecast sprawdza, czy miasto ma status new - jeśli tak, wrzuca miasto na odpowiednie miejsce do mojej bazy (aktualizuje bazę). Ważne - miasta są dodawane po kolei, bo wysłanie wielu PUT do mojej bazy jednocześnie nie jest możliwe. Dopiero, kiedy jeden fetch się zakończy, uruchamiany jest kolejny.
      .catch(error => {
        console.log(error);
      });
      //Żeby nie czekać z wyświetleniem wyników, aż baza zostanie zaktualizowana, od razu w tym samym then wywołuję filterCities.
      this.filterCities(actualForecastsArray);//filterCities dla każdego miasta z tablicy sprawdza, czy spełnione są kryteria wyszukiwania - jeśli tak, miasto jest dodawane do odpowiednich zmiennych (countries i destinations). Na końcu aktualizowany jest state (countries, destinations, dataReady).
    })
    .catch(error => {
      this.setState({
        dataReady: 'error'
      });
      console.log(error);
    });
  }

  render(){
    const names = require('./names.jsx');
    let fromDate=this.props.fromDate;
    let toDate=this.props.toDate;

    let results = '';
    if (this.props.formOk === false){
      return null;
    } else if (this.state.dataReady ==='loading'){
      results = <p>Loading...</p>;
    } else if (this.state.dataReady === 'error') {
      results = <p>Something went wrong. Please try again later.</p>
    } else if (this.state.dataReady === 'ready' && this.state.noResultsFound === true){
      results = <p>Sorry, we didn't find any destinations matching your criteria.</p>;
    } else if (this.state.dataReady === 'ready' && this.state.noResultsFound === false) {
      results = <ul id='destinations-list'>
      <p>
      <span>Click on the city name to find flights.</span></p>
      {this.state.countries.map(country=>{
          return <li className='country-li' key={this.state.destinations[country]}>{country}:
            <ul className='city-ul'>{this.state.destinations[country].map(city=>{
                return <li className='city-li' key={city}>
                  <a className='google-flights-link' href={'https://www.google.pl/flights/?gl=pl#search;f=WAW,WMI,RWA;t=' + names[city][1] + ';d='+this.props.fromDate.toString()+';r='+this.props.toDate.toString()+';a=A3,EI,SU,BT,CA,UX,AF,9U,JU,AB,AZ,OS,AD,B2,BA,SN,FB,CI,CZ,OU,OK,LY,EW,AY,HU,IB,KL,LO,LH,LG,IG,DY,D8,FR,SK,SQ,P7,QS,LX,TP,RO,TK,PS,VY,W6,MF;so=p'} target='blank'>{names[city][0]}</a>
                </li>
              })
            }</ul>
          </li>
        })
      }</ul>
    };
    return <div id='results'>{results}</div>
  }
}
