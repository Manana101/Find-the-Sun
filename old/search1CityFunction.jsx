//search1CityFunction -> funkcja, która sprawdza pogodę dla pojedynczego miasta - jeśli miasto spełnia kryteria podane przez użytkownika, jest dodawane do odpowiednich zmiennych w state
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
