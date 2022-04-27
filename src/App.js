import { Routes, Route } from "react-router-dom";
import "./App.css";
import GlobalGraph from "./components/global-component/global-component";
import Home from "./routes/home";
import Navigation from "./routes/navigation/navigation";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/glob" element={<GlobalGraph />} />
      </Route>
    </Routes>
  );
}

export default App;
