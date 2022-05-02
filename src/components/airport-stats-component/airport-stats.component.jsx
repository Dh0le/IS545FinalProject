import { useContext } from "react";
import { ImageContext } from "../../contexts/image.context";
const AirportStats = () => {
  const { airportStats } = useContext(ImageContext);

  return (
    <div>
      {airportStats.map((airportStat) => (
        <img
          src={`${airportStat}`}
          height="800"
          width="800"
          alt={`${airportStat}`}
          key={`${airportStat}`}
        />
      ))}
    </div>
  );
};

export default AirportStats;
