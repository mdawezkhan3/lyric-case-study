import styles from "../App.module.scss";
import UploadFileIcon from "../assets/icons/upload-file.svg"

export const Header = ({ handleFileUpload }) => {
  return (
    <header className={styles.headerContainer}>
    <div className={styles.headerText}>
      <h2 style={{paddingBottom: 10}}>React Data grid</h2>
      <p>A data grid is an architecture or set of services that gives individuals or groups of users the ability to access, modify and transfer extremely large amounts of geographically distributed data for research purposes</p>
    </div>
    <label htmlFor="upload-file">
      <input
        style={{ display: "none" }}
        id="upload-file"
        name="upload-file"
        type="file"
        onChange={handleFileUpload}
      />
      <div className={styles.uploadButtonContainer}>
        <span className={styles.uploadButton}>
          <img src={UploadFileIcon} width="18px" height="18px" />
          <p className={styles.uploadButtonText}>Upload button</p>
        </span>
      </div>
    </label>
  </header>
  );
};
