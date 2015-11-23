import { PublicApiService } from '../../services/public-api-service/public-api-service'
import { Stream, StreamsAttribute } from '../../typings/types'

/** @ngInject */
export function tbHome(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/home/home.html',
    controller: tbHomeCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class tbHomeCtrl {
  public streamsObs: any;
  public attributes: StreamsAttribute[] = [
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
      name: "Part Winning Trades",
      short: "PWT",
      jsonPath: "stats.partWinningTrades",
      getIt: (stream: Stream) => {
        return (stream.stats.partWinningTrades * 100).toFixed(2);
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
      name: "Number of Closed Trads",
      short: "NCT",
      jsonPath: "stats.numberOfClosedTrades",
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      }
    }
  ];

  constructor(publicApiService: PublicApiService) {
    this.streamsObs = publicApiService.allStreamsObs();
  }

}