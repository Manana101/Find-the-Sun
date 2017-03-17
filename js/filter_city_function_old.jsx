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
