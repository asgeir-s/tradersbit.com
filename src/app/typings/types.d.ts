export interface CoinbaseEmbedCode {
  id: string;
  embed_code: string;
}

export interface Trade {
  open: Signal;
  close: Signal;
  position: string;
}

export interface Stats {
  partWinningTrades: number;
  partLoosingTrades: number;
  timeOfLastSignal: number;
  accumulatedLoss: number;
  averageMonthlyProfitIncl: number;
  averageLoosingTrade: number;
  numberOfProfitableTrades: number;
  averageWinningTrade: number;
  numberOfLoosingTrades: number;
  numberOfSignals: number;
  averageMonthlyProfitExcl: number;
  profitFactor: number;
  monthsOfTrading: number;
  allTimeValueExcl: number;
  averageTrade: number;
  maxDrawDown: number;
  firstPrice: number;
  buyAndHoldChange: number;
  accumulatedProfit: number;
  timeOfFirstSignal: number;
  allTimeValueIncl: number;
  numberOfClosedTrades: number;
}

export interface PublisherStream {
  id: string;
  currencyPair: string;
  subscriptionPriceUSD: number;
  exchange: string;
  stats: Stats;
  status: number;
}

export interface Stream {
  id: string;
  currencyPair: string;
  subscriptionPriceUSD: number;
  exchange: string;
  stats: Stats;
}

export interface Signal {
  timestamp: number;
  price: number;
  change: number;
  id: string;
  value: number;
  signal: number;
}

export interface NewStreamResponds {
  streamId: string;
  apiKey: string;
}

export interface Subscription {
  email: string;
  apiKey: string;
  apiSecret: string;
  signalsToEmail: boolean;
}


export interface StreamsAttribute {
  name: string;
  short: string;
  description: string;
  jsonPath: string;
  on: boolean;
  getIt: any
}
