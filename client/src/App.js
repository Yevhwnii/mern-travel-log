import React, { useState } from 'react';
import ReactMapGl from 'react-map-gl';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 37.7577,
    longtitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGl
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      {...viewport}
      onViewportChange={setViewport}
    />
  );
};

export default App;
