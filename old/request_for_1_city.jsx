let currentDate = new Date().toISOString().substring(0, 10); //zapisuję dzisiejszą datę do zmiennej
fetch("http://localhost:3000/destinations/1")
.then(data => data.json())
.then(city=> {
  let checkedAt = city.checkedAt;
  if (checkedAt !=== currentDate){
    let url = 'http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q='+city+'&days=10';
    fetch(url)
    .then(data => data.json())
    .then(data=>{
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
      //let temp_array = [temp_day0, temp_day1, temp_day2, temp_day3, temp_day04, temp_day5, temp_day6, temp_day7, temp_day8, temp_day9];
      //tworzę nowy obiekt dla miasta, w którym podmieniam temperatury oraz checkedAt.
      //TODO: muszę jeszcze rozkminić czy temperatury mają być zapisane w słowniku, czy w tablcy
      let cityUpdated =     {
            "name": "Paris",
            "nameToShow": "Paris",
            "FlightSearchKey": "CDG,ORY,BVA,XHP,XPG",
            "country": "France",
            "url": "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q=Paris&days=10",
            "forecast": {
                    "forecastday[0].day.avgtemp_c" : temp_day0,
                    "forecastday[1].day.avgtemp_c" : temp_day1,
                    "forecastday[2].day.avgtemp_c" : temp_day2,
                    "forecastday[3].day.avgtemp_c" : temp_day3,
                    "forecastday[4].day.avgtemp_c" : temp_day4,
                    "forecastday[5].day.avgtemp_c" : temp_day5,
                    "forecastday[6].day.avgtemp_c" : temp_day6,
                    "forecastday[7].day.avgtemp_c" : temp_day7,
                    "forecastday[8].day.avgtemp_c" : temp_day8,
                    "forecastday[9].day.avgtemp_c" : temp_day9
                  },
            "checkedAt": currentDate,
            "id": 1
          }
          //TODO: wywołuję funkcję, która sprawdzi, czy miasto spełnia kryteria użytkownika, a jeśli tak, doda go do odpowiednich zmiennych w state - czy na pewno w tym miejscu, czy jednak najpierw dodać zupdejtowane miasto do bazy?

          //////////////////////////////////////////////

          //zwracam zupdejtowany obiekt, żeby mógł go przechwycić kolejny fetch, który wrzuci go do mojej bazy

          return cityUpdated;
          })
          //dodaję zaktualizone miasto do mojej bazy na odpowiednie miejsce (po id)
          .fetch("http://localhost:3000/destinations/1", {
                  method: 'put',
                  body: JSON.stringify(cityUpdated),
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              }).catch(error=>console.log('error w ifie', error))
          } //koniec ifa
          // else { //czyli jeśli prognoza była sprawdzona dziś
          //   let checkedToday = true;
          //   return checkedToday;
          // }
        }) //koniec then z ifem w środku
          .catch(error=>console.log('error poza ifem', error))
