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
                data: [this.inStream.stats.averageWinningTrade * 100]
            },
                {
                    name: 'Average Loosing Trade',
                    data: [-this.inStream.stats.averageLoosingTrade * 100]
                },
                {
                    name: 'Average Trade',
                    data: [this.inStream.stats.averageTrade * 100]
                }],
            useHighStocks: false
        };

    }

}
