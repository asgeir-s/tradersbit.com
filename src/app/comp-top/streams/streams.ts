import { PublicApiService } from '../../services/public-api-service/public-api-service'
import { Stream, StreamsAttribute } from '../../typings/types'

/** @ngInject */
export function tbStreams(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/streams/streams.html',
    controller: tbStreamsCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class tbStreamsCtrl {
  public streamsObs: any;
  public attributes: StreamsAttribute[] = [
    {
      name: "ID",
      jsonPath: "id",
      short: "ID",
      getIt: (stream: Stream) => {
        return stream.id;
      }
    },
    {
      name: "Subscription Price (USD)",
      short: "SP$",
      jsonPath: "subscriptionPriceUSD",
      getIt: (stream: Stream) => {
        return stream.subscriptionPriceUSD;
      }
    },
    {
      name: "Exchange",
      short: "EXC",
      jsonPath: "exchange",
      getIt: (stream: Stream) => {
        return stream.exchange;
      }
    },
    {
      name: "Currency Pair",
      jsonPath: "currencyPair",
      short: "CP",
      getIt: (stream: Stream) => {
        return stream.currencyPair;
      }
    },
    {
      name: "Average Monthly Profit (incl. fees)",
      short: "AMPi",
      jsonPath: "stats.averageMonthlyProfitIncl",
      getIt: (stream: Stream) => {
        return (stream.stats.averageMonthlyProfitIncl * 100).toFixed(2);
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      jsonPath: "stats.profitFactor",
      getIt: (stream: Stream) => {
        return (stream.stats.profitFactor * 100).toFixed(2);
      }
    },
    {
      name: "Number of Loosing Trades",
      short: "NLT",
      jsonPath: "stats.numberOfLoosingTrades",
      getIt: (stream: Stream) => {
        return (stream.stats.numberOfLoosingTrades).toFixed(2);
      }
    },
    {
      name: "Average Winning Trade",
      short: "AWT",
      jsonPath: "stats.averageWinningTrade",
      getIt: (stream: Stream) => {
        return (stream.stats.averageWinningTrade).toFixed(2);
      }
    },
    {
      name: "Number of Profitable Trades",
      short: "NPT",
      jsonPath: "stats.numberOfProfitableTrades",
      getIt: (stream: Stream) => {
        return stream.stats.numberOfProfitableTrades;
      }
    },
    {
      name: "Accumulated Loss",
      short: "AL",
      jsonPath: "stats.accumulatedLoss",
      getIt: (stream: Stream) => {
        return (stream.stats.accumulatedLoss).toFixed(2);
      }
    },
    {
      name: "Average Loosing Trade",
      short: "ALT",
      jsonPath: "stats.averageLoosingTrade",
      getIt: (stream: Stream) => {
        return (stream.stats.averageLoosingTrade).toFixed(2);
      }
    },
    {
      name: "Part Winning Trades",
      short: "PWT",
      jsonPath: "stats.partWinningTrades",
      getIt: (stream: Stream) => {
        return (stream.stats.partWinningTrades * 100).toFixed(2);
      }
    },
    {
      name: "Part Loosing Trades",
      short: "PLT",
      jsonPath: "stats.partLoosingTrades",
      getIt: (stream: Stream) => {
        return (stream.stats.partLoosingTrades * 100).toFixed(2);
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      jsonPath: "stats.averageTrade",
      getIt: (stream: Stream) => {
        return (stream.stats.averageTrade * 100).toFixed(2);
      }
    },
    {
      name: "Max Draw Down",
      short: "MDD",
      jsonPath: "stats.maxDrawDown",
      getIt: (stream: Stream) => {
        return (stream.stats.maxDrawDown * 100).toFixed(2);
      }
    },
    {
      name: "Alltime Value Profit (incl. fees)",
      short: "AVPi",
      jsonPath: "stats.allTimeValueIncl",
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2);
      }
    },
    {
      name: "Number of Closed Trads",
      short: "NCT",
      jsonPath: "stats.numberOfClosedTrades",
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      }
    },
    {
      name: "Months of Trading",
      short: "MT",
      jsonPath: "stats.monthsOfTrading",
      getIt: (stream: Stream) => {
        return stream.stats.monthsOfTrading.toFixed(2);
      }
    },
    {
      name: "Time of Last Signal",
      short: "TLS",
      jsonPath: "stats.timeOfLastSignal",
      getIt: (stream: Stream) => {
        return stream.stats.timeOfLastSignal;
      }
    },
    {
      name: "Average Monthly Profit Excl",
      short: "AMPx",
      jsonPath: "stats.averageMonthlyProfitExcl",
      getIt: (stream: Stream) => {
        return stream.stats.averageMonthlyProfitExcl.toFixed(2);
      }
    },
    {
      name: "All Time Value Excl",
      short: "ATVx",
      jsonPath: "stats.allTimeValueExcl",
      getIt: (stream: Stream) => {
        return stream.stats.allTimeValueExcl.toFixed(2);
      }
    },
    {
      name: "Price on First Trade",
      short: "PFT",
      jsonPath: "stats.firstPrice",
      getIt: (stream: Stream) => {
        return stream.stats.firstPrice.toFixed(2);
      }
    },
    {
      name: "Buy and Hold Change (first to last trade)",
      short: "BHC",
      jsonPath: "stats.buyAndHoldChange",
      getIt: (stream: Stream) => {
        return stream.stats.buyAndHoldChange.toFixed(2);
      }
    },
    {
      name: "Accumulated Profit",
      short: "AP",
      jsonPath: "stats.accumulatedProfit",
      getIt: (stream: Stream) => {
        return stream.stats.accumulatedProfit.toFixed(2);
      }
    },
    {
      name: "Time of First Signal",
      short: "TFS",
      jsonPath: "stats.timeOfFirstSignal",
      getIt: (stream: Stream) => {
        return stream.stats.timeOfFirstSignal.toFixed(2);
      }
    }
  ];

  constructor(publicApiService: PublicApiService) {
    this.streamsObs = publicApiService.allStreamsObs();
  }

}