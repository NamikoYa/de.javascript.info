function getMaxSubSumme(arr) {
  let maxSumme = 0;
  let teilSumme = 0;

  for (let item of arr) {
    teilSumme += item;
    maxSumme = Math.max(maxSumme, teilSumme);
    if (teilSumme < 0) teilSumme = 0;
  }
  return maxSumme;
}
