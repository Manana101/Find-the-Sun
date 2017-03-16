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
      let cityUpdated =     {
            "name": "Paris",
            "nameToShow": "Paris",
            "FlightSearchKey": "CDG,ORY,BVA,XHP,XPG",
            "country": "France",
            "url": "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q=Paris&days=10",
            "temp_day0": temp_day0,
            "temp_day1": temp_day1,
            "temp_day2": temp_day2,
            "temp_day3": temp_day3,
            "temp_day4": temp_day4,
            "temp_day5": temp_day5,
            "temp_day6": temp_day6,
            "temp_day7": temp_day7,
            "temp_day8": temp_day8,
            "temp_day9": temp_day9,
            "checkedAt": currentDate,
            "id": 1
          }
          return cityUpdated;
          })
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
