import styles from "./AppLayout.module.css";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import Papa from "papaparse";
import {useState} from "react";

function AppLayout() {
  const [combinedData, setCombinedData] = useState([]);

  function handleFileUpload(event) {
    const files = event.target.files;
    const promises = [];

    for (let i = 0; i < files.length; i++) {
      promises.push(processFile(files[i]));
    }

    async function processFile(file) {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: result => {
            setCombinedData(prevData => prevData.concat(result.data));
            resolve();
          },
          error: reject
        });
      });
    }

    Promise.all(promises)
      .catch(error => {
        console.error("Error parsing file:", error);
      });
  }

  return (
    <div className={styles.app}>
      <Sidebar handleFileUpload={handleFileUpload}/>
      <Dashboard combinedData={combinedData}/>
    </div>
  );
}

export default AppLayout;