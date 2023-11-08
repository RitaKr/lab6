import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ForecastBlock from '../components/ForecastBlock';
import Loader from '../components/Loader';

//component for wind direction arrow which is rotated by respective angle
function WindArrow({ direction }) {
  let angle = 0;
  switch (direction) {
    case "NNE": angle = 22.5; break;
    case "NE": angle = 45; break;
    case "ENE": angle = 67.5; break;
    case "E": angle = 90; break;
    case "ESE": angle = 112.5; break;
    case "SE": angle = 135; break;
    case "SSE": angle = 157.5; break;
    case "S": angle = 180; break;
    case "SSW": angle = 202.5; break;
    case "SW": angle = 225; break;
    case "WSW": angle = 247.5; break;
    case "W": angle = 270; break;
    case "WNW": angle = 292.5; break;
    case "NW": angle = 315; break;
    case "NNW": angle = 337.5; break;
    default: angle = 0; break;
  }

  return <span style={{ transform: `rotate(${angle}deg)` }}>↑</span>
}

//dashboard page
export default function DashboardPage() {
  const [weatherData, setWeatherData] = useState(null); //weather data from api
  const [currentTime, setCurrentTime] = useState(new Date()); //current time


  //requesting geolocation and fetching weather data 
  useEffect(() => {
    //getting user's geolocation
    navigator.geolocation.getCurrentPosition(
      (position) => {
        //in case user permitted to send his location
        const { latitude, longitude } = position.coords;
        fetchData(`${latitude},${longitude}`)
          .then((data) => {
            setWeatherData(data);
            console.log('Data for '+data.location.name+' fetched successfully:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      },
      (error) => {
        console.error('Error getting geolocation:', error);
        //in case user denied geolocation, fetch Kyiv as default
        fetchData('Kyiv')
        .then((data) => {
          setWeatherData(data);
          console.log('Data for Kyiv (default) fetched successfully:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }
    );
  }, []);

  
  //updating current time
  useEffect(() => {
    setInterval(() => { setCurrentTime(new Date()); }, 1000)
  }, [currentTime, setCurrentTime]);

  //receives string with time in 12-hour format and returns string with time in 24-hour format
  function formatTime(timeString) {
    const timeParts = timeString.match(/^(\d+):(\d+) (AM|PM)$/);
    //if string is not time
    if (!timeParts) {
      return null;
    }
    //console.log(timeParts)
    let hours = parseInt(timeParts[1], 10);
    const minutes = timeParts[2];
    const period = timeParts[3];

    //formatting the hours to 24-hour format
    if (period === "PM" && hours < 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return `${hours}:${minutes}`;
  }

  return (
    <div className="dashboard-container">
      <Header />

      {weatherData ?
        <main className="dashboard-main">
          <section className="general-info-section">
            <section className="location">
              <h2>{weatherData.location.name}</h2>
              <h3>{weatherData.location.country}</h3>
            </section>
            <section className="time">
              <p><b>Time:</b> <span>{currentTime.getHours()}:{currentTime.getUTCMinutes().toString().padStart(2, '0')}</span></p>
              <p><b>Sunrise:</b> <span>{formatTime(weatherData.forecast.forecastday[0].astro.sunrise)}</span></p>
              <p><b>Sunset:</b> <span>{formatTime(weatherData.forecast.forecastday[0].astro.sunset)}</span></p>
              <p><b>Wind direction:</b> <WindArrow direction={weatherData.current.wind_dir} /></p>
            </section>
          </section>
          <section className="forecast-container">
            {weatherData.forecast.forecastday.map(day => <ForecastBlock key={day.date_epoch} forecast={day} formatTime={formatTime} />)}
          </section>
        </main> :
        <Loader /> //displaying loader while data is fetching
        }

    </div>
  );
}

//function that fetches data
async function fetchData(location) {
  try {
    const apiKey = '2a262ecb52ff45e6a75123135230711'; 

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=5&aqi=no&alerts=no`;

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
