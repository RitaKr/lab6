import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import ForecastBlock from '../components/ForecastBlock';
import Loader from '../components/Loader';
export default function DashboardPage() {
    const [weatherData, setWeatherData] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    useEffect(() => {
      fetchData()
        .then((data) => {
          setWeatherData(data);
          console.log('Data fetched successfully:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }, []); 

    useEffect(()=>{
      setInterval(()=>{setCurrentTime(new Date());}, 1000)
    }, [currentTime, setCurrentTime])
    //The empty dependency array ensures the effect runs only once when the component mounts
  
    function formatTime(timeString) {
      const timeParts = timeString.match(/^(\d+):(\d+) (AM|PM)$/);
      // if string is not time
      if (!timeParts) {
          return null; 
      }
      console.log(timeParts)
      let hours = parseInt(timeParts[1], 10);
      const minutes = timeParts[2];
      const period = timeParts[3];

      if (period === "PM" && hours < 12) {
          hours += 12;
      } else if (period === "AM" && hours === 12) {
          hours = 0;
      }

      //formatting the hours to 24-hour format
      return `${hours}:${minutes}`;
  }

    return (
      <div className="dashboard-container">
        <Header/>

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
          </section>
        </section>
        <section className="forecast-container">
          {weatherData.forecast.forecastday.map(day => <ForecastBlock key={day.date_epoch} forecast={day} formatTime={formatTime}/>)}
        </section>
      </main> :
      <Loader/>}
        
      </div>
    );
  }

async function fetchData() {
        try {
         const response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=2a262ecb52ff45e6a75123135230711&q=Kyiv&days=5&aqi=no&alerts=no'); 
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