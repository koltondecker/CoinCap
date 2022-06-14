export const formatToPercent = (value: string): number => {
  return parseFloat(parseFloat(value).toFixed(4));
};

export const formatToUSD = (value: string): string => {
  return parseFloat(value)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
