import { Stream, StreamsAttribute } from '../../typings/types'

/** @ngInject */
export function tbHome(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/home/home.html',
    controller: TbHomeCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inStreams: '&'
    }
  };

}

/** @ngInject */
export class TbHomeCtrl {
  inStreams: () => Array<Stream>;
  top5Streams: Array<Stream>;
  attributes: Array<StreamsAttribute> = [
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
      on: true,
      getIt: (stream: Stream) => {
        return stream.currencyPair;
      }
    },
    {
      name: "Average Monthly Profit",
      short: "AMP",
      description: "The average profit per month calculated from first to last signal.",
      jsonPath: "stats.averageMonthlyProfitIncl",
      on: true,
      getIt: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
        let secInMonth = 86400000 * 30;
        return ((((allProfit / duration)) * secInMonth) * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      description: '',
      jsonPath: "stats.profitFactor",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.accumulatedProfit / stream.stats.accumulatedLoss).toFixed(2);
      }
    },
    {
      name: "Part Winning Trades",
      short: "PWT",
      description: "Percent closed trades with profit larger then 0",
      jsonPath: "stats.partWinningTrades",
      on: false,
      getIt: (stream: Stream) => {
        return ((stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on a trade",
      jsonPath: "stats.averageTrade",
      on: false,
      getIt: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        return ((allProfit / stream.stats.numberOfClosedTrades) * 100).toFixed(2) + '%';
      }
    },
    {
      name: "Number of Closed Trads",
      short: "NCT",
      description: '',
      jsonPath: "stats.numberOfClosedTrades",
      on: true,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      }
    }
  ];

  constructor(private $state: ng.ui.IStateService, private $mdSidenav: angular.material.ISidenavService) {
    this.top5Streams = this.inStreams().sort((stream1: Stream, stream2: Stream) =>
      this.averageMonthlyProfitIncl(stream1) - this.averageMonthlyProfitIncl(stream2)).slice(0, 5);
  }

  chnageState(newState: string) {
    this.$state.go(newState);
  }

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

  averageMonthlyProfitIncl(stream: Stream): number {
    let allProfit = stream.stats.allTimeValueIncl - 1;
    let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
    let secInMonth = 86400000 * 30;
    return ((((allProfit / duration)) * secInMonth) * 100);
  }

}