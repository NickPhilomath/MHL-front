import {
  Table,
  TableContainer,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import useData from "../hooks/useData";
import { Truck } from "..";
import { mps2mph } from "../util";

const DashBoard = () => {
  const { data, isLoading, error } = useData<Truck>("/trucks");

  // const filteredData = data.filter(
  //   (data: Truck) => !data.name.toLowerCase().includes("inactive")
  // );

  // const sortedData = filteredData.sort((prev, next) => {
  //   return next.weather.wind.speed - prev.weather.wind.speed;
  // });

  // const getWindTextColor = (speed: number) => {
  //   /*
  //   >-15 - green
  //   15-25 - yellow
  //   25-35 - orange
  //   35-> - red
  //   */
  //   return speed < 15
  //     ? "m-good"
  //     : speed < 25
  //     ? "m-warn"
  //     : speed < 35
  //     ? "m-risky"
  //     : "m-danger";
  // };

  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th isNumeric>#N</Th>
              <Th>Name</Th>
              <Th>Location</Th>
              <Th isNumeric>Speed (mph)</Th>
              <Th>Weather</Th>
              <Th isNumeric>Wind (mph)</Th>
              <Th isNumeric>Temp (°C)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((truck, index) => {
              return (
                <Tr>
                  <Td>{index + 1}</Td>
                  <Td>{truck.name}</Td>
                  <Td>{truck.location.reverseGeo.formattedLocation}</Td>
                  <Td>{truck.location.speed}</Td>
                  <Td>{truck.weather.status}</Td>
                  <Td>{truck.weather.wind.speed}</Td>
                  <Td>{truck.weather.temp}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DashBoard;
