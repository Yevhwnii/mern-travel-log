import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';

import LogEntryForm from './components/logEntryForm';
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
  const [showPopup, setShowPopup] = useState([]);
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  useEffect(() => {
    const fetchLogs = async () => {
      const logEntries = await listLogEntries();
      setLogEntries(logEntries);
      console.log(logEntries);
    };
    fetchLogs();
  }, []);

  const showAddMarkerPopup = (event) => {
    const [longitude, latitude] = event.lngLat;
    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGl
      mapStyle='mapbox://styles/mirandoo/ckeh02zas0kyp19o83eejhkxc'
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onDblClick={showAddMarkerPopup}
      onViewportChange={setViewport}>
      {logEntries.map((entry) => {
        return (
          <>
            <Marker
              key={entry._id.toString()}
              latitude={entry.lat}
              longitude={entry.lng}
              offsetLeft={-12}
              offsetTop={-24}>
              <div
                onClick={() =>
                  setShowPopup({
                    [entry._id]: true,
                  })
                }>
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
            {showPopup[entry._id] ? (
              <Popup
                latitude={entry.lat}
                longitude={entry.lng}
                closeButton={true}
                closeOnClick={false}
                dynamicPosition
                onClose={() => setShowPopup({})}
                anchor='top'>
                <div className='popup'>
                  <h3>{entry.title}</h3>
                  <p>{entry.comments}</p>
                  <small>
                    visited on: {new Date(entry.visitDate).toLocaleDateString()}
                  </small>
                </div>
              </Popup>
            ) : null}
          </>
        );
      })}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
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
          <Popup
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            dynamicPosition
            onClose={() => setAddEntryLocation(null)}
            anchor='top'>
            <div className='popup'>
              <LogEntryForm location={addEntryLocation} />
            </div>
          </Popup>
        </>
      ) : null}
    </ReactMapGl>
  );
};

export default App;
