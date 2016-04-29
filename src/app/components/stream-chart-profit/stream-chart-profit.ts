import { Signal } from "../../../app/typings/types"

export class StreamChartProfit implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inSignals: "<"
    }
    this.controller = StreamChartProfitCtrl
    this.templateUrl = "app/components/stream-chart-profit/stream-chart-profit.html"
  }
}

class StreamChartProfitCtrl {
  inSignals: Array<Signal>
  profitChartConfig: any

  constructor(highcharts: any) {
    "ngInject"

    this.profitChartConfig = {
      options: {
        // this is the Main Highcharts chart config. Any Highchart options are valid here.
        // will be overriden by values specified below.
        chart: {
          zoomType: "x"
        },
        rangeSelector: {
          enabled: true
        },
        scrollbar: {
          enabled: false
        },
        navigator: {
          enabled: true
        },
        tooltip: {
          valueDecimals: 2
        },
        yAxis: {
          type: "linear"
        },
        xAxis: {
          type: "datetime",
          ordinal: false
        },
        exporting: {
          enabled: false
        }
      },
      // the below properties are watched separately for changes.

      // series object (optional) - a list of series using normal Highcharts series options.
      series: [{
        type: "area",
        name: "Change in value",
        data: this.createChartSerie(this.inSignals),
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, highcharts.getOptions().colors[0]],
            [1, highcharts.Color(highcharts.getOptions().colors[0]).setOpacity(0).get("rgba")]
          ]
        }
      }],
      useHighStocks: true
    }

  }

  private createChartSerie(signals: Signal[]): any {
    if (signals.length === 0 || signals == null) {
      return []
    }
    let series = new Array<Array<number>>()
    if (signals[signals.length - 1].signal !== 0) {
      series.push(Array(signals[signals.length - 1].timestamp,
        0))
    }
    for (let i = signals.length - 1; i > 0; i--) {
      if (signals[i].signal === 0) {
        series.push(Array(signals[i].timestamp,
          (signals[i].valueInclFee - signals[signals.length - 1].value) * 100))
      }
    }
    return series
  }
}