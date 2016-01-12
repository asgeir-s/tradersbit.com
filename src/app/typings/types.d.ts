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
  timeOfLastSignal: number;
  accumulatedLoss: number;
  numberOfProfitableTrades: number;
  numberOfLoosingTrades: number;
  numberOfSignals: number;
  allTimeValueExcl: number;
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
  lastSignal: Signal;
}

export interface Stream {
  id: string;
  name: string;
  currencyPair: string;
  subscriptionPriceUSD: number;
  exchange: string;
  stats: Stats;
}

export interface NewStream {
    name: string;
    exchange: string;
    currencyPair: string;
    payoutAddress: string;
    subscriptionPriceUSD: number;
}

export interface Signal {
  timestamp: number;
  price: number;
  change: number;
  changeInclFee: number;
  id: string;
  value: number;
  valueInclFee: number;
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
