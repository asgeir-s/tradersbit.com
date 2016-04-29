import { Stream } from "../../../app/typings/types"

export class StreamPiechartTrades implements ng.IComponentOptions {
    bindings: any
    controller: any
    templateUrl: string

    constructor() {
        this.bindings = {
            inStream: "<"
        }
        this.controller = TtreamPiechartTradesCtrl
        this.templateUrl = "app/components/stream-piechart-trades/stream-piechart-trades.html"
    }
}

class TtreamPiechartTradesCtrl {
  inStream: Stream
  tradsPiechartConfig: any

  constructor($timeout: angular.ITimeoutService, highcharts: any) {
    "ngInject"
    this.tradsPiechartConfig = {
      options: {
        chart: {
          type: "pie",
          height: 250
        },
        title: {
          text: "Trades"
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})",
              style: {
                color: (highcharts.theme && highcharts.theme.contrastTextColor) || "black"
              }
            }
          }
        },
        colors: ["#96D957", "#da5a58", "#f1d537"],
        exporting: {
          enabled: false
        }
      },
      // the below properties are watched separately for changes.

      // series object (optional) - a list of series using normal Highcharts series options.
      series: [{
        name: "Brands",
        colorByPoint: true,
        data: [
          {
            name: "Profitable",
            y: this.inStream.stats.numberOfProfitableTrades,
            sliced: true,
            selected: true
          },
          {
            name: "Unprofitable",
            y: this.inStream.stats.numberOfLoosingTrades
          }]
      }],
      useHighStocks: false
    }
  }
}