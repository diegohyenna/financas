export const formatForMonetary = (money: number): number => {
  console.log(money);
  let resultToString = money.toString();
  let manyDigitsAfterTheDecimalPoint = resultToString.substring(
    resultToString.indexOf(".") + 1,
    resultToString.length
  ).length;
  return manyDigitsAfterTheDecimalPoint > 2
    ? parseFloat(money.toFixed(2))
    : money;
};
