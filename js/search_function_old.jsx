this.setState({
  dataReady: 'pending'
})
let currentDate = new Date().toISOString().substring(0, 10); //zapisuję dzisiejszą datę do zmiennej
fetch("http://localhost:3000/destinations/1") //zapytanie do mojej bazy o rekord o konkretnym id
.then(data => data.json())
.then(city=> {
  let checkedAt = city.checkedAt;
  if (checkedAt !== currentDate){
    let url = 'http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q='+city.name+'&days=10';
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
    fetch("http://localhost:3000/destinations/1", {
            method: 'put',
            body: JSON.stringify(cityUpdated),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).catch(error=>console.log('error w ifie', error))
    // //tu dalej manipuluję na cityUpdated
    // //FILTROWANIE
    // //ponieważ to będzie to samo co niżej, zapisać to potem w funkcji i tu tylko wywołać z parametrem
    // // let temp_array = [temp_day0, temp_day1, temp_day2, temp_day3, temp_day04, temp_day5, temp_day6, temp_day7, temp_day8, temp_day9];
    // //state - dane od użytkownika:
    // // minTemp: '',
    // // maxTemp: '',
    // // fromDate: '',
    // // toDate: ''
    //
    // //obliczanie różnicy pomiędzy dzisiaj a dniem wylotu w dniach -> wynik oznacza, od którego dnia zacząć sprawdzać temperaturę (dzień 0 = dzisiaj);
    // let currentDateString = new Date().toISOString().substring(0, 10);
    // let currentDateMs = new Date(currentDateString).getTime()
    // let fromDateMs = new Date(this.state.fromDate).getTime();
    // let diffMs = fromDateMs - currentDateMs
    // let oneDayInMs = 1000*60*60*24;
    // let startDay = Math.round(diffMs/oneDayInMs);
    // console.log(startDay);
    //
    // //obliczanie różnicy pomiędzy dzisiaj a dniem powrotu w dniach -> wynik oznacza, do którego dnia sprawdzać temperaturę (dzień 0 = dzisiaj);
    // let toDateMs = new Date(this.state.toDate).getTime();
    // let diffMs = toDateMs - currentDateMs
    // let stopDay = Math.round(diffMs/oneDayInMs);
    // console.log(stopDay);

    return cityUpdated;
    })
  } //koniec ifa
  else { //czyli jeśli prognoza była sprawdzona dziś
  //tu dalej manipuluję na city pobranym z mojej bazy - parametr city
  //FILTROWANIE
  //ponieważ to będzie to samo co niżej, zapisać to potem w funkcji i tu tylko wywołać z parametrem
  // let temp_array = [temp_day0, temp_day1, temp_day2, temp_day3, temp_day04, temp_day5, temp_day6, temp_day7, temp_day8, temp_day9];
  //state - dane od użytkownika:
  // minTemp: '',
  // maxTemp: '',
  // fromDate: '',
  // toDate: ''

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
  let daysToCheck = [];
  //sprawdzam temperaturę tylko dla wybranych dni
  let tempsArray = [city.temp_day0, city.temp_day1, city.temp_day2, city.temp_day3, city.temp_day4, city.temp_day5, city.temp_day6, city.temp_day7, city.temp_day8, city.temp_day9];
  let tempsToCheck = [];
  // let tempsArray = [];
  for (var i = startDay; i <= endDay; i++) {
    daysToCheck.push(i);
    tempsToCheck.push(tempsArray[i]);
    // tempsArray.push(city.temp_day{i})
  }
  console.log(tempsArray);
  console.log(daysToCheck);
  console.log(tempsToCheck);
  let countriesToGo = [];
  let citiesToGoFrance = []; //czy da się nadawać nazwy zmiennych automatycznie poprzez city.country? czy muszę zrobić z tego obiekt zawierający poszczególne tablice?
  let tempsOk = [];
  let cityOk = false;
  for (var i = 0; i < tempsToCheck.length; i++) {
    if (tempsToCheck[i] < this.state.minTemp || tempsToCheck[i] > this.state.maxTemp) {
      tempsOk.push(false);
      break;
    } else {
      tempsOk.push(true);
    }
  }
  if (tempsOk.indexOf(false)===-1){
    countriesToGo.push(city.country);
    citiesToGoFrance.push(city.name);
  }
  console.log(countriesToGo);
  console.log(citiesToGoFrance);
  this.setState({
    countries: countriesToGo,
    France: citiesToGoFrance,
    dataReady: 'ready'
  });
  console.log(this.state);
  //chciałabym to zrobić jakoś sprytniej, ale na razie nie wychodzi - poprawić później - początek poniżej:
  // let tempsArray = daysToCheck.map(day=>{
  //   return city.temp_day{day};
  // })
} //koniec else
}) //koniec then z ifem i elsem w środku
.catch(error=>console.log('error poza ifem', error));
//////////koniec zapytania o Paris

//////stare kody:
// let currentDate = new Date().toISOString().substring(0, 10);
// let city2 = {
//       "name": "Paris",
//       "nameToShow": "Paris",
//       "FlightSearchKey": "CDG,ORY,BVA,XHP,XPG",
//       "country": "France",
//       "url": "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q=Warsaw&days=10",
//       "temp": "20",
//       "checkedAt": "2017-03-16",
//       "id": 1
//     };
// console.log(currentDate);
// console.log('Szukamy miejsca o temperaturze pomiędzy', this.state.minTemp, 'a', this.state.maxTemp, 'stopni Celsjusza, w dniach od', this.state.fromDate, 'do', this.state.toDate);
// let city = destinations.cities[1].name;
// let country = destinations.cities[1].country;
// let url = 'http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q='+city+'&days=10';
// console.log(url);
// cacheProxy.get(url).then(data=>{
//   console.log(data);
//   console.log(data.forecast.forecastday[0].date);
//   console.log(data.forecast.forecastday[0].day.avgtemp_c);
//   console.log(data.forecast.forecastday[2].date);
//   console.log(data.forecast.forecastday[2].day.avgtemp_c);
//   console.log(data.forecast.forecastday[9].date);
//   console.log(data.forecast.forecastday[9].day.avgtemp_c);
// });
//wrzucam coś do mojej lokalnej bazy danych:
// fetch("http://localhost:3000/destinations", {
// method: 'post',
// body: JSON.stringify(city1),
// headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
// }
//modyfikcja pól:
//     let city = {
//           "name": "Paris",
//           "nameToShow": "Paris",
//           "FlightSearchKey": "CDG,ORY,BVA,XHP,XPG",
//           "country": "France",
//           "url": "http://api.apixu.com/v1/forecast.json?key=0ffd45ac047f4cda8ae85915171303&q=Paris&days=10",
//           "temp": "10",
//           "checkedAt": currentDate,
//           "id": 1
//         }
//     fetch("http://localhost:3000/destinations/1", {
//     method: 'put',
//     body: JSON.stringify(city),
//     headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     }
// }).then(resp => resp.json()) //odpowiedzią jest id
//     .then(data => console.log(data));
//pobranie czegoś: //wyszukiwanie po atrybucie
// fetch("http://localhost:3000/destinations/1").then(data => data.json()).then(cities=> {
//   console.log(cities);
//   let checkedAt = cities.checkedAt;
//   console.log(checkedAt);
//   })
