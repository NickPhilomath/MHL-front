import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import Table from "./components/Table";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import { BaseUrl } from ".";

function App() {
  const [isAuthorized, setAuthorized] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!isAuthorized) return;
    const controller = new AbortController();
    const localAuth = window.localStorage.getItem("auth");
    axios
      .get(`${BaseUrl}/api/trucks`, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "JWT " + JSON.parse(localAuth ? localAuth : "").accessToken,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));

    return () => controller.abort();
  }, [isAuthorized]);

  return (
    <>
      {isAuthorized && (
        <>
          <Sidebar />
          <div className="my-table-container">
            <Table data={data} />
          </div>
        </>
      )}
      {!isAuthorized && (
        <div className="my-form-holder">
          <Login setAuthorized={setAuthorized} />
        </div>
      )}
    </>
  );
}

export default App;
