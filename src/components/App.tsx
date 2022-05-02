import React, { FC, useState } from 'react';
import './App.css';
import { LocationSearch } from "./LocationSearch";
import { LocationTable } from "./LocationTable";
import { WeatherLocation } from "../model/Weather";
import { searchLocation } from "../services/WeatherService";
import { ErrorAlert, WarningAlert } from "./Alerts";
import { WeatherSummary } from "./WeatherSummary";

const App: FC = () => {
  const [locations, setLocations] = useState<WeatherLocation[]>([]);
  const [error, setError] = useState('');
  const [warning, setWarning] = useState('');
  const [currentLocation, setCurrentLocation] = useState<WeatherLocation | null>(null);

  const resetAlerts = () => {
    setError('');
    setWarning('');
  }

  let addLocation = async (term: string) => {
    resetAlerts();
    const location = await searchLocation(term);
    console.log(" searchLocation:", location)
    if (!location) {
      setError(`No location found called '${term}'`);
    } else if (locations.find(item => item.id === location.id)) {
      setWarning(`Location '${term}' is already in the list.`);
    } else {
      setLocations([location, ...locations]);
    }
  };
  return (
    <div className='p-4'>
      <div className='row'>
        <div className='col-sm card p-4'>
          <div className='card-header'> <h2 className='main text-primary d-flex justify-content-center pt-4'>Weather App</h2></div>

          <div className='card-body'>
            <LocationSearch onSearch={addLocation} />
            <ErrorAlert message={error} />
            <WarningAlert message={warning} />
            <LocationTable locations={locations}
              current={currentLocation}
              onSelect={location => setCurrentLocation(location)} />

            <WeatherSummary location={currentLocation} />
          </div>
        </div>

      </div>
    </div>
  );
};



export default App;