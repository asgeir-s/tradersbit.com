import { Stream, StreamsAttribute } from '../../typings/types'
import { AuthApi } from '../../services/auth-api/auth-api'

/** @ngInject */
export function tbPublishDash(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/publish-dash/publish-dash.html',
    controller: TbPublishDashCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      myStreams: '&'
    }
  };

}

/** @ngInject */
export class TbPublishDashCtrl {
  myStreams: () => Array<Stream>;
  noStreams = true;
  attributes: Array<StreamsAttribute> = [
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
        return (((allProfit / duration)) * secInMonth) * 100
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      description: '',
      jsonPath: "",
      on: false,
      getValue: (stream: Stream) => {
        return (stream.stats.accumulatedProfit / stream.stats.accumulatedLoss);
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
      name: "Part Winning Trades",
      short: "PWT",
      description: "Percent closed trades with profit larger then 0",
      jsonPath: "",
      on: false,
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
        return stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades * 100;
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on a trade",
      jsonPath: "",
      on: false,
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
        return allProfit / stream.stats.numberOfClosedTrades * 100;
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
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades;
      }
    }
  ];

  constructor(private authApi: AuthApi, private $mdDialog: any,
    private $mdMedia: angular.material.IMedia, private $mdSidenav: angular.material.ISidenavService) {
    console.log('my streams: ' + JSON.stringify(this.myStreams()));
    this.noStreams = this.myStreams().length === 0;
  }

  signOut() {
    this.authApi.signOut()
  }

  openNewStreamDialog(ev: any) {
    this.$mdDialog.show({
      template: '<md-dialog><tb-stream-new-dialog></tb-stream-new-dialog></md-dialog>',
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('xs')
    })
  };

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

}