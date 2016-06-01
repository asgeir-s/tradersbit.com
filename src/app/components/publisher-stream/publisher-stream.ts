import { PublishNewStream, Stream } from "../../../app/typings/types.d.ts"
import { Signal } from "../../typings/types.d.ts"
import { TbFront } from "../../services/tb-front/tb-front"
import { BitfinexSocket } from "../../services/bitfinex-socket/bitfinex-socket"

export class PublisherStream implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<"
    }
    this.controller = PublisherStreamCtrl
    this.templateUrl = "app/components/publisher-stream/publisher-stream.html"
  }
}

class PublisherStreamCtrl {
  BITFINEX_FEE: number = 0.2
  inStream: PublishNewStream
  unrealizedPL: number
  waitingForSignalBack = false
  btcRate: number
  partOfTradesConfig: any

  constructor(
    public $location: any,
    private $mdMedia: ng.material.IMedia,
    private $mdDialog: any,
    private $q: ng.IQService,
    private $http: ng.IHttpService,
    private $state: ng.ui.IStateService,
    private tbFront: TbFront,
    private _: _.LoDashStatic,
    private $mdToast: any,
    bitfinexSocket: BitfinexSocket,
    highcharts: any) {
    "ngInject"

    this.partOfTradesConfig = {
      "options": {
        "colors": ["#E57373", "#81C784", "#DDDF00"],

        "chart": {
          "type": "pie"
        },
        "plotOptions": {
          "series": {
            "stacking": ""
          },
          "pie": {
            "allowPointSelect": true,
            "cursor": "pointer",
            "dataLabels": {
              "enabled": false
            }
          }
        }
      },
      "series": [
        {
          "name": "Trades",
          "data": [
            {
              "name": "Loosing",
              "y": this.inStream.stats.numberOfLoosingTrades
            },
            {
              "name": "Winning",
              "y": this.inStream.stats.numberOfProfitableTrades,
              "sliced": true,
              "selected": true
            }

          ],
          "id": "winning-loosing-trades"
        }
      ],
      "title": {
        "text": "Trades",
        "margin": 0,
        "style": {
          "color": "rgba(0,0,0,0.87)",
          "fontSize": "12px",
          "letter-spacing": "0.01em"
        }
      },
      "credits": {
        "enabled": false
      },
      "loading": false,
      "size": {}
    }

    if (this.inStream.exchange === "bitfinex") {
      this.computeUnrealizedPL(this.inStream.lastSignal, bitfinexSocket.lastRate)
      this.btcRate = bitfinexSocket.lastRate

      bitfinexSocket.dataStream.onMessage((message: any) => {
        let tick: Array<number> = JSON.parse(message.data)
        if (tick.length > 8) {
          this.computeUnrealizedPL(this.inStream.lastSignal, tick[7])
          this.btcRate = tick[7]
        }
      })
    }
    else {
      console.log("WARNING: dont have access to price data for " + this.inStream.exchange)
    }

  }

  openApiKeyDialog(ev: any) {
    this.$mdDialog.show({
      template:
      '<md-dialog><tb-publisher-apikey-dialog in-stream-id="{{ctrl.stream.id}}">' +
      "</tb-publisher-apikey-dialog></md-dialog>",
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia("xs"),
      locals: {
        stream: this.inStream
      },
      controller:
      /** @ngInject */
      class DialogCtrl2 {
        constructor(public stream: Stream) {
        }
      },
      controllerAs: "ctrl"
    })
  }

  openMirrorDialog(ev: any) {
    this.$mdDialog.show({
      template:
      '<md-dialog><tb-publisher-mirror-dialog in-stream-id="{{ctrl.stream.id}}">' +
      "</tb-publisher-mirror-dialog></md-dialog>",
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia("xs"),
      locals: {
        stream: this.inStream
      },
      controller:
      /** @ngInject */
      class DialogCtrl2 {
        constructor(public stream: Stream) {
        }
      },
      controllerAs: "ctrl"
    })
  }

  openSubscriptionPriceDialog(ev: any) {
    this.$mdDialog.show({
      template:
      '<md-dialog><tb-subscription-price-dialog in-stream="ctrl.stream" ></tb-subscription-price-dialog></md-dialog>',
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia("xs"),
      locals: {
        stream: this.inStream
      },
      controller:
      /** @ngInject */
      class DialogCtrl2 {
        constructor(public stream: Stream) {
        }
      },
      controllerAs: "ctrl"
    })
  }

  positionString(): string {
    if (this.inStream.status === -1) {
      return "SHORT"
    }
    else if (this.inStream.status === 0) {
      return "CLOSE"
    }
    else if (this.inStream.status === 1) {
      return "LONG"
    }
  }

  computeUnrealizedPL(lastSignal: Signal, rate: number) {
    if (lastSignal.signal === 0) {
      this.unrealizedPL = 0
    }
    else if (lastSignal.signal === 1) {
      this.unrealizedPL = ((100 / lastSignal.price) * (rate - lastSignal.price)) - (this.BITFINEX_FEE * 2)
    }
    else if (lastSignal.signal === -1) {
      this.unrealizedPL = ((100 / lastSignal.price) * (lastSignal.price - rate)) - (this.BITFINEX_FEE * 2)
    }
  }

  goToStream(streamID: string) {
    this.$state.go("stream", { "streamId": streamID })
  }

  postSignal(streamId: string, signal: number) {
    this.waitingForSignalBack = true
    this.tbFront.postSignal(streamId, signal)
      .then((signals: Array<Signal>) => {
        this.inStream.lastSignal = _.max(signals, "id")
        this.inStream.status = this.inStream.lastSignal.signal
        this.computeUnrealizedPL(this.inStream.lastSignal, this.btcRate)
        this.waitingForSignalBack = false
        let text: string
        if (signals.length === 1) {
          if (signals[0].signal === 0) {
            text = "New " + this.positionString() + " signal @ " + signals[0].price + "$. P/L: " +
              ((signals[0].changeInclFee * 100) - this.BITFINEX_FEE).toFixed(2) + "%."
          }
          else {
            text = "New " + this.positionString() + " signal @ " + signals[0].price + "$"
          }
        }
        else {
          text = "Position closed @ " + signals[0].price + "$. P/L: " +
            ((signals[0].changeInclFee * 100) - this.BITFINEX_FEE).toFixed(2) + "%.\n New " +
            this.positionString() + " position opened."
        }

        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent(text)
            .position("bottom right")
            .hideDelay(10000)
        )

      })
  }
}
