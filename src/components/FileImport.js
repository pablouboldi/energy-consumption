import styles from "./FileImport.module.css";

function FileImport({handleFileUpload}) {
  const accountNumber = process.env.REACT_APP_ACCOUNT_NUMBER;
  return (
    <div className={styles.importContainer}>
      <p className={styles.text}>
        Find the files to download <a href={`https://edfenergy.com/myaccount/accounts/${accountNumber}/energy-hub`}
                                      target="_blank" rel="noreferrer">here</a>
      </p>

      <label
        htmlFor="files-upload"
        className={styles.fileImportBtn}>
        Browse files
      </label>
      <input
        id="files-upload"
        multiple={true}
        type="file"
        accept=".csv"
        onChange={handleFileUpload}/>
    </div>
  );
}

export default FileImport;