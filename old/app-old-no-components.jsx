import React from 'react';
import ReactDOM from 'react-dom';
import '../main.scss';

class Search extends React.Component{
  //TODO podział na komponenty!
  constructor(props){
    super(props);
    this.state={
      dataReady: 'beforeSearch',
      formOk: '',
      minTemp: '',
      maxTemp: '',
      fromDate: '',
      toDate: '',
      destinations: {},
      countries: []
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
      this.setState({
        formOk: true
      })
    } else {
      console.log('formNotOK');
      this.setState({
        formOk: false
      })
    }
  }
  handleSearchClick = (event) => {
    event.preventDefault();
    //walidacja formularza
    this.checkFormOk();
    //jeśli formularz nie jest poprawnie wypełniony, przerwij wykonywanie funkcji
    if (this.state.formOk === false) {
      return;
    }
    //wyświetl 'loading' i wyzeruj listę miast i krajów
    this.setState({
      dataReady: 'pending',
      destinations: {},
      countries: []
    })
    //zapytanie o miasta po ID - dla każdego ID wywołanie funkcji wyszukującej miasto
    let ids = [1,2,3];
    ids.forEach(el=>this.search1CityFunction(el));
  } //koniec handleSearchClick

  //search1CityFunction -> funkcja, która sprawdza pogodę dla pojedynczego miasta - jeśli miasto spełnia kryteria podane przez użytkownika, jest dodawane do odpowiednich zmiennych w state //TODO: przenieść ją później do osobnego pliku?
  search1CityFunction = (id) => {
    //zapisuję dzisiejszą datę do zmiennej. Żeby porównać ją z datami pobranymi z inputów, skracam ją do samej daty.
    //TODO: może być problem z ISO string podobno w różnych przeglądarkach. Spróbować zmienić to na format UTC.
    let currentDate = new Date().toISOString().substring(0, 10);
    //zapytanie do mojej bazy o rekord o konkretnym id
    fetch("http://localhost:3000/destinations/"+id)
    .then(data => data.json())
    .then(city=> {
      //sprawdzam, czy prognoza pogody dla tego miasta była sprawdzona dzisiaj
      //TODO: tak naprawdę wystarczy sprawdzić to dla pierwszego miasta, bo wszystkie pobieram jednocześnie. Czyli tylko dla miasta o id=1. Reszta miast powinna lecieć wtedy automatycznie ifem albo elsem. Ale jeśli kiedyś będę chciała dodać zawężenie obszaru wyszukiwania, lub wyszukiwanie dla innej lokalizacji niż Warszawa, może to się przydać (nie wszystkie miasta będę za każdym razem pobierać z API)
      let checkedAt = city.checkedAt;
      //warunek: jeśli miasto nie było jeszcze dziś sprawdzane, wyślij zapytanie do API i wklej zaktualizowane miasto do bazy
      if (checkedAt !== currentDate){
        console.log('prognoza dziś jeszcze nie była sprawdzona, jestem w if');
        //zapytanie o to miasto do API - prognoza na najbliższe 10 dni
        //TODO: wyszukuje mi nie do końca dobrą miejscowość, o tych samych współrzędnych geograficznych (Np. Barceloneta zamiast Barcelona). Muszę mieć więc w bazie dodatkową zmienną 'nameToShow', żeby wyświetlać dobrą nazwę miasta! Po name wyszukać się nie da, bo Palma de Mallorca znajduje mi w Meksyku (znajdzie po samym Palma, ale ja chcę, żeby się wyświetlało Palma de Mallorca.. -> czyli zmienna nameToShow tak czy siak potrzebna). Zapisać po prostu gdzieś w kodzie, jaka zmienna name odpowiada jakiej nameToShow? (taki słownik) Jeśli to jest ok rozwiązanie, to gdzie ten słownik powinnam zdefiniować? (zresztą potrzebne mi też kody lotnisk do wyszukiwania połączeń, czyli muszę mieć te dodatkowe info albo w mojej bazie, albo gdzieś w kodzie stworzone)
        let url = "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q="+city.location.name+"&days=10"
        fetch(url)
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
          //TODO: problem z FlightSearchKey, który chciałabym mieć w bazie. Nie mam jak go podmienić, bo nie ma takiej zmiennej w oryginalnym API. Stworzyć tu tablicę, która będzie zawierała wszystkie FlightSearchKey, i z niej korzystać? Najlepiej byłoby użyć metody PATCH, ale ona z jakiegoś powodu nie działa. Przykładowo dla Paryża w obiekcie location chciałabym mieć:
          //"FlightSearchKey": "CDG,ORY,BVA,XHP,XPG"
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
                "id": id
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
      ///////koniec zapytania o pojedyncze miasto
  } ///koniec funkcji search1CityFunction

  ///filterCity - funkcja, która sprawdza, czy dane miasto spełnia podane przez użytkownika kryteria, a jeśli tak, dodaje je do odpowiednich zmiennych w state
  //TODO: przenieść to do osobnego pliku i tylko importować?
  filterCity = (cityToFilter) => {
    //console.log(cityToFilter);
    //jako parametr trzeba podać zaciągnięte dane dla pojedynczego miasta (wszystko jedno, czy z mojej bazy, czy z API)

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
    // console.log(startDay);

    //obliczanie różnicy pomiędzy dzisiaj a dniem powrotu w dniach -> wynik oznacza, do którego dnia sprawdzać temperaturę (dzień 0 = dzisiaj);
    let toDateMs = new Date(this.state.toDate).getTime();
    let diffToEndMs = toDateMs - currentDateMs;
    let endDay = Math.round(diffToEndMs/oneDayInMs);
    // console.log(endDay);

    //sprawdzam temperaturę w danym mieście tylko dla wybranych dni
    let tempsToCheck = [];
    for (var i = startDay; i <= endDay; i++) {
      tempsToCheck.push(cityToFilter.forecast.forecastday[i].day.avgtemp_c);
    }
    console.log(tempsToCheck);

    //zmienne, które podstawię potem do state:
    let destinations = this.state.destinations;
    //TODO: na razie robię sobie osobną tablicę krajów, bo nie umiem iterować po obiekcie. Ale docelowo lepiej byłoby nie tworzyć dodatkowej zmiennej, tylko iterować po obiekcie destinations przy renderowaniu
    let countries = this.state.countries;
    let tempsOk = [];
    //pętla, która sprawdza, czy dla każdego dnia, w zakresie dat podanym przez użytkownika, temperatura mieści się w zakresie temperatur podanym przez użytkownika. Dla każdego dnia, do talbicy tempsOk wrzuca true lub false (jeśli napotka pierwsze false, przerywa pętlę). Potem sprawdzam, czy tablica dla tego miasta zawiera false - jeśli nie ma ani jednego false, dorzucam państwo do countriesToGo oraz miasto do tablicy tego państwa.
    // console.log(this.state);
    for (var i = 0; i < tempsToCheck.length; i++) {
      if (tempsToCheck[i] < this.state.minTemp || tempsToCheck[i] > this.state.maxTemp) {
        tempsOk.push(false);
        break;
      } else {
        tempsOk.push(true);
      }
    }
    console.log(tempsOk);
    //if-else jest po to, żeby tylko raz dodać kraj do obiektu. Jeśli kraj już jest, dodajemy mu tylko miasto do jego tablicy.
    if (tempsOk.indexOf(false)===-1){
      if (destinations[cityToFilter.location.country]===undefined){
        console.log('Nie znalazłem kraju w obiekcie destinations');
        destinations[cityToFilter.location.country] = [cityToFilter.location.name];
        countries.push(cityToFilter.location.country);
      } else {
        console.log('Znalazłem kraj w obiekcie destinations');
        destinations[cityToFilter.location.country].push(cityToFilter.location.name);
      }
    }
    console.log(countries);
    console.log(destinations);

    //////NIE POWINNO BYĆ ZMIANY STATE TUTAJ! TA FUNKCJA POWINNA COŚ ZWRACAĆ, CO BĘDZIE ZAPISYWANE DO ZMIENNEJ W MIEJSCU WYWOŁANIA FUNKCJI, ITD. BEZ SENSU, BO PRZY ITERACJI DLA KAŻDEGO ID JEST OD NOWA RENDEROWANY ELEMENT (ZMIANA STATE). POPRAWIĆ TO PÓŹNIEJ!
    this.setState({
      destinations: destinations,
      countries: countries,
      dataReady: 'ready'
    });

  } //koniec funkcji filterCity
  render(){
    //obliczam zakres dni, który ma być możliwy do wybrania w input type='date'
    //TODO: wrzucić to gdzieś indziej...
    let today = new Date().toISOString().substring(0, 10);
    let todayMs = new Date(today).getTime();
    let oneDayInMs = 1000*60*60*24;
    let todayPlus9Ms = todayMs + 9*oneDayInMs;
    let todayPlus9Date = new Date(todayPlus9Ms);
    let todayPlus9 = todayPlus9Date.toISOString().substring(0, 10);

    //zmienna results i warunek - co ma się wyświetlać w zależności od etapu załadowania danych i od tego czy znaleziono przynajmniej 1 miasto do wyświetlenia
    let results = '';
    if (this.state.formOk === false){
      results = 'Formularz wypełniony niepoprawnie';
    } else if (this.state.dataReady==='pending'&&this.state.formOk===true){
        results = 'Loading...';
    } else if (this.state.dataReady==='ready'&&this.state.countries.length===0&&this.state.formOk===true){
      results = "Sorry, we didn't find any destinations matching your criteria.";
    } else if (this.state.dataReady==='ready'&&this.state.countries.length>0) {
      results = <ul>{
        this.state.countries.map(country=>{
          return <li>{country}
            <ul>{this.state.destinations[country].map(city=>{
                return <li>
                  {city}
                </li>
              })
            }</ul>
          </li>
        })
      }</ul>
    } else if (this.state.dataReady==='beforeSearch'){
      results='';
    }

    return <div>
      <p>Find out where you can go to enjoy your dream weather!</p>
      <form>
      Min. temp. (Celsius): <input type='number' value={this.state.minTemp} onChange={this.handleMinTempChange}/><br/><br/>
      Max. temp. (Celsius): <input type='number' value={this.state.maxTemp} onChange={this.handleMaxTempChange}/><br/><br/>
    From: <input type='date' min={today} max={todayPlus9} value={this.state.fromDate} onChange={this.handleFromDateChange}/><br/><br/>
    To*: <input type='date' min={today} max={todayPlus9} value={this.state.toDate} onChange={this.handleToDateChange}/><br/><br/>
    *We can check the weather max. 10 days from now<br/><br/>
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
        // <App/>,
        document.getElementById('app')
    );
});
