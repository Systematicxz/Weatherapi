import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./components/Loader";
import Weather from "./components/Weather";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();

  const success = (pos) => {
    const currentCords = {
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    };
    setCoords(currentCords);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  useEffect(() => {
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=e210fcdbcd6852a2ac2e8b847b4ed3d9`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          const celsius = (res.data.main.temp - 273.15).toFixed(1);
          const fahrenheit = (celsius * (9 / 5) + 32).toFixed(1);
          const newTemps = {
            celsius,
            fahrenheit,
          };
          setTemp(newTemps);
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App  grid place-content-center min-h-screen bg-[url('/images/bg.jpg')] bg-cover px-3">
      {weather ? <Weather weather={weather} temp={temp} /> : <Loader />}
    </div>
  );
}

export default App;
