import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Navbar from "./navbar/Navbar";
import CryptoCard from "./CryptoCard/CryptoCard";
import { Box, Grid, Skeleton } from "@mui/material";
import { useParams } from "react-router";
import FetchData from "../hooks/FetchData";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import GetCandleData from "../util/GetCandleData";

const SingleAssetView = () => {
  const { selectedCoinHistoricalData } = GetCandleData();
  let selectedCoin = useParams();
  const {
    state: { data: coinData },
  } = FetchData(
    `assets/${selectedCoin.coinName?.replace(/ /g, "").toLowerCase()}`
  );

  const [history, setHistory] = useState<any[]>();
  const [coinDetails, setCoinDetails] = useState<any>();

  let options = {};

  useEffect(() => {
    if (selectedCoinHistoricalData) {
      console.log(selectedCoinHistoricalData);
      let historyArr = [];
      historyArr.push({
        data: selectedCoinHistoricalData?.data.map((el) => {
          return {
            x: new Date(el.period),
            y: [
              parseFloat(el.open),
              parseFloat(el.high),
              parseFloat(el.low),
              parseFloat(el.close),
            ],
          };
        }),
      });
      setHistory(historyArr);
    }
  }, [selectedCoinHistoricalData]);

  useEffect(() => {
    setCoinDetails(coinData);
  }, [coinData, selectedCoin]);

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
      <Navbar />
      <h1
        style={{
          textAlign: "center",
          fontSize: 50,
          color: "white",
          marginTop: 30,
        }}
      >
        {coinDetails && coinDetails.data.name}
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={4} style={{ padding: 50 }}>
          <CryptoCard coinDetails={coinDetails} />
        </Grid>
        <Grid item xs={8} style={{ padding: 50 }}>
          <div
            style={{
              borderStyle: "light",
              borderRadius: 10,
              background: "#d6d2d2",
            }}
          >
            {history && !history[0].data.length ? (
              <Box height={500} style={{ textAlign: "center" }}>
                <SentimentVeryDissatisfiedIcon fontSize="large" />
                "Oh no! There seems to be no candlestick data available"
              </Box>
            ) : history ? (
              <>
                <div id="chart"></div>
                <Chart
                  options={options}
                  series={history}
                  type="candlestick"
                  height={500}
                />
              </>
            ) : (
              <Skeleton variant="rectangular" height={500} animation="wave" />
            )}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default SingleAssetView;
