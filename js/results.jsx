import React from 'react';
import ReactDOM from 'react-dom';

//dostaje w propsach: <Results minTemp={this.state.minTemp} maxTemp={this.state.maxTemp} fromDate={this.state.fromDate} toDate={this.state.toDate} formOk={this.state.formOk}/>
export class Results extends React.Component{
  constructor(props){
    super(props);
    this.state={
      dataReady: '',
      destinations: {},
      countries: []
    }
  }
  componentDidUpdate(){
    // this.search();
  }
  search = () => {
    //jeśli formularz nie jest poprawnie wypełniony, przerwij wykonywanie funkcji.
    if (this.props.formOk === false) {
      console.log('jestem w results w funkcji search w if - form not ok, więc nic nie robię');
      return
    //jeśli formularz jest poprawnie wypełniony:
    } else if (this.props.formOk === true) {
      //wyświetl 'loading' i wyzeruj listę miast i krajów
      this.setState({
        dataReady: 'loading',
        destinations: {},
        countries: []
      })
      console.log('jestem w funkcji search w results w else if, więc zaczynam iterować po miastach');
      //wyślij zapytanie o miasta po ID - dla każdego ID wywołanie funkcji wyszukującej miasto
      let ids = [1,2,3];
      let destinations = [];
      let countries = {};
      //dla każdego id:
      ids.forEach(id=>{
        //kolejne kroki muszą być wywołane jako callbacki do poprzednich albo trzeba użyć promise, bo inaczej pętla leci dalej, i nie czeka na rezultat?
        
        //1. wywołaj search1CityFunction
        let city = this.search1CityFunction(id);
        //2. wywołaj funkcję filterCity na zwróconym z niego elemencie
        let cityOk = this.filterCity(city);
        //3. dodaj country i city zwrócone przez filterCity do zmiennych destinations i countries
        if (cityOk) {
          console.log('dodaję miasto: ', city.location.name);
          if (destinations[city.location.country]===undefined){
            console.log('Nie znalazłem kraju w obiekcie destinations');
            destinations[city.location.country] = [city.location.name];
            countries.push(city.location.country);
          } else {
            console.log('Znalazłem kraj w obiekcie destinations');
            destinations[city.location.country].push(city.location.name);
          }
        }
        console.log(countries);
        console.log(destinations);
      });//koniec iterowania po id
      //na koniec zupdejtuj state
      this.setState({
        destinations: destinations,
        countries: countries,
        dataReady: 'ready'
      });
    }
  }//koniec funkcji search

  //search1CityFunction -> funkcja, która ściąga dane dla pojedynczego miasta - z mojej bazy lub z API
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
          //MOGĘ TUTAJ ZROBIĆ SOBIE OBIEKT Z DODATKOWYMI ELEMENTAMI DLA KAŻDEGO MIASTA I ZACIĄGAĆ JE W cityUpdated - BĘDĄ SIĘ OD RAZU WKLEJAŁY ODPOWIEDNIO DO BAZY. ALBO TRZYMAĆ TO W OSOBNYM JSONIE, KTÓRY ZAIMPORTUJĘ TU.
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
              // this.filterCity(cityUpdated);

              // //zwracam zupdejtowany obiekt, żeby mógł go przechwycić kolejny fetch, który wrzuci go do mojej bazy - już niepotrzebne
              //
              return cityUpdated;
            }).catch(error=>console.log('error w ifie, podczas fetcha do weather api', error)); //koniec fetcha do weather API

      } //koniec ifa
      else { //czyli co ma zrobić, jeśli prognoza dla tego miasta była sprawdzona dziś
        console.log('prognoza już dziś była sprawdzona, jestem w else');
        //tu dalej manipuluję na city pobranym z mojej bazy - parametr city

        //wywołuję funkcję, która sprawdzi, czy miasto spełnia kryteria użytkownika, a jeśli tak, doda go do odpowiednich zmiennych w state
        //console.log(city);
        // this.filterCity(city);
        return city;
      } //koniec else
    }) //koniec then z ifem i elsem w środku
    .catch(error=>console.log('error poza ifem i elsem', error));
      ///////koniec zapytania o pojedyncze miasto
  } ///koniec funkcji search1CityFunction

  ///filterCity - funkcja, która sprawdza, czy dane miasto spełnia podane przez użytkownika kryteria, a jeśli tak, dodaje je do odpowiednich zmiennych w state
  filterCity = (cityToFilter) => {
    //console.log(cityToFilter);
    //jako parametr trzeba podać zaciągnięte dane dla pojedynczego miasta (wszystko jedno, czy z mojej bazy, czy z API)

    //obliczenie startDay i endDay - które dni brać pod uwagę przy filtrowaniu
    //TODO: to powinno być w osobnej funkcji, zrobione tylko raz - otrzymany wynik będzie dotyczył wyszukiwania wszystkich miast
    //TODO: to co wcześniej - być może trzeba zamienić ISOString na UTC

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
      if (tempsToCheck[i] < this.props.minTemp || tempsToCheck[i] > this.props.maxTemp) {
        tempsOk.push(false);
        break;
      } else {
        tempsOk.push(true);
      }
    }
    console.log(tempsOk);
    //if-else jest po to, żeby tylko raz dodać kraj do obiektu. Jeśli kraj już jest, dodajemy mu tylko miasto do jego tablicy.
    if (tempsOk.indexOf(false)===-1){
      return true;
      // if (destinations[cityToFilter.location.country]===undefined){
      //   console.log('Nie znalazłem kraju w obiekcie destinations');
      //   destinations[cityToFilter.location.country] = [cityToFilter.location.name];
      //   countries.push(cityToFilter.location.country);
      // } else {
      //   console.log('Znalazłem kraj w obiekcie destinations');
      //   destinations[cityToFilter.location.country].push(cityToFilter.location.name);
      // }
    } else {
      return false;
    }
    // console.log(countries);
    // console.log(destinations);
    //funkcja musi coś zwracać, ale bez updejtowania state, żeby za każdą iteracją nie był od nowa renderowany komponent, i wywołana od nowa funkcja search
    // let searchResults = {
    //   countries: countries,
    //   destinations: destinations
    // };
    // return searchResults;

  } //koniec funkcji filterCity

  render(){
    console.log('results render');
    //zmienna results i warunek - co ma się wyświetlać w zależności od etapu załadowania danych i od tego czy znaleziono przynajmniej 1 miasto do wyświetlenia
    let results = '';
    if (this.props.formOk === false){
      console.log('results zablokował swoje renderowanie');
      return null;
    } else if (this.state.dataReady==='pending'){
      console.log('results loading');
      results = 'Loading...';
    } else if (this.state.dataReady==='ready'&&this.state.countries.length===0){
      console.log('results empty');
      results = "Sorry, we didn't find any destinations matching your criteria.";
    } else if (this.state.dataReady==='ready'&&this.state.countries.length>0) {
      console.log('results should appear');
      results = <ul id='destinations-list'>
        <p>Click on the country name, to see cities matching your search.<br/>
        Click on the city name to find flights.</p>
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
