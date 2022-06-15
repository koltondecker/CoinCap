import type { HistoricalData } from "../types/types";
import FetchData from "../hooks/FetchData";
import { useParams } from "react-router-dom";

const GetCandleData = () => {
  const selectedCoin = useParams();

  const {
    state: { data: selectedCoinHistoricalData },
  } = FetchData<HistoricalData>(
    `candles?exchange=kraken&interval=w1&baseId=ethereum&quoteId=${selectedCoin.coinName
      ?.replace(/ /g, "")
      .toLowerCase()}`,
    {
      isDisabled: !selectedCoin,
    }
  );

  return {
    selectedCoinHistoricalData: selectedCoinHistoricalData,
  };
};

export default GetCandleData;
