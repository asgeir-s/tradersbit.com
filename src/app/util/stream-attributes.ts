import { Stream, StreamsAttribute} from '../typings/types'


export class StreamAttributes {

  private static infoAttribute: Array<StreamsAttribute> = [
    {
      name: "ID",
      jsonPath: "id",
      short: "ID",
      description: '',
      on: false,
      getIt: (stream: Stream) => {
        return stream.id;
      }
    },
    {
      name: "Name",
      jsonPath: "name",
      short: "Name",
      description: '',
      on: true,
      getIt: (stream: Stream) => {
        return stream.name;
      }
    },
    {
      name: "Subscription 30 days (USD)",
      short: "SP$",
      description: '',
      jsonPath: "subscriptionPriceUSD",
      on: false,
      getIt: (stream: Stream) => {
        return stream.subscriptionPriceUSD.toFixed(2) + '$';
      }
    },
    {
      name: "Exchange",
      short: "EXC",
      description: '',
      jsonPath: "exchange",
      on: true,
      getIt: (stream: Stream) => {
        return stream.exchange;
      }
    },
    {
      name: "Currency Pair",
      jsonPath: "currencyPair",
      short: "CP",
      description: '',
      on: false,
      getIt: (stream: Stream) => {
        return stream.currencyPair;
      }
    },
  ];


  private static statsAttribute: Array<StreamsAttribute> = [
    {
      name: "Average Monthly Profit",
      short: "AMP",
      description: "The average profit per month calculated from first to last signal.",
      jsonPath: "stats.averageMonthlyProfitIncl",
      on: true,
      getIt: (stream: Stream) => {
        return (stream.stats.averageMonthlyProfitIncl * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      description: '',
      jsonPath: "stats.profitFactor",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.profitFactor.toFixed(2);
      }
    },
    {
      name: "Number of Loosing Trades",
      short: "NLT",
      description: "Number of trads with profit smaller then 0",
      jsonPath: "stats.numberOfLoosingTrades",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.numberOfLoosingTrades);
      }
    },
    {
      name: "Average Winning Trade",
      short: "AWT",
      description: "Average profit on a trade with profit larger then 0",
      jsonPath: "stats.averageWinningTrade",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.averageWinningTrade).toFixed(2) + '%';
      }
    },
    {
      name: "Number of Profitable Trades",
      short: "NPT",
      description: "Number of closed trades with profit larger then 0",
      jsonPath: "stats.numberOfProfitableTrades",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfProfitableTrades;
      }
    },
    {
      name: "Accumulated Loss",
      short: "AL",
      description: '',
      jsonPath: "stats.accumulatedLoss",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.accumulatedLoss).toFixed(2);
      }
    },
    {
      name: "Average Loosing Trade",
      short: "ALT",
      description: "Average loss of all losing trades.",
      jsonPath: "stats.averageLoosingTrade",
      on: false,
      getIt: (stream: Stream) => {
        return -(stream.stats.averageLoosingTrade * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Part Winning Trades",
      short: "PWT",
      description: "Percent closed trades with profit larger then 0",
      jsonPath: "stats.partWinningTrades",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.partWinningTrades * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Part Loosing Trades",
      short: "PLT",
      description: "Percent closed trades with profit smaller then 0",
      jsonPath: "stats.partLoosingTrades",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.partLoosingTrades * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on a trade",
      jsonPath: "stats.averageTrade",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.averageTrade * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Max Draw Down",
      short: "MDD",
      description: "largest loss before a new high",
      jsonPath: "stats.maxDrawDown",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.maxDrawDown * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Alltime Value Profit",
      short: "AVP",
      description: "All-time profit for this signal stream.",
      jsonPath: "stats.allTimeValueIncl",
      on: false,
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2);
      }
    },
    {
      name: "Number of Closed Trads",
      short: "NCT",
      description: '',
      jsonPath: "stats.numberOfClosedTrades",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      }
    },
    {
      name: "Months of Trading",
      short: "MT",
      description: '',
      jsonPath: "stats.monthsOfTrading",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.monthsOfTrading.toFixed(2);
      }
    },
    {
      name: "Time of Last Signal",
      short: "TLS",
      description: '',
      jsonPath: "stats.timeOfLastSignal",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.timeOfLastSignal;
      }
    },
    {
      name: "Average Monthly Profit Excl",
      short: "AMPx",
      description: "The average profit per month calculated from first to last signal. Excluding trading fees.",
      jsonPath: "stats.averageMonthlyProfitExcl",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.averageMonthlyProfitExcl.toFixed(2) + '%';
      }
    },
    {
      name: "All Time Value Change Excl",
      short: "ATVx",
      description: "All-time profit for this signal stream. Excluding trading fees.",
      jsonPath: "stats.allTimeValueExcl",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.allTimeValueExcl - 1).toFixed(2) + '%';
      }
    },
    {
      name: "Price on First Trade",
      short: "PFT",
      description: '',
      jsonPath: "stats.firstPrice",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.firstPrice.toFixed(2) + '$';
      }
    },
    {
      name: "Buy and Hold Change (first to last trade)",
      short: "BHC",
      description: "Profit it buying at start of signal stream and selling on last signal",
      jsonPath: "stats.buyAndHoldChange",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.buyAndHoldChange * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Accumulated Profit",
      short: "AP",
      description: '',
      jsonPath: "stats.accumulatedProfit",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.accumulatedProfit.toFixed(2);
      }
    },
    {
      name: "Time of First Signal",
      short: "TFS",
      description: '',
      jsonPath: "stats.timeOfFirstSignal",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.timeOfFirstSignal.toFixed(2);
      }
    }
  ];

  static allAtributes(): Array<StreamsAttribute> {
    return StreamAttributes.infoAttribute.concat(StreamAttributes.statsAttribute);
  }

  static infoAttributes(): Array<StreamsAttribute> {
    return StreamAttributes.infoAttribute;
  }

  static statsAttributes(): Array<StreamsAttribute> {
    return StreamAttributes.statsAttribute
  }


}

 function formatDate(inn: number): string {
    let d = new Date(inn);
    let curr_date = d.getDate();
    let curr_month = d.getMonth() + 1; //Months are zero based
    let curr_year = d.getFullYear;
    return curr_month + '/' + curr_date + "/" + curr_year + ' ' + d.toTimeString;
  }