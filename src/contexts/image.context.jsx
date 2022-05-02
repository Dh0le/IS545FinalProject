import { createContext, useEffect, useState } from "react";

export const ImageContext = createContext({
  fligths: [],
  airportStats: [],
  setFlights: () => {},
  setAirprotStats: () => {},
});

export const ImageProvider = ({ children }) => {
  const loadFrames = (context) => {
    const frames = [];
    context.keys().forEach((k) => {
      frames.push(context(k));
    });
    return frames;
  };
  const fligthContext = require.context("../asset/flights", false, /.svg/);
  const airportStatsContext = require.context("../asset", false, /.png/);

  const [flights, setFlights] = useState([]);
  const [airportStats, setAirprotStats] = useState([]);
  useEffect(() => {
    const flightsGraph = loadFrames(fligthContext);
    const airportStats = loadFrames(airportStatsContext);
    setFlights(flightsGraph);
    setAirprotStats(airportStats);
  }, []);
  const value = {
    flights,
    airportStats,
  };
  return (
    <ImageContext.Provider value={value}>{children}</ImageContext.Provider>
  );
};
