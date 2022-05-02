import { useContext } from "react";
import { ImageContext } from "../../contexts/image.context";
const FlightStats = () => {
  const { flights } = useContext(ImageContext);
  return (
    <div>
      {flights.map((flight) => (
        <img
          src={`${flight}`}
          height="800"
          width="800"
          alt={`${flight}`}
          key={`${flight}`}
        />
      ))}
    </div>
  );
};

export default FlightStats;
