function FileImport({handleFileUpload}) {
  return (
    <input multiple={true} type="file" accept=".csv" onChange={handleFileUpload}/>
  )
}

export default FileImport;