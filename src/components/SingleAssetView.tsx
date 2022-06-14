import { useEffect, useState } from "react";
import GetCryptoCoins from "../util/GetCryptoCoins";
import Chart from "react-apexcharts";
import Navbar from "./navbar/Navbar";

// interface Random {
//   close: string;
//   open: string;
//   high: string;
//   low: string;
//   period: number;
//   volume: string;
// }

const SingleAssetView = () => {
  const { selectedCoinHistoricalData } = GetCryptoCoins();
  const [history, setHistory] = useState<any[]>();
  let options = {};

  useEffect(() => {
    if (selectedCoinHistoricalData) {
      console.log(selectedCoinHistoricalData.data);
      let historyArr = [];
      historyArr.push({
        data: selectedCoinHistoricalData?.data.map((el: any) => {
          return {
            x: new Date(el.period),
            y: [
              parseFloat(el.close),
              parseFloat(el.high),
              parseFloat(el.low),
              parseFloat(el.open),
            ],
          };
        }),
      });
      setHistory(historyArr);
    }
  }, [selectedCoinHistoricalData]);

  options = {
    chart: {
      type: "candlestick",
      height: 350,
    },
    title: {
      text: "",
      align: "left",
    },
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <Navbar search={false} />
      <h1 style={{ textAlign: "center", fontSize: 50 }}>Bitcoin</h1>
      <div id="chart"></div>
      {history && (
        <Chart
          options={options}
          series={history}
          type="candlestick"
          height={500}
        />
      )}
    </>
  );
};

export default SingleAssetView;
