export default function calculateAverage(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must have the same length");
  }
  return arr1.map((value, index) => (value + arr2[index]) / 2);
}