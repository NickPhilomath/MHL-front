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

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#N</th>
          <th scope="col">Name</th>
          <th scope="col">Location</th>
          <th scope="col">Speed (mph)</th>
          <th scope="col">Weather</th>
          <th scope="col">Wind (m/s)</th>
          <th scope="col">Temp</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((truck, index) => {
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
              <td>{truck.weather.wind.speed}</td>
              <td>{truck.weather.temp}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
