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
            useHighStocks: false
        };

    }
    /**
    $(window).resize(function() {
    height = chart.height
    width = $("#chartRow").width() / 2
    chart.setSize(width, height, doAnimation = true);
});
*/

}
