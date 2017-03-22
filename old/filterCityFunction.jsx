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
