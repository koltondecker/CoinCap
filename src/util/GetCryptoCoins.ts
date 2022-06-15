import type { CoinCapDataArray } from "../types/types";
import FetchData from "../hooks/FetchData";

const GetCryptoCoins = () => {
  const {
    state: { data: topCoinsData },
  } = FetchData<CoinCapDataArray>("assets");

  return {
    topCoins: topCoinsData,
  };
};

export default GetCryptoCoins;
