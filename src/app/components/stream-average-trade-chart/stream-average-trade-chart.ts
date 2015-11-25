import { StreamsAttribute, Stream, Signal } from '../../../app/typings/types';

/** @ngInject */
export function tbStreamAverageTradeChart(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/stream-average-trade-chart/stream-average-trade-chart.html',
        bindToController: {
            inStream: '='
        },
        controller: tbStreamAverageTradeChartCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class tbStreamAverageTradeChartCtrl {
    inStream: Stream;
    avrageTradeBarChartConfig: any;

    /* @ngInject */
    constructor($timeout) {
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
                }
            },
            //The below properties are watched separately for changes.

            //Series object (optional) - a list of series using normal Highcharts series options.
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
            useHighStocks: false,
            // function to trigger reflow in bootstrap containers
            // see: http://jsfiddle.net/pgbc988d/ and https://github.com/pablojim/highcharts-ng/issues/211
            func: function(chart) {
                $timeout(function() {
                    chart.reflow();
                    //The below is an event that will trigger all instances of charts to reflow
                    //$scope.$broadcast('highchartsng.reflow');
                }, 0)
            }
        };
        

    }

}
