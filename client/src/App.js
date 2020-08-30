import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './util/api';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.6,
    longitude: -95.665,
    zoom: 3,
  });
  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState();

  useEffect(() => {
    const fetchLogs = async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    };
    fetchLogs();
  }, []);

  return (
    <ReactMapGl
      mapStyle='mapbox://styles/mirandoo/ckeh02zas0kyp19o83eejhkxc'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={setViewport}>
      {logEntries.map((entry) => {
        return (
          <Marker
            key={entry._id.toString()}
            latitude={entry.lat}
            longitude={entry.lng}
            offsetLeft={-12}
            offsetTop={-24}>
            <div>
              <svg
                viewBox='0 0 24 24'
                className='marker'
                style={{
                  width: '24px',
                  height: '24px',
                }}
                strokeWidth='3'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                <circle cx='12' cy='10' r='3'></circle>
              </svg>
            </div>
          </Marker>
        );
      })}
      <Popup
        latitude={37.78}
        longitude={-122.41}
        closeButton={true}
        closeOnClick={false}
        onClose={() => this.setState({ showPopup: false })}
        anchor='top'>
        <div>You are here</div>
      </Popup>
    </ReactMapGl>
  );
};

export default App;
