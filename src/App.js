import React from 'react';

import Titels from './components/Titels';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY_WEATHER = '81ec5aa9a6f91fd31d28f9ae28b1ac3d';

class App extends React.Component {
    state = {
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: undefined
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY_WEATHER}&units=metric`);
        const data = await api_call.json();
        
        if((data.cod === '404') || !city || !country){
            this.setState({
                temperature: undefined,
                city: undefined,
                country: undefined,
                humidity: undefined,
                description: undefined,
                error: data.message + '!'
            });
        } else {
            this.setState({
                temperature: data.main.temp,
                city: data.name,
                country: data.sys.country,
                humidity: data.main.humidity,
                description: data.weather[0].description,
                error: ''
            });
        }
    }

    render() {
        return(
            <div>
                <div className="wrapper">
                    <div className="main">
                        <div className="row">

                            <div className="col-xs-5 title-container">
                                <Titels />
                            </div>

                            <div className="col-xs-7 form-container">
                                <Form getWeather= { this.getWeather } />
                                <Weather 
                                    temperature= { this.state.temperature }
                                    city= { this.state.city }
                                    country= { this.state.country }
                                    humidity= { this.state.humidity }
                                    description= { this.state.description }
                                    error= { this.state.error }
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;