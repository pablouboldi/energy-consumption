import styles from "./FileImport.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFileImport} from "@fortawesome/free-solid-svg-icons";

function FileImport({handleFileUpload}) {
  const accountNumber = process.env.REACT_APP_ACCOUNT_NUMBER;
  return (
    <div className={styles.importContainer}>
      <label
        htmlFor="files-upload"
        className={styles.fileImportBtn}>
        <FontAwesomeIcon icon={faFileImport} size="lg"/>
        Browse files
      </label>
      <input
        id="files-upload"
        multiple={true}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}/>

      <p className={styles.text}>
        Find the files to download <a href={`https://edfenergy.com/myaccount/accounts/${accountNumber}/energy-hub`}
                                      target="_blank" rel="noreferrer">here</a>
      </p>
    </div>
  );
}

export default FileImport;