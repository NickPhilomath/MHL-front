interface Wind {
  speed: number;
  deg: number;
}

interface Weather {
  status: string;
  wind: Wind;
  humidity: number;
  temp: number;
  clouds: number;
}

interface ReverseGeo {
  formattedLocation: string;
}

interface Location {
  latitude: number;
  longitude: number;
  speed: number;
  reverseGeo: ReverseGeo;
}

interface Truck {
  id: number;
  name: string;
  location: Location;
  weather: Weather;
}

interface Props {
  data: Truck[];
}

const Table = ({ data }: Props) => {
  const filteredData = data.filter(
    (data: Truck) => !data.name.toLowerCase().includes("inactive")
  );

  const sortedData = filteredData.sort((prev, next) => {
    return next.weather.wind.speed - prev.weather.wind.speed;
  });

  const mps2mph = (mps: number) => {
    return parseFloat((mps * 2.237).toFixed(2));
  };

  const getWindTextColor = (speed: number) => {
    /* 
    >-15 - green
    15-25 - yellow
    25-35 - orange
    35-> - red
    */
    return speed < 15
      ? "m-good"
      : speed < 25
      ? "m-warn"
      : speed < 35
      ? "m-risky"
      : "m-danger";
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#N</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Speed (mph)</th>
          <th scope="col">Weather</th>
          <th scope="col">Wind (mph)</th>
          <th scope="col">Temp (°C)</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((truck, index) => {
          const windSpeed = mps2mph(truck.weather.wind.speed);
          return (
            <tr key={truck.id}>
              <td>{index + 1}</td>
              <td>{truck.name}</td>
              <td>
                {/* {truck.location.latitude} {truck.location.longitude} */}
                {truck.location.reverseGeo.formattedLocation}
              </td>
              <td>{truck.location.speed}</td>
              <td>{truck.weather.status}</td>
              <td className={"text-bold " + getWindTextColor(windSpeed)}>
                {windSpeed}
              </td>
              <td>{truck.weather.temp}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
