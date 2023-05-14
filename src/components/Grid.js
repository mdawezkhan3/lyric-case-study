import styles from "../App.module.scss";
import HistoryIcon from "../assets/icons/clock-icon.svg";

export const Grid = ({ data, handleCellClick, handleCellValueChange, handleCellBlur, editingCell, toggleHistoryDrawer, history }) => {
  return (
    <main className={styles.grid}>
      {!!history?.length ? (
        <div className={styles.historyBtnContainer}>
          <img style={{cursor: "pointer"}} onClick={toggleHistoryDrawer} src={HistoryIcon} width="30px" height="30px" />
        </div>
      ) : null}
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((columnName, index) => (
                <th key={index}>{columnName}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.entries(row).map(([columnName, value], cellIndex) => (
                <td
                  key={cellIndex}
                  onClick={() => handleCellClick(rowIndex, columnName)}
                >
                  {editingCell &&
                  editingCell.rowIndex === rowIndex &&
                  editingCell.columnName === columnName ? (
                    <input
                      type="text"
                      value={value}
                      onChange={(event) =>
                        handleCellValueChange(
                          event,
                          rowIndex,
                          columnName
                        )
                      }
                      onBlur={e => handleCellBlur(rowIndex, columnName, cellIndex, e.target.value)}
                      autoFocus
                    />
                  ) : (
                    value
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};
