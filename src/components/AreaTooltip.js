import styles from "./AreaTooltip.module.css";

function AreaTooltip({active, payload, dataType}) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.customTooltip}>
        {payload.map((pld) => (
          <div className={dataType === "energy" ? styles.energyValue : styles.costValue}>
            <div>{pld.name}</div>
            <div>{pld.value} {pld.unit}</div>
          </div>
        ))}
      </div>
    );
  }
  return null
}

export default AreaTooltip;