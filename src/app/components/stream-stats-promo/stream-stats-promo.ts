import { Stream, StreamsAttribute } from "../../typings/types.d.ts"
import { StreamAttributes } from "../../util/stream-attributes"

export class StreamStatsPromo implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<"
    }
    this.controller = StreamStatsPromeCtrl
    this.templateUrl = "app/components/stream-stats-promo/stream-stats-promo.html"
  }
}

class StreamStatsPromeCtrl {
  inStream: Stream

  statsAtributes = {
     "partProfitableTrades": {
      name: "Part Profitable Trades",
      short: "PPT",
      description: "Percent closed trades with profit larger then 0",
      jsonPath: "",
      on: true,
      bad: (stream: Stream) => {
        const PWT = (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PWT)) {
          return false
        }
        else {
          return PWT < 50
        }
      },
      good: (stream: Stream) => {
        const PWT = (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PWT)) {
          return false
        }
        else {
          return PWT > 50
        }
      },
      getIt: (stream: Stream) => {
        const PWT = (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PWT)) {
          return "-"
        }
        else {
          return (PWT).toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const PWT = (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PWT)) {
          return 0
        }
        else {
          return PWT
        }
      }
    },
    "netProfit": {
      name: "Net Profit",
      short: "NP",
      description: "All-time profit for this stream.",
      jsonPath: "stats.allTimeValueIncl",
      on: true,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 < 0
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 > 0
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100
      }
    },

    "numberOfTRades": {
      name: "Number of Closed Trades",
      short: "NCT",
      description: "",
      jsonPath: "stats.numberOfClosedTrades",
      on: true,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfClosedTrades
      }
    },

    "timeOfFirstSignal": {
      name: "Time of First Signal",
      short: "TFS",
      description: "",
      jsonPath: "stats.timeOfFirstSignal",
      on: false,
      getIt: (stream: Stream) => {
        if (stream.stats.timeOfFirstSignal === 0) {
          return "-"
        }
        else {
          return StreamAttributes.formatDate(stream.stats.timeOfFirstSignal, true)
        }
      },
      getValue: (stream: Stream) => {
        return stream.stats.timeOfFirstSignal
      }
    },

    "timeOfLastSignal": {
      name: "Time of Last Signal",
      short: "TLS",
      description: "",
      jsonPath: "timeOfLastSignal",
      on: true,
      bad: (stream: Stream) => {
        const secInMonth = 86400000 * 30
        return stream.stats.timeOfLastSignal < Date.now() - secInMonth
      },
      getIt: (stream: Stream) => {
        if (stream.stats.timeOfLastSignal === 0) {
          return "-"
        }
        else {
          return StreamAttributes.formatDate(stream.stats.timeOfLastSignal, true)
        }
      },
      getValue: (stream: Stream) => {
        return stream.stats.timeOfLastSignal
      }
    },

    "numberOfProfitableTrades": {
      name: "Number of Profitable Trades",
      short: "NPT",
      description: "Number of closed trades with profit larger then 0",
      jsonPath: "stats.numberOfProfitableTrades",
      on: false,
      getIt: (stream: Stream) => {
        return stream.stats.numberOfProfitableTrades
      },
      getValue: (stream: Stream) => {
        return stream.stats.numberOfProfitableTrades
      }
    },

    "numberOfUnprofitaleTrades": {
      name: "Number of Unprofitable Trades",
      short: "NUT",
      description: "Number of trads with profit equal or smaller then 0",
      jsonPath: "stats.numberOfLoosingTrades",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.numberOfLoosingTrades)
      },
      getValue: (stream: Stream) => {
        return (stream.stats.numberOfLoosingTrades)
      }
    },

    "profitFactor": {
      name: "Profit Factor",
      short: "PF",
      description: "",
      jsonPath: "",
      on: true,
      good: (stream: Stream) => {
        const PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return false
        }
        else {
          return PF > 2
        }
      },
      getValue: (stream: Stream) => {
        const PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return 0
        }
        else {
          return PF
        }
      },
      getIt: (stream: Stream) => {
        const PF = stream.stats.accumulatedProfit / stream.stats.accumulatedLoss
        if (isNaN(PF) || PF === Number.POSITIVE_INFINITY) {
          return "-"
        }
        else {
          return PF.toFixed(2)
        }
      }
    },

    "avarageTrade": {
      name: "Average Trade",
      short: "AT",
      description: "Average profit on trades",
      jsonPath: "",
      on: true,
      bad: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return false
        }
        else {
          return AT < 0
        }
      },
      good: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return false
        }
        else {
          return AT > 0
        }
      },
      getIt: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return "-"
        }
        else {
          return (AT).toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const AT = (allProfit / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(AT)) {
          return 0
        }
        else {
          return AT
        }
      }
    }
  }

  constructor() {
    "ngInject"
  }

}
