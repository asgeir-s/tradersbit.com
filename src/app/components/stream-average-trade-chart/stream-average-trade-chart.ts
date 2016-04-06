

import { Stream } from '../../../app/typings/types';

/** @ngInject */
export function tbStreamAverageTradeChart(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/stream-average-trade-chart/stream-average-trade-chart.html',
    bindToController: {
      inStream: '='
    },
    controller: TbStreamAverageTradeChartCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbStreamAverageTradeChartCtrl {
  inStream: Stream;
  avrageTradeBarChartConfig: any;

  /* @ngInject */
  constructor() {
    this.avrageTradeBarChartConfig = {
      options: {
        chart: {
          type: 'bar',
          height: 250
        },
        title: {
          text: 'Average Trades'
        },
        credits: {
          enabled: false
        },
        colors: ['#96D957', '#da5a58', '#f1d537'],
        tooltip: {
          valueSuffix: '%',
          valueDecimals: 2
        },
        exporting: {
          enabled: false
        }
      },
      // the below properties are watched separately for changes.

      // series object (optional) - a list of series using normal Highcharts series options.
      series: [{
        name: 'Average Profitable Trade',
        data: [this.averageWinningTrade(this.inStream)]
      },
        {
          name: 'Average Unprofitable Trade',
          data: [this.averageLoosingTrade(this.inStream)]
        },
        {
          name: 'Average Trade',
          data: [this.averageTrade(this.inStream)]
        }],
      useHighStocks: false
    };

  }

  averageWinningTrade(stream: Stream): number {
    return (stream.stats.accumulatedProfit / stream.stats.numberOfProfitableTrades) * 100;
  }

  averageLoosingTrade(stream: Stream): number {
    return -(stream.stats.accumulatedLoss / stream.stats.numberOfLoosingTrades) * 100;
  }

  averageTrade(stream: Stream): number {
    let allProfit = stream.stats.allTimeValueIncl - 1;
    return (allProfit / stream.stats.numberOfClosedTrades) * 100;
  }

}
