import React from 'react';
import ReactDOM from 'react-dom';

//dostaje w propsach: <Results minTemp={this.state.minTemp} maxTemp={this.state.maxTemp} fromDate={this.state.fromDate} toDate={this.state.toDate} formOk={this.state.formOk}/>
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
    console.log('componentWillReceiveProps');
    this.setState({
      dataReady: 'beforeSearch'
    });
  }

  componentDidUpdate(){
    console.log('componentDidUpdate');
    if (this.props.formOk === true && this.state.dataReady === 'beforeSearch'){
      console.log('dataReady, formOk - ruszam z funkcją Search');
      // console.log('poleciałby search ale jest wykomentowany');
      this.search();
    }
  }
  //TODO: obsługa błędów!!! dodać timeout?
  search = () => {
    //wyświetl 'loading' i nie uruchamiaj znowu funkcji search, dopóki data nie będzie ready
    this.setState({
      dataReady: 'loading'
    })
    console.log('jestem w funkcji search w results, więc zaczynam iterować po miastach');
    let ids = [];
    for (var i = 0; i < 73; i++) {
      ids.push(i+1);
    }
    console.log(ids);
    //czy te funkcje mogą być tu w środku funkcji search? czy powinny być poza nią?
    this.getCities = ids => ids.map(id => this.getCity(id));

    this.getCity = (id) => {
      return fetch("http://localhost:3000/destinations/"+id)
      .then(data => {console.log('wysłałem zapytanie GET do mojej bazy dla id: ', id);return data.json()})
      .catch(error => console.log('error z getCity przy id: ', id, error));
    }//koniec getCity

    this.getActualForecasts = citiesArray => citiesArray.map(city => this.getActualForecast(city));

    this.getActualForecast = (city) => {
      console.log('city.id z getActualForecast: ', city.id);
      let currentDate = new Date().toISOString().substring(0, 10);
      let checkedAt = city.checkedAt;
      if (checkedAt !== currentDate){
        console.log('prognoza dziś jeszcze nie była sprawdzona, jestem w if, zaraz zrobię fetch do API dla city.id: ', city.id);
        let url = "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q="+city.location.name+"&days=10"
        return fetch(url)
        .then(data => data.json())
        .then(data=>{
          console.log('jestem w fetchu do API, sprawdzam city.id: ', city.id);
          //zapisuję średnie temperatury dla najbliższych 10 dni do zmiennych
          //zrobić tu pętlę:
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
          //tworzę nowy obiekt dla miasta, w którym podmieniam temperatury oraz checkedAt, oraz ustawiam status na 'new'.
          console.log('zapisałem do zmiennych temperatury dla city.id: ', city.id, 'zaraz tworzę cityUpdated');
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
                "checkedAt": currentDate,
                "status": "new",
                "id": city.id
              }
              console.log('stworzenie cityUpdated dla id: ', city.id, 'cityUpdated: ', cityUpdated);
              return cityUpdated;
          }).catch(error=>console.log('error w ifie, podczas fetcha do weather api', error));
      } else {
        console.log('Prognoza dla miasta o id: ', city.id, 'już dziś była sprawdzona');
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
              "checkedAt": city.checkedAt,
              "status": "old",
              "id": city.id
            }
        console.log('cityNotUpdated: ', cityNotUpdated);
        return cityNotUpdated;
      } //koniec else
    }//koniec getActualForecast


    //updateForecasts - funkcja, która aktualizuje miasto po mieście (dopiero jak pierwsze się doda do bazy, zaczyna dodawać drugie itp - bo robiąc wszystkie PUT jednocześnie json server odmawia dostępu)

    this.updateForecasts = actualForecastsArray => {
      let index = 0;
      this.updateForecast = index => {
        if (actualForecastsArray[index].status === "new"){
          return fetch("http://localhost:3000/destinations/"+actualForecastsArray[index].id, {
                  method: 'put',
                  body: JSON.stringify(actualForecastsArray[index]),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              }).then(result => {
                  console.log('dodałem do bazy zaktualizowane miasto o id ', actualForecastsArray[index].id);
                  console.log('co zwraca PUT: ', result);
                  index ++;
                  if (index < actualForecastsArray.length){
                    console.log('Włączam updejt dla id: ', actualForecastsArray[index].id)
                    this.updateForecast(index);
                  } else {
                    console.log('updejtowanie bazy zakończone, ostatnie zaktualizowane id to: ', index);
                  }
              }).catch(error=>console.log('error podczas updejtowania miasta o id ', actualForecastsArray[index].id, ' w mojej bazie, error: ', error));
        } else {
          console.log("Nie updejtuję miasta o id ", actualForecastsArray[index].id , "w mojej bazie, bo ma status old");
          index ++;
          if (index < actualForecastsArray.length){
            console.log('Włączam updejt dla id: ', actualForecastsArray[index].id)
            this.updateForecast(index);
          } else {
            console.log('updejtowanie bazy zakończone, ostatnie id dla którego wykonano updateForecast to: ', index);
          }
        }
      }
      //uruchomienie pierwszego updejtu:
      console.log('Włączam updejt dla id: ', index+1);
      this.updateForecast(index);
    }

    this.filterCities = actualForecastsArray => {
      //zmienne, które podstawię potem do state:
      let destinations = {};
      let countries = [];
      //TODO: na razie robię sobie osobną tablicę krajów, bo nie umiem iterować po obiekcie. Ale docelowo lepiej byłoby nie tworzyć dodatkowej zmiennej, tylko iterować po obiekcie destinations przy renderowaniu

      //obliczenie startDay i endDay - które dni brać pod uwagę przy filtrowaniu
      //TODO: być może trzeba zamienić ISOString na UTC

      //obliczanie różnicy pomiędzy dzisiaj a dniem wylotu w dniach -> wynik oznacza, od którego dnia zacząć sprawdzać temperaturę (dzień 0 = dzisiaj);
      let currentDateString = new Date().toISOString().substring(0, 10);
      let currentDateMs = new Date(currentDateString).getTime()
      let fromDateMs = new Date(this.props.fromDate).getTime();
      let diffToStartMs = fromDateMs - currentDateMs;
      let oneDayInMs = 1000*60*60*24;
      let startDay = Math.round(diffToStartMs/oneDayInMs);
      // console.log(startDay);

      //obliczanie różnicy pomiędzy dzisiaj a dniem powrotu w dniach -> wynik oznacza, do którego dnia sprawdzać temperaturę (dzień 0 = dzisiaj);
      let toDateMs = new Date(this.props.toDate).getTime();
      let diffToEndMs = toDateMs - currentDateMs;
      let endDay = Math.round(diffToEndMs/oneDayInMs);
      // console.log(endDay);

      actualForecastsArray.forEach(cityToFilter => {
        //sprawdzam temperaturę w danym mieście tylko dla wybranych dni
        let tempsToCheck = [];
        for (var i = startDay; i <= endDay; i++) {
          tempsToCheck.push(cityToFilter.forecast.forecastday[i].day.avgtemp_c);
        }
        console.log(cityToFilter.location.name, 'tempsToCheck: ',tempsToCheck);

        let tempsOk = [];
        //pętla, która sprawdza, czy dla każdego dnia, w zakresie dat podanym przez użytkownika, temperatura mieści się w podanym zakresie temperatur. Dla każdego dnia, do talbicy tempsOk wrzuca true lub false (jeśli napotka pierwsze false, przerywa pętlę).
        for (var i = 0; i < tempsToCheck.length; i++) {
          if (tempsToCheck[i] < this.props.minTemp || tempsToCheck[i] > this.props.maxTemp) {
            tempsOk.push(false);
            break;
          } else {
            tempsOk.push(true);
          }
        }
        console.log(cityToFilter.location.name, 'tempsOk: ', tempsOk);
        //Teraz sprawdzam, czy tablica dla tego miasta zawiera false - jeśli nie ma ani jednego false, dorzucam państwo do countries oraz miasto do destinations(w tablicy tego państwa).
        if (tempsOk.indexOf(false)===-1){
          //if-else jest tu po to, żeby tylko raz dodać kraj do obiektu destinations i tablicy countries. Jeśli kraj już jest, dodajemy mu tylko miasto do jego tablicy
          if (destinations[cityToFilter.location.country]===undefined){
            console.log(cityToFilter.location.country, 'Nie znalazłem kraju w obiekcie destinations');
            destinations[cityToFilter.location.country] = [cityToFilter.location.name];
            countries.push(cityToFilter.location.country);
            console.log(destinations);
            console.log(countries);
          } else {
            console.log(cityToFilter.location.country, 'Znalazłem kraj w obiekcie destinations');
            destinations[cityToFilter.location.country].push(cityToFilter.location.name);
            console.log(destinations);
            console.log(countries);
          }
        }

      })
      //na koniec updejtuję state
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
      console.log('actualForecastsArray z PromiseChain w Fetch', actualForecastsArray);
      //TODO: tu niepotrzebnie robię tablicę wywołań funkcji, zmienić to na jedną funkcję, która operuje od razu na tablicy miast
      let startAsynchronousUpdateForecasts = Promise.resolve(actualForecastsArray);
      startAsynchronousUpdateForecasts.then(actualForecastsArray => {
        return this.updateForecasts(actualForecastsArray)
      })//updateForecasts dla każdego miasta po kolei uruchamia funkcję updateForecast. Funkcja updateForecast sprawdza, czy miasto ma status new - jeśli tak, wrzuca miasto na odpowiednie miejsce do mojej bazy (aktualizuje bazę). Ważne - miasta są dodawane po kolei, bo wysłanie wielu PUT do mojej bazy jednocześnie nie jest możliwe. Dopiero, kiedy jeden fetch się zakończy, uruchamiany jest kolejny.
      .catch(error => console.log('error z startAsynchronousUpdateForecasts', error));

      //Nie chcę czekać z wyświetleniem wyników, aż baza zostanie zaktualizowana (nie ma takiej potrzeby), więc lecę w tym samym then z funkcją filterCities(nie czekam na wykonanie się updejtowania bazy, które dzieje się asynchronicznie).
      this.filterCities(actualForecastsArray);//filterCities dla każdego miasta z tablicy sprawdza, czy spełnione są kryteria wyszukiwania - jeśli tak, miasto jest dodawane do odpowiednich zmiennych (countries i destinations). Na końcu aktualizowany jest state (countries, destinations, dataReady).
    })
    .catch(error => console.log('error z search', error));
  }//koniec funkcji search

  render(){
    console.log('results render');
    //zmienna results i warunek - co ma się wyświetlać w zależności od etapu załadowania danych i od tego czy znaleziono przynajmniej 1 miasto do wyświetlenia
    let results = '';
    if (this.props.formOk === false){
      console.log('results zablokował swoje renderowanie');
      return null;
    } else if (this.state.dataReady ==='loading'){
      console.log('results loading');
      results = <p>Loading...</p>;
    } else if (this.state.dataReady === 'ready' && this.state.noResultsFound === true){
      console.log('results empty');
      results = <p>Sorry, we didn't find any destinations matching your criteria.</p>;
    } else if (this.state.dataReady === 'ready' && this.state.noResultsFound === false) {
      console.log('results should appear');
      results = <ul id='destinations-list'>
        <p>Click on the country name, to see cities matching your search.<br/>
        <span>Click on the city name to find flights.</span></p>
      {this.state.countries.map(country=>{
          return <li className='country-li'>{country}
            <ul>{this.state.destinations[country].map(city=>{
                return <li className='city-li'>
                  {city}
                </li>
              })
            }</ul>
          </li>
        })
      }</ul>
    };
    return <div id='results'>{results}</div>
  }//koniec render
}//koniec Results
