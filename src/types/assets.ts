import { GridCellParams } from "@mui/x-data-grid";

export interface Asset {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
}

export interface CoinCapData {
  data: Asset;
  timestamp: number;
}
export interface CoinCapDataArray {
  data: Asset[];
  timestamp: number;
}

export interface TableRow {
  id: number;
  rank: string;
  coin: string;
  symbol: string;
  price: string;
  marketCap: string;
  changePercent: string;
}

export interface TableColumn {
  field: string;
  headerName: string;
  width: number;
  cellClassName?: (params: GridCellParams<string>) => string;
}

export interface HistoricalDataPoint {
  x: Date;
  y: number[];
}

export interface HistoricalData {
  data: HistoricalDataPoint[];
  timestamp: number;
}
