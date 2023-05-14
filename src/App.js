import { useState, useEffect } from 'react';
import { Grid, UploadCsvFile, Header, HistoryDrawer } from './components';
import styles from './App.module.scss';
import Papa from "papaparse";

function App() {
  const [data, setData] = useState([]);
  const [editingCell, setEditingCell] = useState(null);
  const [history, setHistory] = useState([]);
  const [openHistoryDrawer, setOpenHistoryDrawer] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('gridData');
    const storedHistory = localStorage.getItem('gridHistory');
    if (storedData) setData(JSON.parse(storedData));
    if (storedHistory) setHistory(JSON.parse(storedHistory));
  }, []);

  useEffect(() => {
    if (history.length) {
      localStorage.setItem('gridHistory', JSON.stringify(history));
    }
  }, [history]);

  const handleFileUpload = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setData(results.data);
        localStorage.setItem('gridData', JSON.stringify(results.data));
      },
    });
  };

  const handleCellClick = (rowIndex, columnName) => {
    setEditingCell({ rowIndex, columnName });
  };

  const handleCellValueChange = (event, rowIndex, columnName) => {
    const updatedData = [...data];
    updatedData[rowIndex][columnName] = event.target.value;
    setData(updatedData);
  };

  const handleCellBlur = (rowIndex, columnName, columnIndex, newValue) => {
    setEditingCell(null);
    const storedData = JSON.parse(localStorage.getItem('gridData'));
    if (storedData[rowIndex][columnName] !== newValue) {
      const type = storedData[rowIndex][columnName].length < newValue.length ? "added" : "deleted";
      const changeEntry = {
        rowIndex,
        columnIndex,
        newValue,
        type,
        timestamp: new Date().toLocaleString()
      };
      setHistory(prevHistory => [...prevHistory, changeEntry]);
      localStorage.setItem('gridData', JSON.stringify(data));
    }
  };

  const toggleHistoryDrawer = () => {
    setOpenHistoryDrawer(prevState => !prevState);
  };

  return (
    <>
      <section className={styles.appContainer}>
        <Header handleFileUpload={handleFileUpload} />
        {data.length ? (
          <Grid
            data={data}
            handleCellClick={handleCellClick}
            handleCellValueChange={handleCellValueChange}
            handleCellBlur={handleCellBlur}
            editingCell={editingCell}
            history={history}
            toggleHistoryDrawer={toggleHistoryDrawer}
          />
        ) : <UploadCsvFile />
        }
      </section>
      <HistoryDrawer open={openHistoryDrawer} toggleHistoryDrawer={toggleHistoryDrawer} history={history} />
    </>
  );
}

export default App;