import { useContext, useEffect, useRef } from "react";
import { DataContext } from "../../contexts/data.context";
import Globe from "react-globe.gl";
import TargetInput from "../input-component/input-component";
import "./global.styles.scss";
const GlobalGraph = () => {
  const OPACITY = 0.22;
  const { filteredRoutes, airports } = useContext(DataContext);
  const globeEl = useRef();
  useEffect(() => {
    globeEl.current.pointOfView({ lat: 39.6, lng: -98.5, altitude: 2 });
  }, []);
  return (
    <div className="glob-container">
      <script src="//unpkg.com/react-globe.gl"></script>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        arcsData={filteredRoutes}
        arcLabel={(d) => `${d.airline}: ${d.srcIata} &#8594; ${d.dstIata}`}
        arcStartLat={(d) => +d.srcAirport.lat}
        arcStartLng={(d) => +d.srcAirport.lng}
        arcEndLat={(d) => +d.dstAirport.lat}
        arcEndLng={(d) => +d.dstAirport.lng}
        arcDashLength={0.25}
        arcDashGap={1}
        arcDashInitialGap={() => Math.random()}
        arcDashAnimateTime={4000}
        arcColor={(d) => [
          `rgba(0, 255, 0, ${OPACITY})`,
          `rgba(255, 0, 0, ${OPACITY})`,
        ]}
        arcsTransitionDuration={0}
        pointsData={airports}
        pointColor={() => "orange"}
        pointAltitude={0}
        pointLabel={(a) => `${a.iata}`}
        pointRadius={0.02}
        pointsMerge={false}
      />
      <TargetInput />;
    </div>
  );
};
export default GlobalGraph;
