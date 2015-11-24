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
      inStream: '=',
      inSignals: '='
    },
  };

}

/** @ngInject */
export class tbStreamCtrl {
  
  // input:
  inStream: Stream;
  inSignals: Array<Signal>;

  private btcRate: number;
  trades: Array<Trade>;
  subscriptionPriceBTC: number;
  infoAttributes: Array<StreamsAttribute> = StreamAttributes.infoAttributes();
  statsAttributes: Array<StreamsAttribute> = StreamAttributes.statsAttributes();
  zoomChart = {
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
      width: this.contentWidth() - 65
    }
  };

  
  /* @ngInject */
  constructor($scope: any, private $mdDialog: angular.material.IDialogService, bitcoinaverageApi: BitcoinaverageApi) {
    this.trades = this.signalsToTrades(this.inSignals);
    this.addSignalsToChart(this.inSignals);
    bitcoinaverageApi.getPrice().then(
      (btcPrice: number) => {
        this.btcRate = btcPrice;
        this.subscriptionPriceBTC = this.inStream.subscriptionPriceUSD / this.btcRate;
      });

    // scales the chart width according to the window width (without this; the chart 'sometimes' fail)
    $scope.$watch(() => this.contentWidth(),
      (newValue: number, oldValue: number) => {
        this.zoomChart.options.width = newValue - 65;
      });
  }

  signalsToTrades(signals: Array<Signal>): Array<Trade> {
    console.log(signals);

    let tradesArray = new Array<Trade>();

    let startI = 0;
    let first = signals[startI];
    if (first.signal !== 0) {
      startI = 1;
    }

    for (let i = startI; i < signals.length; i++) {
      if (signals[i].signal === 0) {
        let close: Signal = signals[i];
        if (i + 1 < signals.length) {
          let open: Signal = signals[i + 1];
          let trade: Trade = {
            open: open,
            close: close,
            position: this.positionNumberToString(open.signal)
          };
          tradesArray.push(trade);
        }
      }
    }
    return tradesArray;
  }

  private positionNumberToString(signalNum: number): string {
    if (signalNum === - 1) {
      return "short";
    } else if (signalNum === 1) {
      return "long";
    } else if (signalNum === 0) {
      return "close";
    }
  }

  private addSignalsToChart(signals: Signal[]) {
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

  private contentWidth(): number {
    let rawWidth = window.innerWidth;
    if (rawWidth >= 1055) {
      return rawWidth - 200;
    }
    else {
      return rawWidth - 55;
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
        stream: this.inStream,
        btcRate: this.btcRate
      }
    });

  }

}