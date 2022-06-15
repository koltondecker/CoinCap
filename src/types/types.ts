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
  amountOwned?: number;
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
  flex: number;
}

interface CandlestickData {
  close: string;
  open: string;
  high: string;
  low: string;
  period: number;
  volume: string;
}

export interface HistoricalData {
  data: CandlestickData[];
  timestamp: number;
}

export interface LoginObj {
  userName: string;
  password: string;
}

export interface User {
  userName: string;
  password: string;
  Wallet?: Asset[];
}
