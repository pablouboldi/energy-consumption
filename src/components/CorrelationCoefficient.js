import {useState} from "react";

function CorrelationCoefficient({temperatures, data, dataType}) {
  const [corrCoef, setCorrCoef] = useState(null)

  function correlationCoefficient(arr1, arr2) {

    const n = Math.min(arr2.length, arr1.length)

    let sum_X = 0, sum_Y = 0, sum_XY = 0;
    let squareSum_X = 0, squareSum_Y = 0;

    for (let i = 0; i < n; i++) {

      // Sum of elements of array X.
      sum_X = sum_X + arr1[i];

      // Sum of elements of array Y.
      sum_Y = sum_Y + arr2[i];

      // Sum of X[i] * Y[i].
      sum_XY = sum_XY + arr1[i] * arr2[i];

      // Sum of square of array elements.
      squareSum_X = squareSum_X + arr1[i] * arr1[i];
      squareSum_Y = squareSum_Y + arr2[i] * arr2[i];
    }

    // Use formula for calculating correlation
    // coefficient.
    let corr = (n * sum_XY - sum_X * sum_Y) /
      (Math.sqrt((n * squareSum_X -
          sum_X * sum_X) *
        (n * squareSum_Y -
          sum_Y * sum_Y)));

    setCorrCoef(corr)
  }

  return (
    <div>
      <button onClick={() => correlationCoefficient(temperatures, data)}>
        Find correlation
      </button>
      <p>{corrCoef}</p>
    </div>
  )
}

export default CorrelationCoefficient;