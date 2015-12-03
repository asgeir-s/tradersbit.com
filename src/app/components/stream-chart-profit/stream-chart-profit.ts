import { Signal } from '../../../app/typings/types';

/** @ngInject */
export function tbStreamChartProfit(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/stream-chart-profit/stream-chart-profit.html',
        bindToController: {
            inSignals: '='
        },
        controller: TbStreamChartProfitCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbStreamChartProfitCtrl {
    inSignals: Array<Signal>;
    profitChartConfig: any;

    /* @ngInject */
    constructor(highcharts: any) {

        this.profitChartConfig = {
            options: {
                // this is the Main Highcharts chart config. Any Highchart options are valid here.
                // will be overriden by values specified below.
                chart: {
                    zoomType: 'x'
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
                    type: 'linear'
                },
                xAxis: {
                    type: 'datetime',
                    ordinal: false
                },
                exporting: { 
                    enabled: false 
                }
            },
            // the below properties are watched separately for changes.

            // series object (optional) - a list of series using normal Highcharts series options.
            series: [{
                type: 'area',
                name: 'Change in value',
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
                        [1, highcharts.Color(highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                }
            }],
            useHighStocks: true
        };

    }

    private createChartSerie(signals: Signal[]): any {
        let series = new Array<Array<number>>();
        for (var i = signals.length - 1; i > 0; i--) {
            series.push(Array(signals[i].timestamp,
                (signals[i].value - signals[signals.length - 1].value) * 100
            ))
        }
        return series;
    }
}




