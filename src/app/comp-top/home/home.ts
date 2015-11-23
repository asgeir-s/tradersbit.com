import { PublicApiService } from '../../services/public-api-service/public-api-service'
import { Stream, StreamsAttribute } from '../../typings/types'

/** @ngInject */
export function tbHome(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/home/home.html',
    controller: tbHomeCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inStreams: '&'
    },
  };

}

/** @ngInject */
export class tbHomeCtrl {
  inStreams: () => Array<Stream>;
  attributes: StreamsAttribute[] = [
    {
      name: "Exchange",
      short: "EXC",
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
      on: true,
      getIt: (stream: Stream) => {
        return stream.currencyPair;
      }
    },
    {
      name: "Average Monthly Profit (incl. fees)",
      short: "AMPi",
      jsonPath: "stats.averageMonthlyProfitIncl",
      on: true,
      getIt: (stream: Stream) => {
        return (stream.stats.averageMonthlyProfitIncl * 100).toFixed(2);
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      jsonPath: "stats.profitFactor",
      on: true,
      getIt: (stream: Stream) => {
        return (stream.stats.profitFactor * 100).toFixed(2);
      }
    },
    {
      name: "Part Winning Trades",
      short: "PWT",
      jsonPath: "stats.partWinningTrades",
      on: true,
      getIt: (stream: Stream) => {
        return (stream.stats.partWinningTrades * 100).toFixed(2);
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      jsonPath: "stats.averageTrade",
      on: true,
      getIt: (stream: Stream) => {
        return (stream.stats.averageTrade * 100).toFixed(2);
      }
    },
    {
      name: "Number of Closed Trads",
      short: "NCT",
      jsonPath: "stats.numberOfClosedTrades",
      on: true,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      }
    }
  ];

  /* @ngInject */
  constructor() {
  }

}