import { Stream, StreamsAttribute } from "../../typings/types"
import { BitfinexSocket } from "../../services/bitfinex-socket/bitfinex-socket"
import { TbFront } from "../../services/tb-front/tb-front"

export class PublishDashView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      myStreams: "<"
    }
    this.controller = PublishDashViewCtrl
    this.templateUrl = "app/comp-top/publish-dash/publish-dash.html"
  }
}

class PublishDashViewCtrl {
  btcRate: number
  up: boolean = false
  down: boolean = false
  myStreams: Array<Stream>
  noStreams = true
  attributes: Array<StreamsAttribute> = [
    {
      name: "Exchange",
      short: "EXC",
      description: "",
      jsonPath: "exchange",
      on: true,
      getIt: (stream: Stream) => {
        return stream.exchange
      },
      getValue: (stream: Stream) => {
        return stream.exchange
      }
    },
    {
      name: "Currency Pair",
      jsonPath: "currencyPair",
      short: "CP",
      description: "",
      on: false,
      getIt: (stream: Stream) => {
        return stream.currencyPair
      },
      getValue: (stream: Stream) => {
        return stream.currencyPair
      }
    },
    {
      name: "Average Monthly Profit",
      short: "AMP",
      description: "The average profit per month calculated from first to last signal.",
      jsonPath: "",
      on: true,
      getIt: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1
        let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        let secInMonth = 86400000 * 30

        let AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return "0%"
        }
        else {
          return AMP.toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1
        let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        let secInMonth = 86400000 * 30
        return (((allProfit / duration)) * secInMonth) * 100
      }
    },
    {
      name: "Profit Factor",
      short: "PF",
      description: "",
      jsonPath: "",
      on: false,
      getValue: (stream: Stream) => {
        return (stream.stats.accumulatedProfit / stream.stats.accumulatedLoss)
      },
      getIt: (stream: Stream) => {
        let PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss
        if (isNaN(PF)) {
          return "-"
        }
        else {
          return PF.toFixed(2)
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
        let PWT = (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PWT)) {
          return "-"
        }
        else {
          return (PWT).toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades * 100
      }
    },
    {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on a trade",
      jsonPath: "",
      on: false,
      getIt: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1
        let AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return "-"
        }
        else {
          return (AT).toFixed(2) + "%"
        }

      },
      getValue: (stream: Stream) => {
        let allProfit = stream.stats.allTimeValueIncl - 1
        return allProfit / stream.stats.numberOfClosedTrades * 100
      }
    },
    {
      name: "Number of Closed Trads",
      short: "NCT",
      description: "",
      jsonPath: "stats.numberOfClosedTrades",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades
      }
    }
  ]

  constructor(
    private tbFront: TbFront,
    private $mdDialog: any,
    private $mdMedia: angular.material.IMedia,
    private $mdSidenav: angular.material.ISidenavService,
    bitfinexSocket: BitfinexSocket) {
    "ngInject"
    console.log("my streams: " + JSON.stringify(this.myStreams))
    this.noStreams = this.myStreams.length === 0
    this.btcRate = bitfinexSocket.lastRate

    bitfinexSocket.dataStream.onMessage((message: any) => {
      let tick: Array<number> = JSON.parse(message.data)
      if (tick.length > 8) {
        this.down = false
        this.up = false
        if (tick[7] < this.btcRate) {
          this.down = true
        }
        else if (tick[7] > this.btcRate) {
          this.up = true
        }
        this.btcRate = tick[7]
      }
    })
  }

  signOut() {
    this.tbFront.signOut("")
  }

  openNewStreamDialog(ev: any) {
    this.$mdDialog.show({
      template: "<md-dialog><tb-stream-new-dialog></tb-stream-new-dialog></md-dialog>",
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia("xs")
    })
  }

  toggleMenu() {
    return this.$mdSidenav("leftBig").open()
  }

}