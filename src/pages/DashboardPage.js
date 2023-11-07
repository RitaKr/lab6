import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
export default function DashboardPage() {
    const [weatherData, setWeatherData] = useState(null);
  
    // useEffect(() => {
    //   fetchDataFromProxy()
    //     .then((data) => {
    //       setWeatherData(data);
    //       console.log('Data fetched successfully:', data);
    //     })
    //     .catch((error) => {
    //       console.error('Error:', error);
    //     });
    // }, []); 
    // The empty dependency array ensures the effect runs only once when the component mounts
  
    return (
      <div className="dashboard-container">
        <Header/>
      </div>
    );
  }

async function fetchDataFromProxy() {
        try {
          const response = await fetch('http://localhost:8080/fetchData'); // Replace with the correct URL of your proxy server
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