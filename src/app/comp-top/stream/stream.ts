import { BitcoinaverageApi } from '../../services/bitcoinaverage-api/bitcoinaverage-api'
import { Stream, StreamsAttribute, Signal, Trade } from '../../typings/types'
import { StreamAttributes } from '../../util/stream-attributes'

/** @ngInject */
export function tbStream(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/stream/stream.html',
    controller: tbStreamCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inStream: '&',
      inSignals: '&'
    },
  };

}

/** @ngInject */
export class tbStreamCtrl {
  private btcRate: number;
  stream: Stream;
  signals: Array<Signal>;
  inStream: () => Stream;
  inSignals: () => Array<Signal>;
  public trades: Array<Trade> = [];
  public subscriptionPriceBTC: number;
  public infoAttributes: Array<StreamsAttribute> = StreamAttributes.infoAttributes();
  public statsAttributes: Array<StreamsAttribute> = StreamAttributes.statsAttributes();

  
  /* @ngInject */
  constructor($filter: any, $scope: any, private $mdDialog: angular.material.IDialogService, bitcoinaverageApi: BitcoinaverageApi) {
    this.stream = this.inStream();
    this.signals = this.inSignals();

    console.log('inStream: ' + JSON.stringify(this.stream));
    console.log('inSignals: ' + JSON.stringify(this.signals));
    
    this.generateTrades(this.signals);

    bitcoinaverageApi.getPrice().then(
      (btcPrice: number) => {
        this.btcRate = btcPrice;
      });

    // scales the chart width according to the window width (without this; the chart 'sometimes' fail)
    $scope.$watch(() => window.innerWidth,
      (newValue: string, oldValue: string) => {
        this.zoomChart.options.width = window.innerWidth - 65;
      });
  }

  public zoomChart = {
    signals: [],
    type: "AnnotationChart",
    data: {
      "cols": [
        { id: "date", label: "Date", type: "datetime" },
        { id: "value", label: "Stream Value", type: "number" }
      ],
      "rows": []
    },
    options: {
      fill: 23,
      displayExactValues: true,
      displayLegendDots: false,
      legendPosition: "sameRow",
      thickness: 2,
      displayZoomButtons: false,
      'backgroundColor.fill': "#000",
      height: 380,
      width: window.innerWidth - 80
    }
  };
  
  updateSubscriptionPrice() {
    this.subscriptionPriceBTC = this.stream.subscriptionPriceUSD / this.btcRate;
  }

  generateTrades(signals: Array<Signal>) {
    console.log(signals);
    
    var startI = 0;
    var first = signals[startI];
    if (first.signal !== 0) {
      startI = 1;
    }

    for (var i = startI; i < signals.length; i++) {
      if (signals[i].signal === 0) {
        var close: Signal = signals[i];
        if (i + 1 < signals.length) {
          var open: Signal = signals[i + 1];
          var trade: Trade = {
            open: open,
            close: close,
            position: this.getPosition(open.signal)
          };
          this.trades.push(trade);
        }
      }
    }
  }

  getPosition(signalNum: number) {
    if (signalNum === - 1) {
      return "short";
    } else if (signalNum === 1) {
      return "long";
    } else if (signalNum === 0) {
      return "close";
    }
  }

  addSignals(signals: Signal[]) {
    for (var i = signals.length - 1; i > 0; i--) {
      this.zoomChart.signals.push(signals[i]);
      this.zoomChart.data.rows.push({
        c: [
          { v: new Date(signals[i].timestamp) },
          { v: ((signals[i].value) - this.zoomChart.signals[0].value) * 100 }
        ]
      });
    }
  }

  openSubscriptionDialog(ev: any): void {
    console.log("test");

    this.$mdDialog.show({
      controller: "SubscribeController as subscribeCtrl",
      templateUrl: "app/stream/subscribe.tmpl.html",
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      locals: {
        stream: this.stream,
        btcRate: this.btcRate
      }
    });

  }

}