import { StreamsAttribute, Stream, Signal } from '../../../app/typings/types';

/** @ngInject */
export function tbStreamPiechartTrades(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/stream-piechart-trades/stream-piechart-trades.html',
        bindToController: {
            inStream: '='
        },
        controller: tbStreamPiechartTradesCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class tbStreamPiechartTradesCtrl {
    inStream: Stream;
    tradsPiechartConfig: any;

    /* @ngInject */
    constructor($timeout) {
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
                                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                            }
                        }
                    }
                },
                colors: ['#96D957', '#da5a58', '#f1d537'],
                exporting: {
                    enabled: false
                }

            },
            //The below properties are watched separately for changes.

            //Series object (optional) - a list of series using normal Highcharts series options.
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
                        name: "Loosing",
                        y: this.inStream.stats.numberOfLoosingTrades
                    },
                    {
                        name: "Unchanged value",
                        y: (this.inStream.stats.numberOfClosedTrades - (this.inStream.stats.numberOfProfitableTrades + this.inStream.stats.numberOfLoosingTrades))
                    }]
            }],
            useHighStocks: false
        };

    }

}
