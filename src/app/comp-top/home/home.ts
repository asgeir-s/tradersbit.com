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
      },
      getValue: (stream: Stream) => {
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
      },
      getValue: (stream: Stream) => {
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
      },
      getValue: (stream: Stream) => {
        return stream.currencyPair;
      }
    },
    {
      name: "Average Monthly Profit",
      short: "AMP",
      description: "The average profit per month calculated from first to last signal.",
      jsonPath: "",
      on: true,
      getIt: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
        let secInMonth = 86400000 * 30;

        let AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return '0%';
        }
        else {
          return AMP.toFixed(2) + '%';
        }
      },
      getValue: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
        let secInMonth = 86400000 * 30;
        let AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return 0;
        }
        else {
          return AMP;
        }
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      description: '',
      jsonPath: "",
      on: true,
      getValue: (stream: Stream) => {
        let PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss;
        if (isNaN(PF)) {
          return 0;
        }
        else {
          return PF;
        }
      },
      getIt: (stream: Stream) => {
        let PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss;
        if (isNaN(PF)) {
          return '-'
        }
        else {
          return PF.toFixed(2);
        }
      }
    },
    {
      name: "Part Profitable Trades",
      short: "PPT",
      description: "Percent closed trades with profit larger then 0",
      jsonPath: "",
      on: true,
      getIt: (stream: Stream) => {
        let PWT = (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100;
        if (isNaN(PWT)) {
          return '-';
        }
        else {
          return (PWT).toFixed(2) + '%';
        }
      },
      getValue: (stream: Stream) => {
        let PWT = (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100;
        if (isNaN(PWT)) {
          return 0;
        }
        else {
          return PWT;
        }
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on trades",
      jsonPath: "",
      on: true,
      getIt: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let AT = (allProfit / stream.stats.numberOfClosedTrades) * 100;
        if (isNaN(AT)) {
          return '-';
        }
        else {
          return (AT).toFixed(2) + '%';
        }
      },
      getValue: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let AT = (allProfit / stream.stats.numberOfClosedTrades) * 100;
        if (isNaN(AT)) {
          return 0;
        }
        else {
          return AT;
        }
      }
    },
    {
      name: "Number of Closed Trades",
      short: "NCT",
      description: '',
      jsonPath: "stats.numberOfClosedTrades",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      }
    }
  ];

  constructor(private $state: ng.ui.IStateService, private $mdSidenav: angular.material.ISidenavService) {
    this.top5Streams = this.inStreams().sort((stream1: Stream, stream2: Stream) =>
    this.averageMonthlyProfitIncl(stream1) - this.averageMonthlyProfitIncl(stream2)).slice(0, 5);
  }
  
  goToApiHelp() {
    this.$state.go('help', {"tab": "api"});
  }
  
  goToRelesePlan() {
    this.$state.go('about', { "tab": "relese" });
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