var rootUrl ='http://api.openweathermap.org/data/2.5/weather?appid=33f8531d61d22aa4e8d32279bc05e3e9';
var _ = require('lodash');
var kelvinToF = function(kelvin){
  return Math.round((kelvin - 273.5) * 1.8 + 32)+ '˚F'
};

module.exports = function(latitude,longitude){
  var url = `${rootUrl}&lat=${latitude}&lon=${longitude}`;

  return fetch(url)// make a request to the API and it returns a promise
          .then(function(response){//gets the response but cant be used directly
              return response.json();
          })
          .then(function(json){// so json is called
              return {
                city: (json.name),//as name is the proper to display the city name in he json
                temperature:kelvinToF(json.main.temp),
                description: _.capitalize(json.weather[0].description)
              }
          })
          .catch(function(error) {
              console.log('There has been a problem with your fetch operation: ' + error.message);
             // ADD THIS THROW error
              throw error;
        });
};
