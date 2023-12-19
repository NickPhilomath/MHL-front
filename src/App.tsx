import { Grid, GridItem, Show } from "@chakra-ui/react";
import "./styles/App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <Grid
      templateAreas={{ base: `"nav" "main"`, lg: `"aside nav" "aside main"` }}
      templateColumns={{
        base: "1fr",
        lg: "250px 1fr",
      }}
    >
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <Show above="lg">
        <GridItem
          area="aside"
          pos="fixed"
          width="250px"
          height="100vh"
          paddingX={5}
          boxShadow="2xl"
        >
          <Sidebar />
        </GridItem>
      </Show>
      <GridItem area="main" margin={7}>
        <DashBoard />
      </GridItem>
    </Grid>
  );
}

export default App;

// const fetchData = () => {
// const localAuth = window.localStorage.getItem("auth");
// axios
//   .get(`${BaseUrl}/api/trucks`, {
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:
//         "JWT " + JSON.parse(localAuth ? localAuth : "").accessToken,
//     },
//   })
//   .then((res) => {
//     setData(res.data);
//   })
//   .catch((err) => console.log(err));
//   setData([]);
// };

// useEffect(() => {
//   const interval = setInterval(() => {
//     setNumFetch(numFentch + 1);
//     fetchData();
//   }, 1000 * 60 * 5);
//   return () => {
//     clearInterval(interval);
//   };
// }, [numFentch]);
