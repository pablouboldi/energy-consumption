import styles from "./FileImport.module.css";

function FileImport({handleFileUpload}) {
  const accountNumber = process.env.REACT_APP_ACCOUNT_NUMBER;
  return (
    <div className={styles.fileImportBtn}>
      <label htmlFor="image_uploads">Find the files to download <a
        href={`https://edfenergy.com/myaccount/accounts/${accountNumber}/energy-hub`}
        target='_blank' rel="noreferrer"
      >here</a>
      </label>

      <input role='button' multiple={true} type="file" accept=".csv" onChange={handleFileUpload}
        className={styles.fileImportBtn}/>
    </div>
  );
}

export default FileImport;