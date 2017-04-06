# Find the Sun

DEMO: http://find-the-sun.com/

Find the Sun is a web application that finds destinations matching user's criteria: min. & max. average daily forecast temperature in the specified period.

Application was created as a final project for http://coderslab.pl/ "Become Front-End developer" bootcamp.

I would really appreciate your feedback! If you have any suggestions, please contact me on GitHub (https://github.com/Manana101/) or LinkedIn (https://www.linkedin.com/in/mananajaworska/).

Application is built on React 15.4.0 and uses various npm packages listed in https://github.com/Manana101/Find-the-Sun/blob/master/package.json

Languages used: HTML5, CSS3, Sass, ECMAScript 5, ECMAScript 6, ECMAScript 7, JSX.

Databases used: local (json), external API (https://www.apixu.com/).

Servers used for demo: Apache, json-server.

**Limitations**

Currently, only 73 destinations are included in the search. Destinations list is tailored to inhabitants of Warsaw, Poland, and includes cities that can by reached from Warsaw with a direct low-cost flight (i.e. with Wizzair or Ryanair, as of 12/03/2017). However, app can be used by users from different locations as well.

Weather forecasts are updated max. once per day, when the first user on a given they clicks the search button.

Weather can be checked for 10 days only, starting from the current date.

As application's layout is based on flexbox, and HTML5 input date is used, it might not work properly on some browsers (especially IE and browsers that are not up to date). User experience is best on Chrome and Opera (in Firefox, dates have to be entered as text). To be fixed soon.

**Search logic**

Application uses weather forecasts from Apixu.com. Because of API's free account limit (5000 calls per month), following search logic is implemented:

1. After clicking on search button, requests for 73 cities are sent to the local database (json file).
2. If forecast for a given city was already checked on the current day, weather forecast data about that city from the local databased are used in further operations. If forecast for a given city was not yet checked on the current day, request for this city is sent to Apixu.com. Weather forecast data about that city from the external API are used in further operations.
3. After data for all 73 cities are available, they are filtered to match user's criteria and presented to the user.
4. For cities which forecasts were requested from the API, PUT requests are made to the local database (forecats are updated).

Above logic ensures that external API receives max. 73 requests per day (ensuring that 5000 calls per month limit is not exceeded). Only the first user on a given day sends requests to the external API (assuming that his  PUT requests to the local database went uninterrupted). Subsequent users only interact with the local database. Also, only for the first user on a given day waiting time might be visibly long.

Currently, every search button click requests data for all cities included in the local database. This might change in the future, when option to specify search area is added, and/or more destinations are added to the database, with checked records determined by user's location.
