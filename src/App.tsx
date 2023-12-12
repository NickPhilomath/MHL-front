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
  const [numFentch, setNumFetch] = useState(0);

  const fetchData = () => {
    const localAuth = window.localStorage.getItem("auth");
    axios
      .get(`${BaseUrl}/api/trucks`, {
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
  };

  useEffect(() => {
    if (!isAuthorized) return;
    fetchData();

    return;
  }, [isAuthorized]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNumFetch(numFentch + 1);
      fetchData();
    }, 1000 * 60 * 5);
    return () => {
      clearInterval(interval);
    };
  }, [numFentch]);

  return (
    <>
      {isAuthorized && (
        <>
          <Sidebar />
          <div className="my-table-container">
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setNumFetch(numFentch + 1);
                    fetchData();
                  }}
                >
                  Refresh
                </button>
              </div>
              <div className="col">
                <h3>Refreshed {numFentch} times</h3>
              </div>
            </div>
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
