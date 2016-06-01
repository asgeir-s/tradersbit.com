import { BitcoinaverageApi } from "../../services/bitcoinaverage-api/bitcoinaverage-api"
import { Stream, StreamsAttribute, Signal, Trade } from "../../typings/types.d.ts"
import { StreamAttributes } from "../../util/stream-attributes"
import { TbFront } from "../../services/tb-front/tb-front"

export class StreamView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<",
      inSignals: "<"
    }
    this.controller = StreamViewCtrl
    this.templateUrl = "app/comp-top/stream/stream.html"
  }
}

class StreamViewCtrl {

  // input:
  inStream: Stream
  inSignals: Array<Signal>

  btcRate: number
  trades: Array<Trade>
  infoAttributes: Array<StreamsAttribute> = StreamAttributes.infoAttributes()
  statsAttributes: Array<StreamsAttribute> = StreamAttributes.statsAttributes()
  allAttributes: Array<StreamsAttribute> = StreamAttributes.allAtributes()

  empety: boolean = true
  amOwner: boolean = false

  showAllStats: boolean = false

  constructor(
    private $timeout: ng.ITimeoutService,
    private $mdDialog: any,
    highchartsNG: any, bitcoinaverageApi: BitcoinaverageApi,
    private tbFront: TbFront,
    private $mdMedia: ng.material.IMedia,
    private $mdSidenav: ng.material.ISidenavService) {
    "ngInject"
    this.empety = this.inSignals.length <= 1
    if (tbFront.myStreamIds != null) {
      this.amOwner = tbFront.myStreamIds.indexOf(this.inStream.id) >= 0
    }

    if (!this.empety) {
      // highcharts.setOptions(HighChartThemes.darkTheme)        
      this.trades = this.signalsToTrades(this.inSignals)

      bitcoinaverageApi.getPrice().then(
        (btcPrice: number) => {
          this.btcRate = btcPrice
        })
    }
  }

  signalsToTrades(signals: Array<Signal>): Array<Trade> {
    const tradesArray = new Array<Trade>()

    let startI = 0
    const first = signals[startI]
    if (first.signal !== 0) {
      startI = 1
    }

    for (let i = startI; i < signals.length; i++) {
      if (signals[i].signal === 0) {
        const close: Signal = signals[i]
        if (i + 1 < signals.length) {
          const open: Signal = signals[i + 1]
          const trade: Trade = {
            open: open,
            close: close,
            position: this.positionNumberToString(open.signal)
          }
          tradesArray.push(trade)
        }
      }
    }
    return tradesArray
  }

  openSubscriptionDialog(ev: any): void {

    this.$mdDialog.show({
      template: `
                <md-dialog aria-label="Subscribe">
                    <tb-subscription-dialog in-stream="ctrl.stream" in-btc-rate="ctrl.btcRate">
                </tb-subscription-dialog></md-dialog>`,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia("xs"),
      locals: {
        stream: this.inStream,
        btcRate: this.btcRate
      },
      controller:
      /** @ngInject */
      class DialogCtrl {
        constructor(public stream: Stream, public btcRate: number) {
        }
      },
      controllerAs: "ctrl"
    })

  }

  toggleMenu() {
    return this.$mdSidenav("leftBig").open()
  }

  togleAllInfo() {
    this.showAllStats = !this.showAllStats
  }

  private positionNumberToString(signalNum: number): string {
    if (signalNum === - 1) {
      return "SHORT"
    } else if (signalNum === 1) {
      return "LONG"
    } else if (signalNum === 0) {
      return "CLOSE"
    }
  }

}