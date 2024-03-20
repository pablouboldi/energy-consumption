import {useState} from "react";
import styles from "./CorrelationCoefficient.module.css";

function CorrelationCoefficient({temperatures, data, dataType}) {
  const [corrCoef, setCorrCoef] = useState(null);

  function correlationCoefficient(arr1, arr2) {

    const n = Math.min(arr2.length, arr1.length);

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let squareSumX = 0;
    let squareSumY = 0;

    for (let i = 0; i < n; i++) {

      // Sum of elements of array X.
      sumX = sumX + arr1[i];

      // Sum of elements of array Y.
      sumY = sumY + arr2[i];

      // Sum of X[i] * Y[i].
      sumXY = sumXY + arr1[i] * arr2[i];

      // Sum of square of array elements.
      squareSumX = squareSumX + arr1[i] * arr1[i];
      squareSumY = squareSumY + arr2[i] * arr2[i];
    }

    // Use formula for calculating correlation
    // coefficient.
    const corr = (n * sumXY - sumX * sumY) /
      (Math.sqrt((n * squareSumX -
          sumX * sumX) *
        (n * squareSumY -
          sumY * sumY)));

    setCorrCoef(corr);
  }

  return (
    <>
      <button
        onClick={() => correlationCoefficient(temperatures, data)}
        className={dataType === "energy" ? styles.energyCorrelationCoefficientBtn : styles.costCorrelationCoefficientBtn}>
        Find correlation
      </button>
      <span className={styles.text}>{corrCoef && corrCoef.toFixed(3)}</span>
    </>
  );
}

export default CorrelationCoefficient;