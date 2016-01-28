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
      on: false,
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
      on: false,
      good: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
        let secInMonth = 86400000 * 30;
        let AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return false;
        }
        else {
          return AMP > 0;
        }
      },
      bad: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
        let secInMonth = 86400000 * 30;
        let AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return false;
        }
        else {
          return AMP < 0;
        }
      },
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
      name: "Net Profit",
      short: "NP",
      description: "All-time profit for this stream.",
      jsonPath: "stats.allTimeValueIncl",
      on: true,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 < 0;
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 > 0;
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2) + '%';
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100;
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      description: '',
      jsonPath: "",
      on: true,
      good: (stream: Stream) => {
        let PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss;
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return false;
        }
        else {
          return PF > 2;
        }
      },
      getValue: (stream: Stream) => {
        let PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss;
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return 0;
        }
        else {
          return PF;
        }
      },
      getIt: (stream: Stream) => {
        let PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss;
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return '-'
        }
        else {
          return PF.toFixed(2);
        }
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on trades",
      jsonPath: "",
      on: true,
      bad: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let AT = (allProfit / stream.stats.numberOfClosedTrades) * 100;
        if (isNaN(AT)) {
          return false;
        }
        else {
          return AT < 0;
        }
      },
      good: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1;
        let AT = (allProfit / stream.stats.numberOfClosedTrades) * 100;
        if (isNaN(AT)) {
          return false;
        }
        else {
          return AT > 0;
        }
      },
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
    }
  ];

  constructor(private $state: ng.ui.IStateService, private $mdSidenav: angular.material.ISidenavService, private $mdToast: any) {
    this.top5Streams = this.inStreams().sort((stream1: Stream, stream2: Stream) =>
      this.getValue(stream2) - this.getValue(stream1)).slice(0, 5);

    $mdToast.show(
      $mdToast.simple()
        .action('Take a look')
        .textContent('First trading competition has started!')
        .position("top right")
        .hideDelay(4000)
    ).then((response) => {
      if (response === 'ok') {
        this.chnageState('competition');
      }
    });
  }

  getValue(stream: Stream) {
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

  goToApiHelp() {
    this.$state.go('help', { "tab": "api" });
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