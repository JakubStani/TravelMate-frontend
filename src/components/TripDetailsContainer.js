import React, { useEffect, useState } from 'react'
import './TripDetailsContainer.css'

function TripDetailsContainer(props) {
    console.log("trip data:", props.tripData);

    const [isWeatherForecastFound, setIsWeatherForecastFound] = useState(false);
    const [weatherForecast, setWeatherForecast] = useState();
    const [renderWeatherData, setRenderWeatherData] = useState(false);


    const getWeatherForecast=() => {
        try {
        const city = props.tripData['destination'].trim().replace(/\s+/g, '-');
        fetch(`http://penguin.linux.test:81/weather_microservice/weather.php?city=${city}`)
            .then(response => {
                if(!response.ok){
                    throw new Error();
                }
                console.log('weather forecast resp', response);
                console.log('ojoj');
                return response.text();
            })
            .then(result => {
                console.log('res', result);
                const weatherData=JSON.parse(result);
                if(!('error' in weatherData))
                {
                    setIsWeatherForecastFound(true);
                    setWeatherForecast(weatherData);
                    console.log('wd', weatherData);
                }
            }).catch(error => console.log('error', error))
        }
        catch (error) {
            console.log(`Weather forecast not found for destination=${props.tripData['destination']}`)
        };
    };

    useEffect(() => {
        getWeatherForecast();
        //props.isUserThisTripAuthor();
    }, []);

    useEffect(()=>{
        setRenderWeatherData(true);

    }, [weatherForecast])

    return (
        <div>
            <div className='profile-title-container'>Trip Details</div>
            <div className='profile-data-container'>
                <div className='profile-specific-data-container'>
                    <h3>Title</h3>
                    <p>{props.tripData['title']}</p>
                </div>
                <div>
                    <h3>Description:</h3><br />
                    <p>{props.tripData['description']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Destination</h3>
                    <p>{props.tripData['destination']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Start date</h3>
                    <p>{props.tripData['startDate']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>End date</h3>
                    <p>{props.tripData['endDate']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Estimated price</h3>
                    <p>{props.tripData['estimatedPrice']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Number of people</h3>
                    <p>{props.tripData['numberOfPeople']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Point of start</h3>
                    <p>{props.tripData['pointOfStart']}</p>
                </div>

                <h2>Hotel info</h2>
                <div className='profile-specific-data-container'>
                    <h3>Hotel name</h3>
                    <p>{props.tripData['hotelInformation']['hotelName']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Country</h3>
                    <p>{props.tripData['hotelInformation']['country']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Street</h3>
                    <p>{props.tripData['hotelInformation']['street']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Postal code</h3>
                    <p>{props.tripData['hotelInformation']['postalCode']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Street number</h3>
                    <p>{props.tripData['hotelInformation']['streetNumber']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Standard</h3>
                    <p>{props.tripData['hotelInformation']['standard']}</p>
                </div>
                <div className='profile-specific-data-container'>
                    <h3>Hotel description</h3>
                    <p>{props.tripData['hotelInformation']['hotelDescription']}</p>
                </div>
                <h1>Weather forecast</h1>
                {isWeatherForecastFound && weatherForecast!=null && renderWeatherData &&
                    <div> 
                        <div className='profile-specific-data-container'>
                            <h3>For destination</h3>
                            <p>{weatherForecast['location']['name']}, {weatherForecast['location']['country']}</p>
                        </div>
                        <div className='profile-specific-data-container'>
                            <h3>For date</h3>
                            <p>{weatherForecast['current']['last_updated']}</p>
                        </div>
                        <div className='profile-specific-data-container'>
                            <h3>{"Temperature"}</h3>
                            <p>{`${weatherForecast['current']['temp_c']}\u00B0C`}</p>
                        </div>
                        <div className='profile-specific-data-container'>
                            <h3>Conditions</h3>
                            <p>{weatherForecast['current']['condition']['text']}<img src={weatherForecast['current']['condition']['icon']}/></p>
                        </div>
                        <div className='profile-specific-data-container'>
                            <h3>{'Pressure [millibars]'}</h3>
                            <p>{weatherForecast['current']['pressure_mb']}</p>
                        </div>
                        <div className='profile-specific-data-container'>
                            <h3>Humidity</h3>
                            <p>{`${weatherForecast['current']['humidity']}%`}</p>
                        </div>
                        <div className='profile-specific-data-container'>
                            <h3>Cloud cover</h3>
                            <p>{`${weatherForecast['current']['cloud']}%`}</p>
                        </div>
                    </div>
                }
                {
                    renderWeatherData && !weatherForecast &&
                    <h2>Not found for destination: {props.tripData['destination']}</h2>
                }
            </div>
        </div>
    )
}

export default TripDetailsContainer