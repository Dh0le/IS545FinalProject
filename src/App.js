import { Routes, Route } from "react-router-dom";
import "./App.css";
import AirportStats from "./components/airport-stats-component/airport-stats.component";
import FlightStats from "./components/flights-stats-component/flight-stats.component";
import GlobalGraph from "./components/global-component/global-component";
import Home from "./routes/home";
import Navigation from "./routes/navigation/navigation";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/glob" element={<GlobalGraph />} />
        <Route path="/astats" element={<AirportStats />} />
        <Route path="/fstats" element={<FlightStats />} />
      </Route>
    </Routes>
  );
}

export default App;
