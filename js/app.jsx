import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';
// import destinations from '../db/cities';

class Search extends React.Component{
  //TODO podział na subkomponenty!
  constructor(props){
    super(props);
    this.state={
      dataReady: 'beforeSearch',
      minTemp: '',
      maxTemp: '',
      fromDate: '',
      toDate: ''
    }
  }
  // handleAreaChange = (event) => {
  //   this.setState({
  //     area: event.target.value
  //   })
  // }
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
    //wyświetl 'loading'...
    this.setState({
      dataReady: 'pending'
    })
    //zapytanie o pojedyncze miasto - tu przykładowo Paris - wywołuję funkcję
    this.search1CityFunction(1); //jako parametr podaję id z mojej bazy
  } //koniec handleSearchClick

  //search1CityFunction -> funkcja, która sprawdza pogodę dla pojedynczego miasta - jeśli miasto spełnia kryteria podane przez użytkownika, jest dodawane do odpowiednich zmiennych w state //przenieść ją później do osobnego pliku
  search1CityFunction = (id) => {
    //zapisuję dzisiejszą datę do zmiennej. Żeby porównać ją z datami pobranymi z inputów, skracam ją do samej daty. //TODO: może być problem z ISO string podobno w różnych przeglądarkach. Spróbować zmienić to na format UTC.
    let currentDate = new Date().toISOString().substring(0, 10);
    //zapytanie do mojej bazy o rekord o konkretnym id
    fetch("http://localhost:3000/destinations/"+id)
    .then(data => data.json())
    .then(city=> {
      //sprawdzam, czy prognoza pogody dla tego miasta była sprawdzona dzisiaj
      //TODO: tak naprawdę wystarczy sprawdzić to dla pierwszego miasta, bo wszystkie pobieram jednocześnie. Czyli tylko dla miasta o id=1. Reszta miast powinna lecieć wtedy automatycznie ifem albo elsem. Ale jeśli kiedyś będę chciała dodać zawężenie obszaru wyszukiwania, lub wyszukiwanie dla innej lokalizacji niż Warszawa, może to się przydać (nie wszystkie miasta będę za każdym razem pobierać z API)
      let checkedAt = city.checkedAt;

      if (checkedAt !== currentDate){
        //co robi if: jeśli prognoza pogody NIE BYŁA SPRAWDZONA DZISIAJ, wyślij zapytanie dla tego miasta do API i dodaj dane o temperaturach na najbliższe 10 dni do mojej bazy. Zaktualizuj też pole checkedAt. Potem wywołaj funkcję, która sprawdza, czy miasto spełnia kryteria użytkownika i dodaje (lub nie) miasto do odpowiednich zmiennych w state.
        console.log('prognoza dziś jeszcze nie była sprawdzona, jestem w if');
        console.log('city.url', city.url);
        //zapytanie o to miasto do API - prognoza na najbliższe 10 dni
        fetch(city.url)
        .then(data => data.json())
        .then(data=>{
          console.log('jestem w fetchu do API');
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
          //tworzę nowy obiekt dla miasta, w którym podmieniam temperatury oraz checkedAt.
          //TODO: muszę jeszcze rozkminić czy temperatury mają być zapisane w słowniku, czy w tablicy
          let cityUpdated =     {
                "url": "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q=Paris&days=10",
                "location": {
                  "name": "Paris",
                  "nameToShow": "Paris",
                  "FlightSearchKey": "CDG,ORY,BVA,XHP,XPG",
                  "country": "France"
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
                "id": 1
              }
              //dodaję zaktualizone miasto do mojej bazy na odpowiednie miejsce (po id)
              fetch("http://localhost:3000/destinations/"+id, {
                      method: 'put',
                      body: JSON.stringify(cityUpdated),
                      headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      }
                  }).catch(error=>console.log('error w ifie, podczas updejtowania miasta w bazie', error))
              //wywołuję funkcję, która sprawdzi, czy miasto spełnia kryteria użytkownika, a jeśli tak, doda go do odpowiednich zmiennych w state
              this.filterCity(cityUpdated);

              // //zwracam zupdejtowany obiekt, żeby mógł go przechwycić kolejny fetch, który wrzuci go do mojej bazy - już niepotrzebne
              //
              // return cityUpdated;
            }).catch(error=>console.log('error w ifie, podczas fetcha do weather api', error)); //koniec fetcha do weather API

      } //koniec ifa
      else { //czyli co ma zrobić, jeśli prognoza dla tego miasta była sprawdzona dziś
        console.log('prognoza już dziś była sprawdzona, jestem w else');
        //tu dalej manipuluję na city pobranym z mojej bazy - parametr city

        //wywołuję funkcję, która sprawdzi, czy miasto spełnia kryteria użytkownika, a jeśli tak, doda go do odpowiednich zmiennych w state
        //console.log(city);
        this.filterCity(city);

      } //koniec else
    }) //koniec then z ifem i elsem w środku
    .catch(error=>console.log('error poza ifem i elsem', error));
      ///////koniec zapytania o Paris
  } ///koniec funkcji search1CityFunction

  ///filterCity - funkcja, która sprawdza, czy dane miasto spełnia podane przez użytkownika kryteria, a jeśli tak, dodaje je do odpowiednich zmiennych w state
  //TODO: przenieść to do osobnego pliku i tylko importować?
  filterCity = (cityToFilter) => {
    //console.log(cityToFilter);
    //jako parametr trzeba podać zaciągnięte dane dla pojedynczego miasta (wszystko jedno, czy z mojej bazy, czy z API)

    ////////to co mam w state - dane od użytkownika:
    // minTemp: '',
    // maxTemp: '',
    // fromDate: '',
    // toDate: ''

    //obliczenie startDay i endDay - które dni brać pod uwagę przy filtrowaniu
    //TODO: to powinno być w osobnej funkcji, zrobione tylko raz - otrzymany wynik będzie dotyczył wyszukiwania wszystkich miast
    //TODO: to co wcześniej - być może trzeba zamienić ISOString na UTC

    //obliczanie różnicy pomiędzy dzisiaj a dniem wylotu w dniach -> wynik oznacza, od którego dnia zacząć sprawdzać temperaturę (dzień 0 = dzisiaj);
    let currentDateString = new Date().toISOString().substring(0, 10);
    let currentDateMs = new Date(currentDateString).getTime()
    let fromDateMs = new Date(this.state.fromDate).getTime();
    let diffToStartMs = fromDateMs - currentDateMs;
    let oneDayInMs = 1000*60*60*24;
    let startDay = Math.round(diffToStartMs/oneDayInMs);
    console.log(startDay);

    //obliczanie różnicy pomiędzy dzisiaj a dniem powrotu w dniach -> wynik oznacza, do którego dnia sprawdzać temperaturę (dzień 0 = dzisiaj);
    let toDateMs = new Date(this.state.toDate).getTime();
    let diffToEndMs = toDateMs - currentDateMs;
    let endDay = Math.round(diffToEndMs/oneDayInMs);
    console.log(endDay);

    //sprawdzam temperaturę w danym mieście tylko dla wybranych dni
    //przykładowa nazwa zmiennej - powinno działać zarówno dla mojej bazy, jak i dla API cityToFilter.forecast.forecastday[0].day.avgtemp_c

    let tempsToCheck = [];
    for (var i = startDay; i <= endDay; i++) {
      tempsToCheck.push(cityToFilter.forecast.forecastday[i].day.avgtemp_c);
    }
    console.log(tempsToCheck);

    //zmienne, które podstawię potem do state:
    //TODO: zautomatyzować to, żebym nie musiała ręcznie tworzyć pustej tablicy dla każdego państwa. czy da się nadawać nazwy zmiennych automatycznie poprzez city.country? czy jednak żeby to działało, muszę zrobić z tego obiekt zawierający poszczególne tablice (w state)?
    //cityToFilter.location.country

    let countriesToGo = [];
    let citiesToGoFrance = [];
    let tempsOk = [];
    let cityOk = false;
    //pętla, która sprawdza, czy dla każdego dnia, w zakresie dat podanym przez użytkownika, temperatura mieści się w zakresie temperatur podanym przez użytkownika. Dla każdego dnia, do talbicy tempsOk wrzuca true lub false (jeśli napotka pierwsze false, przerywa pętlę). Potem sprawdzam, czy tablica dla tego miasta zawiera false - jeśli nie ma ani jednego false, dorzucam państwo do countriesToGo oraz miasto do tablicy tego państwa.
    for (var i = 0; i < tempsToCheck.length; i++) {
      if (tempsToCheck[i] < this.state.minTemp || tempsToCheck[i] > this.state.maxTemp) {
        tempsOk.push(false);
        break;
      } else {
        tempsOk.push(true);
      }
    }
    if (tempsOk.indexOf(false)===-1){
      countriesToGo.push(cityToFilter.location.country);
      citiesToGoFrance.push(cityToFilter.location.name);
    }
    console.log(countriesToGo);
    console.log(citiesToGoFrance);
    this.setState({
      countries: countriesToGo,
      France: citiesToGoFrance,
      dataReady: 'ready'
    });
    console.log(this.state);
  } //koniec funkcji filterCity
  render(){
    //TODO ograniczyć wybór dat do today-today+9/10
    //https://tiffanybbrown.com/2013/10/24/date-input-in-html5-restricting-dates-and-thought-for-working-around-limitations/
    //http://stackoverflow.com/questions/17182544/disable-certain-dates-from-html5-datepicker
    //http://stackoverflow.com/questions/23671407/restrict-future-dates-in-html-5-data-input

    //TODO walidacja:
    //max temp musi być większe od min temp, DateTo musi być później niż DateFrom
    //pola min i max nie mogą być puste, ew. dodać domyślne wartości
    //dodać dopuszczalny zakres min i max temp?

    // Search area:
    // <select value={this.state.area} onChange={this.handleAreaChange}>
    //   <option value='Europe'>Europe</option>
    //   <option value='Albania'>Albania</option>
    //   <option value='Andorra'>Andorra</option>
    //   <option value='Armenia'>Armenia</option>
    // </select><br/><br/>

    let results = '';
    if (this.state.dataReady==='ready'&&this.state.countries.length>0&&this.state.countries.indexOf("France")!==-1) {
      results = <ul>{this.state.countries[0]} {this.state.France.map(el=>{
        return <li>{el}</li>
      })} </ul>
  } else if (this.state.dataReady==='pending'){
      results = 'Loading...';
    } else if (this.state.dataReady==='ready'&&this.state.countries.length === 0){
      results = "Sorry, we didn't find any destinations matching your criteria.";
    } else if (this.state.dataReady==='beforeSearch'){
      results='';
    }
    console.log('render, Results=', results);
    return <div>
      <p>Find out where you can go to enjoy your dream weather!</p>
      <form>
      Min. temp. (Celsius): <input type='number' value={this.state.minTemp} onChange={this.handleMinTempChange}/><br/><br/>
      Max. temp. (Celsius): <input type='number' value={this.state.maxTemp} onChange={this.handleMaxTempChange}/><br/><br/>
      From: <input type='date' min='' max='' value={this.state.fromDate} onChange={this.handleFromDateChange}/><br/><br/>
    To*: <input type='date' min='' max='' value={this.state.toDate} onChange={this.handleToDateChange}/><br/><br/>
    *Sorry, we can check the weather max. 10 days from now<br/><br/>
      <button onClick={this.handleSearchClick}>Search</button>
      </form>
      <div>{results}</div>
    </div>
  }
}
//
// class Results extends React.Component{
//   render(){
//     return <div>{}</div>
//   }
// }
//
// class Footer extends React.Component{
//   //TODO? tu może być disclaimer, który się otwiera, tak jak na RW
//   render(){
//     return <div>{}</div>
//   }
// }
//
// class App extends React.Component{
//   render(){
//     return <div className='container'>
//       <Search className='search'/>
//       <Results className='results'/>
//       <Footer className='footer'/>
//     </div>
//   }
// }

class App extends React.Component {
  render(){
    return <div>
      <Search/>
    </div>
  }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});
