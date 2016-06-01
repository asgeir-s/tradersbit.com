import { Stream, StreamsAttribute } from "../../typings/types.d.ts"
import { BitcoinaverageApi } from "../../services/bitcoinaverage-api/bitcoinaverage-api"


export class HomeView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStreams: "<"
    }
    this.controller = HomeViewCtrl
    this.templateUrl = "app/comp-top/home/home.html"
  }
}

class HomeViewCtrl {
  inStreams: Array<Stream>
  activeLastDays: number = 30
  minNumTrades: number = 10
  minNetProfit: number = 10
  streams: Array<Stream>
  btcRate: number

  constructor(private $state: any, private $mdSidenav: any, bitcoinaverageApi: BitcoinaverageApi) {
    "ngInject"
    this.updateFilters()

    bitcoinaverageApi.getPrice().then(
      (btcPrice: number) => {
        this.btcRate = btcPrice
      })
  }

  chnageState(newState: string) {
    this.$state.go(newState)
  }

  toggleRightSidebar(): void {
    this.$mdSidenav("home-right").toggle()
  }

  updateFilters(): void {
    let streams = this.inStreams

    if (this.minNumTrades != null) {
      streams = streams.filter(stream =>
        stream.stats.numberOfClosedTrades >= this.minNumTrades)
    }

    if (this.activeLastDays != null && !isNaN(this.activeLastDays)) {
      const signalsAfter = new Date().getTime() - this.activeLastDays * 86400000
      streams = streams.filter(stream =>
        stream.stats.timeOfLastSignal >= signalsAfter)
    }

    if (this.minNetProfit != null) {
      streams = streams.filter(stream =>
        (stream.stats.allTimeValueIncl - 1) * 100 >= this.minNetProfit)
    }
    this.streams = streams
  }

  allTimeValueIncl(stream) {
    return stream.stats.allTimeValueIncl
  }
}