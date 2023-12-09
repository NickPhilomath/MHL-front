import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Table from "./components/Table";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
      <Sidebar />
      <div className="my-table-container">
        <Table />
      </div>
    </>
  );
}

export default App;
