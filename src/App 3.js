import React, { useState, useEffect } from "react";

import "./App.css";
var searched_location = "";
function App() {
  /* Generate random location to initialize the location state hook */
  const sampleLocations = ["Davis", "New York", "Denver", "Dallas", "San Francisco", "San Jose", "Atlanta", "Tampa", "Chicago", "Seattle"];
  function randomInt(max) {
    return Math.floor(Math.random() * max);
  }
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState(sampleLocations[randomInt(10)]); /// 
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    ifClicked();
  }, []);

  function ifClicked() {
    /*
    Usha TO-DO: Add API keys,
                Make error messages meaningful (What does the error mean?),
                Make the web app work (an API call gives back a temp and pic!)
    */

    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&APPID=57c11083884e42a88add1cc102c4a6fc&units=imperial`
      //`http://api.openweathermap.org/data/2.5/find?q=London&units=imperial`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          /* HINT: res.status gives back the API call's server response code */
          if (res.status === 404) {
            return alert("City not found!");
          }
          alert("Oops, there seems to be an error!");
          throw new Error("You have an error");
        }
      })
      .then((object) => {
        setWeather(object);
        console.log(weather);
      })
      .catch((error) => console.log(error));
    
    fetch(
      `https://api.unsplash.com/search/photos?query=${locations}&client_id=QlhxRcAPcwSIcutFATevSxrmi_SRqq9RqA12WG0BeRE`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("You made a mistake");
        }
      })
      .then((data) => {
        console.log(data);
        setPhotos(data?.results[0]?.urls?.raw);
      })
      .catch((error) => console.log(error));
    searched_location = JSON.stringify({locations}.locations);
    searched_location = searched_location.replace(/["]+/g, '');
  }
  
  return (
    <div className="app"> {/* Shivam TO-DO */}
      <div className="wrapper">
        <div className="search"> {/* Hannah TO-DO */}
          <input
            type="text"
            value={locations}
            onChange={(e) => setLocations(e.target.value)}
            placeholder="Enter location"
            className="location_input"
            required
          />
          <button className="location_searcher" onClick={ifClicked}>
            Search Location
          </button>
        </div>
        <div className="app__data"> {/* Weimen TO-DO */}
          <p className="temp"> {Math.trunc(weather?.main?.temp)} <span>&#176;F</span> in {searched_location}</p>
        
        </div>
        <img className="app__image" src={photos} alt="" />
      </div>
    </div>
  );
}

export default App;
//<p className="temp">Current Temperature: {Math.trunc(weather?.main?.temp)} <span>&#176;F</span></p>

