import { useEffect } from "react";

export default function ForecastBlock({ forecast, formatTime }) {
    const today = new Date();
    const { day, date, astro } = forecast;
    const { condition, daily_chance_of_rain, avghumidity, avgtemp_c, avgvis_km, maxtemp_c, mintemp_c, uv, maxwind_kph} = day;
    useEffect(() => {
        //console.log(date, astro.sunrise, astro.sunset, condition, daily_chance_of_rain, avghumidity, avgtemp_c, avgvis_km, maxtemp_c, mintemp_c, uv, maxwind_kph, wind_dir, pressure_mb);
        //console.log(today.toDateString());
        determineDay(date)
    })
    
    function determineDay(dateStr) {
        const dateObj = new Date(dateStr);
        //console.log(dateObj.toDateString());
        if (today.toDateString() === dateObj.toDateString()) {
            return "Today"
        } else if (dateObj.getDay() - today.getDay() === 1) {
            return "Tomorrow"
        } else {
            switch (dateObj.getDay()) {
                case 1: return "Monday";
                case 2: return "Tuesday";
                case 3: return "Wednesday";
                case 4: return "Thursday";
                case 5: return "Friday";
                case 6: return "Saturday";
                default: return "Sunday";
            }
        }
    }
    return (
        <section className={"forecast-block" + (determineDay(date)==="Today" ?" today" :"")}>
            <header className="forecast-header">
                <section className="forecast-subheader">
                    <section className="day-section">
                        <h2 className="day">{determineDay(date)}</h2>
                        <h3 className="date">{date}</h3>

                    </section>
                    <img src={condition.icon} alt="condition icon" className="condition-icon" />
                </section>
                <h3>{condition.text}, {avgtemp_c} C°</h3>
            </header>

            <article className="forecast-info">

                <p className="temperature">
                    <span>
                        <b>min:</b>  {mintemp_c} C°
                    </span>
                    <span>
                        <b>max:</b>  {maxtemp_c} C°
                    </span>
                </p>
                <p>
                    <b>Max wind:</b> {maxwind_kph}km/h
                </p>
                <p>
                    <b>Humidity:</b> {avghumidity}%
                </p>
                <p>
                    <b>Visibility:</b> {avgvis_km}km
                </p>
                <p>
                    <b>Chance of rain:</b> {daily_chance_of_rain}%
                </p>
                <p>
                    <b>UV:</b> {uv}
                </p>
                <p className="astro">
                    <b>sunrise:</b>  {formatTime(astro.sunrise)}

                </p>
                <p className="astro">
                    <b>sunset:</b> {formatTime(astro.sunset)}
                </p>
            </article>
        </section>
    )
}