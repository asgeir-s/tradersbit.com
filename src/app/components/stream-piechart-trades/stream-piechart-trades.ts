import { Stream } from '../../../app/typings/types';

/** @ngInject */
export function tbStreamPiechartTrades(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/stream-piechart-trades/stream-piechart-trades.html',
    bindToController: {
      inStream: '='
    },
    controller: TbStreamPiechartTradesCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbStreamPiechartTradesCtrl {
  inStream: Stream;
  tradsPiechartConfig: any;

  /* @ngInject */
  constructor($timeout: angular.ITimeoutService, highcharts: any) {
    this.tradsPiechartConfig = {
      options: {
        chart: {
          type: 'pie',
          height: 250
        },
        title: {
          text: 'Trades'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} % ({point.y})',
              style: {
                color: (highcharts.theme && highcharts.theme.contrastTextColor) || 'black'
              }
            }
          }
        },
        colors: ['#96D957', '#da5a58', '#f1d537'],
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
    };

  }

}
