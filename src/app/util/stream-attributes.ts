import { Stream, StreamsAttribute} from "../typings/types.d.ts"

export class StreamAttributes {

  private static infoAttribute: Array<StreamsAttribute> = [
    {
      name: "ID",
      jsonPath: "id",
      short: "ID",
      description: "",
      on: false,
      getIt: (stream: Stream) => {
        return stream.id
      },
      getValue: (stream: Stream) => {
        return stream.id
      }
    },
    {
      name: "Name",
      jsonPath: "name",
      short: "Name",
      description: "",
      on: true,
      getIt: (stream: Stream) => {
        return stream.name
      },
      getValue: (stream: Stream) => {
        return stream.name
      }
    },
    {
      name: "Subscription 30 days (USD)",
      short: "SP$",
      description: "",
      jsonPath: "subscriptionPriceUSD",
      on: false,
      getIt: (stream: Stream) => {
        return "$" + stream.subscriptionPriceUSD.toFixed(2)
      },
      getValue: (stream: Stream) => {
        return stream.subscriptionPriceUSD
      }
    },
    {
      name: "Exchange",
      short: "EXC",
      description: "",
      jsonPath: "exchange",
      on: false,
      getIt: (stream: Stream) => {
        return stream.exchange
      },
      getValue: (stream: Stream) => {
        return stream.exchange
      }
    },
    {
      name: "Currency pair",
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
  ]

  private static statsAttribute: Array<StreamsAttribute> = [
    {
      name: "Average monthly profit",
      short: "AMP",
      description: "The average profit per month calculated from first to last signal.",
      jsonPath: "",
      on: false,
      good: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return false
        }
        else {
          return AMP > 0
        }
      },
      bad: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return false
        }
        else {
          return AMP < 0
        }
      },
      getIt: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30

        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return "0%"
        }
        else {
          return AMP.toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueIncl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        const AMP = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(AMP)) {
          return 0
        }
        else {
          return AMP
        }
      }
    },
    {
      name: "Profit factor",
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
    {
      name: "Number of unprofitable trades",
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
    {
      name: "Average profitable trade",
      short: "APT",
      description: "Average profit on trades with profit larger then 0",
      jsonPath: "",
      on: false,
      getIt: (stream: Stream) => {
        const AWT = (stream.stats.accumulatedProfit / stream.stats.numberOfProfitableTrades) * 100
        if (isNaN(AWT)) {
          return "-"
        }
        else {
          return (AWT).toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const AWT = (stream.stats.accumulatedProfit / stream.stats.numberOfProfitableTrades) * 100
        if (isNaN(AWT)) {
          return 0
        }
        else {
          return AWT
        }
      }
    },
    {
      name: "Number of profitable trades",
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
    {
      name: "Average unprofitable trade",
      short: "ALT",
      description: "Average loss on unprofitable trades.",
      jsonPath: "",
      on: false,
      getIt: (stream: Stream) => {
        const ALT = -(stream.stats.accumulatedLoss / stream.stats.numberOfLoosingTrades) * 100
        if (isNaN(ALT)) {
          return "-"
        }
        else {
          return (ALT).toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const ALT = -(stream.stats.accumulatedLoss / stream.stats.numberOfLoosingTrades) * 100
        if (isNaN(ALT)) {
          return 0
        }
        else {
          return ALT
        }
      }
    },
    {
      name: "Part profitable trades",
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
    {
      name: "Part unprofitable trades",
      short: "PLT",
      description: "Percent closed trades with profit smaller or equal to 0",
      jsonPath: "",
      on: false,
      bad: (stream: Stream) => {
        const PLT = (stream.stats.numberOfLoosingTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PLT)) {
          return false
        }
        else {
          return PLT > 50
        }
      },
      good: (stream: Stream) => {
        const PLT = (stream.stats.numberOfLoosingTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PLT)) {
          return false
        }
        else {
          return PLT < 50
        }
      },
      getIt: (stream: Stream) => {
        const PLT = (stream.stats.numberOfLoosingTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PLT)) {
          return "-"
        }
        else {
          return (PLT).toFixed(2) + "%"
        }

      },
      getValue: (stream: Stream) => {
        const PLT = (stream.stats.numberOfLoosingTrades / stream.stats.numberOfClosedTrades) * 100
        if (isNaN(PLT)) {
          return 0
        }
        else {
          return PLT
        }
      }
    },
    {
      name: "Average trade",
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
    },
    {
      name: "Max draw down",
      short: "MDD",
      description: "largest loss before a new high",
      jsonPath: "stats.maxDrawDown",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.maxDrawDown * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return stream.stats.maxDrawDown * 100
      }
    },
    {
      name: "Net profit",
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
    {
      name: "Number of closed trades",
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
    {
      name: "Months of trading",
      short: "MT",
      description: "",
      jsonPath: "",
      on: false,
      getIt: (stream: Stream) => {
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        return (duration / secInMonth).toFixed(2)
      },
      getValue: (stream: Stream) => {
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30
        return duration / secInMonth
      }
    },
    {
      name: "Time of last signal",
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
          return StreamAttributes.formatDate(stream.stats.timeOfLastSignal)
        }
      },
      getValue: (stream: Stream) => {
        return stream.stats.timeOfLastSignal
      }
    },
    {
      name: "Average monthly profit excl",
      short: "AMPx",
      description: "The average profit per month calculated from first to last signal. Excluding trading fees.",
      jsonPath: "",
      on: false,
      bad: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueExcl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30

        const ampX = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(ampX)) {
          return false
        }
        else {
          return ampX < 0
        }
      },
      good: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueExcl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30

        const ampX = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(ampX)) {
          return false
        }
        else {
          return ampX > 0
        }
      },
      getIt: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueExcl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30

        const ampX = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(ampX)) {
          return "-"
        }
        else {
          return (ampX).toFixed(2) + "%"
        }
      },
      getValue: (stream: Stream) => {
        const allProfit = stream.stats.allTimeValueExcl - 1
        const duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal
        const secInMonth = 86400000 * 30

        const ampX = (((allProfit / duration)) * secInMonth) * 100
        if (isNaN(ampX)) {
          return 0
        }
        else {
          return ampX
        }
      }
    },
    {
      name: "Net profit excl",
      short: "NPx",
      description: "All-time profit for this stream. Excluding trading fees.",
      jsonPath: "stats.allTimeValueExcl",
      on: false,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueExcl - 1) * 100 < 0
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueExcl - 1) * 100 > 0
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueExcl - 1) * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueExcl - 1) * 100
      }
    },
    {
      name: "Price on first trade",
      short: "PFT",
      description: "",
      jsonPath: "stats.firstPrice",
      on: false,
      getIt: (stream: Stream) => {
        return "$" + stream.stats.firstPrice.toFixed(2)
      },
      getValue: (stream: Stream) => {
        return stream.stats.firstPrice
      }
    },
    {
      name: "Buy and hold change (first to last trade)",
      short: "BHC",
      description: "Profit if buying on first signal and selling on last signal",
      jsonPath: "stats.buyAndHoldChange",
      on: false,
      getIt: (stream: Stream) => {
        return (stream.stats.buyAndHoldChange * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return stream.stats.buyAndHoldChange * 100
      }
    },
    {
      name: "Time of first signal",
      short: "TFS",
      description: "",
      jsonPath: "stats.timeOfFirstSignal",
      on: false,
      getIt: (stream: Stream) => {
        if (stream.stats.timeOfFirstSignal === 0) {
          return "-"
        }
        else {
          return StreamAttributes.formatDate(stream.stats.timeOfFirstSignal)
        }
      },
      getValue: (stream: Stream) => {
        return stream.stats.timeOfFirstSignal
      }
    }
  ]

  static allAtributes(): Array<StreamsAttribute> {
    return StreamAttributes.infoAttribute.concat(StreamAttributes.statsAttribute)
  }

  static infoAttributes(): Array<StreamsAttribute> {
    return StreamAttributes.infoAttribute
  }

  static statsAttributes(): Array<StreamsAttribute> {
    return StreamAttributes.statsAttribute
  }

  static formatDate(inn: number, hideTime?: boolean): string {
    const d = new Date(inn)
    const year = d.getFullYear()
    let hours: any = d.getHours()

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Des"
    ]

    if (hours < 10) {
      hours = "0" + hours
    }
    let minutes: any = d.getMinutes()
    if (minutes < 10) {
      minutes = "0" + minutes
    }
    let date: any = d.getDate()
    if (date < 10) {
      date = "0" + date
    }

    if (hideTime) {
      return date + " " + monthNames[d.getMonth()] + " " + year

    }
    else {
      return date + " " + monthNames[d.getMonth()] + " " + year + ", " + hours + ":" + minutes

    }

  }

}

