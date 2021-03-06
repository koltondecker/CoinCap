import React, { useEffect, useState } from "react";
import { DataGrid, GridCellParams } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import clsx from "clsx";
import type {
  CoinCapDataArray,
  Asset,
  TableRow,
  TableColumn,
} from "../../types/types";
import { useNavigate } from "react-router-dom";
import { formatToPercent, formatToUSD } from "../../util/formatters";

interface CryptoTableProps {
  topCoins?: CoinCapDataArray;
}

const CryptoTable = ({ topCoins }: CryptoTableProps) => {
  console.log(topCoins);
  const [dataRows, setDataRows] = useState<TableRow[]>([]);
  const [dataColumns, setDataColumns] = useState<TableColumn[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!topCoins) return;
    setDataRows(
      topCoins.data.map((asset: Asset, index: number) => {
        return {
          id: index,
          coinId: asset.id,
          rank: asset.rank,
          coin: asset.name,
          symbol: asset.symbol,
          price: `$${formatToUSD(asset.priceUsd)}`,
          marketCap: `$${formatToUSD(asset.marketCapUsd)}`,
          changePercent: `${formatToPercent(asset.changePercent24Hr)}%`,
        };
      })
    );
    setDataColumns([
      { field: "rank", headerName: "Ranking", width: 200, flex: 1 },
      { field: "coin", headerName: "Coin", width: 200, flex: 1 },
      { field: "symbol", headerName: "Symbol", width: 200, flex: 1 },
      { field: "price", headerName: "Price", width: 200, flex: 1 },
      { field: "marketCap", headerName: "Market Cap", width: 200, flex: 1 },
      {
        field: "changePercent",
        headerName: "Percentage Changed Last 24 Hrs",
        width: 200,
        cellClassName: (params: GridCellParams<string>) => {
          if (params.value == null) {
            return "";
          }

          return clsx("cell", {
            negative: parseFloat(params.value) < 0,
            positive: parseFloat(params.value) > 0,
          });
        },
        flex: 1,
      },
    ]);
  }, [topCoins]);

  const handleSelectedRow = (selection: any) => {
    console.log(selection);
    navigate(`/${selection.coinId}`);
  };

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flexGrow: 1, padding: 50 }}>
          <Box
            sx={{
              height: 300,
              width: 1,
              "& .cell-theme--cell": {
                backgroundColor: "rgba(224, 183, 60, 0.55)",
                color: "#1a3e72",
                fontWeight: "600",
              },
              "& .cell.negative": {
                backgroundColor: "#d62413",
                color: "#1a3e72",
                fontWeight: "600",
              },
              "& .cell.positive": {
                backgroundColor: "#27b32c",
                color: "#1a3e72",
                fontWeight: "600",
              },
            }}
          >
            {/* <div>{new Date(lastCheckedAt)}</div> */}
            <DataGrid
              rows={dataRows}
              columns={dataColumns}
              autoHeight
              onRowClick={(param) => handleSelectedRow(param.row)}
              sx={{
                boxShadow: 2,
                border: 2,
                borderColor: "primary.light",
                "& .MuiDataGrid-cell:hover": {
                  color: "primary.main",
                },
                borderRadius: 10,
                background: "#FFFFFF",
                padding: 5,
              }}
            />
          </Box>
        </div>
      </div>
    </>
  );
};

export default CryptoTable;
