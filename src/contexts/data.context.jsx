import { useEffect, useState, createContext } from "react";
import indexBy from "index-array-by";
import * as d3 from "d3";
export const DataContext = createContext({
  airports: [],
  routes: [],
  filteredRoutes: [],
  currentFrom: "",
  currentDest: "",
  iTata: {},
  setCurrentDest: () => {},
  setCurrentFrom: () => {},
  setCurrentAirports: () => {},
  setCurrentRoutes: () => {},
  setFilteredRoutes: () => {},
});

export const DataProvider = ({ children }) => {
  const airportPattern = ([
    airportId,
    name,
    city,
    country,
    iata,
    icao,
    lat,
    lng,
    alt,
    timezone,
    dst,
    tz,
    type,
    source,
  ]) => ({
    airportId,
    name,
    city,
    country,
    iata,
    icao,
    lat,
    lng,
    alt,
    timezone,
    dst,
    tz,
    type,
    source,
  });
  const routePattern = ([
    airline,
    airlineId,
    srcIata,
    srcAirportId,
    dstIata,
    dstAirportId,
    codeshare,
    stops,
    equipment,
  ]) => ({
    airline,
    airlineId,
    srcIata,
    srcAirportId,
    dstIata,
    dstAirportId,
    codeshare,
    stops,
    equipment,
  });
  const [currentFrom, setCurrentFrom] = useState("United States");
  const [currentDest, setCurrentDest] = useState("");
  const [filteredRoutes, setFilteredRoutes] = useState([]);
  const [airports, setAirports] = useState([]);
  //const [iTata, setIata] = useState({});
  const [routes, setRoutes] = useState([]);

  const createFilteredRoutes = (currentFrom, currentDest, routes) => {
    if (currentDest === "") {
      return routes.filter(
        (d) =>
          //return flights from current src to every country
          d.srcAirport.country === currentFrom &&
          d.dstAirport.country !== currentFrom
      );
    } else {
      return routes.filter(
        (d) =>
          d.srcAirport.country === currentFrom &&
          d.dstAirport.country === currentDest
        // return flights from current src to current target
      );
    }
  };
  const loadData = async () => {
    //load all airport data into context
    const airportdat = await fetch(
      "https://raw.githubusercontent.com/jpatokal/openflights/master/data/airports.dat"
    );
    const txt = await airportdat.text();
    const airports = await d3.csvParseRows(txt, airportPattern);
    const byIata = indexBy(airports, "iata", false);
    setAirports(airports);
    // load all routes data into context
    const routesdat = await fetch(
      "https://raw.githubusercontent.com/jpatokal/openflights/master/data/routes.dat"
    );
    const txt1 = await routesdat.text();
    const routes = await d3.csvParseRows(txt1, routePattern);
    const extractedRoutes = routes
      .filter(
        // first we filter out those fligth from or towards unknown
        (d) =>
          byIata.hasOwnProperty(d.srcIata) && byIata.hasOwnProperty(d.dstIata)
      )
      .filter((d) => d.stops === "0") // non-stop flights only
      .map((d) =>
        Object.assign(d, {
          srcAirport: byIata[d.srcIata],
          dstAirport: byIata[d.dstIata],
        })
      );
    setRoutes(extractedRoutes);
    const defaultRoutes = createFilteredRoutes(
      "United States",
      "",
      extractedRoutes
    );
    setFilteredRoutes(defaultRoutes);
  };
  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const newRoutes = createFilteredRoutes(currentFrom, currentDest, routes);
    setFilteredRoutes(newRoutes);
  }, [currentFrom, currentDest]);

  const value = {
    currentDest,
    currentFrom,
    setCurrentDest,
    setCurrentFrom,
    routes,
    filteredRoutes,
    airports,
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
