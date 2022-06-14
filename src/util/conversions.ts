export const calculateUsdValue = (
  assetAmount: string,
  selectedCoinData: any
): string => {
  if (!selectedCoinData?.data.priceUsd) return "Unknown";
  const usdValue = (
    parseFloat(assetAmount) * parseFloat(selectedCoinData.data.priceUsd)
  ).toFixed(2);
  return usdValue;
};
