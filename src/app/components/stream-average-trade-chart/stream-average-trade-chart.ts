import { Stream } from "../../../app/typings/types.d.ts"

export class StreamAverageTradeChart implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<"
    }
    this.controller = StreamAverageTradeChartCtrl
    this.templateUrl = "app/components/stream-average-trade-chart/stream-average-trade-chart.html"
  }
}

class StreamAverageTradeChartCtrl {
  inStream: Stream
  avrageTradeBarChartConfig: any

  constructor() {
    "ngInject"
    this.avrageTradeBarChartConfig = {
      options: {
        chart: {
          type: "bar",
          height: 250
        },
        title: {
          text: "Average trades"
        },
        credits: {
          enabled: false
        },
        colors: ["#81C784", "#E57373", "#FFD54F"],
        tooltip: {
          valueSuffix: "%",
          valueDecimals: 2
        },
        exporting: {
          enabled: false
        }
      },
      // the below properties are watched separately for changes.

      // series object (optional) - a list of series using normal Highcharts series options.
      series: [{
        name: "Average profitable trade",
        data: [this.averageWinningTrade(this.inStream)]
      },
        {
          name: "Average unprofitable trade",
          data: [this.averageLoosingTrade(this.inStream)]
        },
        {
          name: "Average trade",
          data: [this.averageTrade(this.inStream)]
        }],
      useHighStocks: false
    }

  }

  averageWinningTrade(stream: Stream): number {
    return (stream.stats.accumulatedProfit / stream.stats.numberOfProfitableTrades) * 100
  }

  averageLoosingTrade(stream: Stream): number {
    return -(stream.stats.accumulatedLoss / stream.stats.numberOfLoosingTrades) * 100
  }

  averageTrade(stream: Stream): number {
    let allProfit = stream.stats.allTimeValueIncl - 1
    return (allProfit / stream.stats.numberOfClosedTrades) * 100
  }
}