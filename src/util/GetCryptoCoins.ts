import type { CoinCapDataArray, HistoricalData } from "../types/types";
import FetchData from "../hooks/FetchData";
import { useParams } from "react-router-dom";
import { calculateUsdValue } from "./conversions";

const GetCryptoCoins = () => {
  const selectedCoin = useParams();

  const {
    state: { data: topCoinsData },
  } = FetchData<CoinCapDataArray>("assets");

  const {
    state: { data: selectedCoinHistoricalData },
  } = FetchData<HistoricalData>(
    `candles?exchange=poloniex&interval=w1&baseId=ethereum&quoteId=${selectedCoin.coinName?.toLowerCase()}`,
    {
      isDisabled: !selectedCoin,
    }
  );

  return {
    topCoins: topCoinsData,
    selectedCoinHistoricalData: selectedCoinHistoricalData,
    calculateUsdValue,
  };
};

export default GetCryptoCoins;
