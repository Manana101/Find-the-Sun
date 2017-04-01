// 1. Zmień state (//wyświetl 'loading' i wyzeruj listę miast i krajów). Stwórz puste zmienne countries i destinations.
// 2. Następnie, dla wszystkich id po kolei (pętla):
//  a) Sprawdź, czy prognoza w mojej bazie jest aktualna
//    - jeśli nie była aktualna, wyślij zapytanie do API -> wklej zupdejtowane miasto do mojej bazy -> zwróć miasto
//    - jeśli była aktualna -> zwróć miasto
//   b) Po zakończeniu a uruchom filtrowanie
//   c) jeśli filtrowanie zwróciło false, nie rób nic. jeśli zwróciło true, dodaj miasto i kraj do zmiennych countries i destinations.
// 3. Dopiero po zakończeniu pętli dla wszystkich id, zmień state (dataReady, countries, destinations)

search = () => {
  //jeśli formularz nie jest poprawnie wypełniony, przerwij wykonywanie funkcji.
  if (this.props.formOk === false) {
    console.log('jestem w results w funkcji search w if - form not ok, więc nic nie robię');
    return
  //jeśli formularz jest poprawnie wypełniony:
  } else if (this.props.formOk === true) {
    //punkt 1
    //wyświetl 'loading' i wyzeruj listę miast i krajów
    this.setState({
      dataReady: 'loading',
      destinations: {},
      countries: []
    })
    console.log('jestem w funkcji search w results w else if, zaraz zaczynam iterować po miastach');
    //Punkt 2 - iteruję po miastach
    let ids = [1,2,3];
    this.iterateThroughIds(ids) //musi zwracać promise, którego pomyślnym wynikiem jest obiekt result, zawierający w sobie destinations i countries //w środku tej funkcji zawierają się punkty a,b,c
    //dopiero po pomyślnym wyniku promise updejtuje state
    .then(result => {
      this.setState({
        destinations: result.destinations,
        countries: result.countries,
        dataReady: 'ready'
      });
      console.log("Wszystko się udało, lista krajów i miast w state podmieniona");
    }).catch(error => console.log('Coś nie zadziałało - wyświetl komunikat o błędzie'));
  }
}//koniec funkcji search

iterateThroughIds = (ids) => {
  //musi zwracać promise, którego pomyślnym wynikiem jest obiekt result, zawierający w sobie destinations i countries
  return new Promise((resolve, reject) => {
    //a - zwraca promise, then(b) - zwraca promise, then(c)
    ids.forEach(id=>{
      //1. wywołaj search1CityFunction
      this.search1CityFunction(id) //musi zwracać promise, którego pomyślnym wynikiem jest obiekt city
      //2. wywołaj funkcję filterCity na zwróconym elemencie
      .then(city => {
        let cityOk = this.filterCity(city);
        //3. dla miast, dla których funkcja filter city zwróciła true, dodaj country i city zwrócone przez filterCity do zmiennych destinations i countries
        let destinations = [];
        let countries = {};
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
      }).catch(error => console.log('coś nie zadziałało w pętli dla pojedynczego miasta w iterateThroughIds', error));




    });
  }) //koniec promise
} //koniec funkcji iterateThroughIds
