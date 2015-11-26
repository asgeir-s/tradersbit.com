import { BitcoinaverageApi } from '../../services/bitcoinaverage-api/bitcoinaverage-api'
import { Stream, StreamsAttribute, Signal, Trade } from '../../typings/types'
import { StreamAttributes } from '../../util/stream-attributes'
import { HighChartThemes } from '../../util/highChartThemes'

/** @ngInject */
export function tbStream(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/comp-top/stream/stream.html',
        controller: tbStreamCtrl,
        controllerAs: 'ctrl',
        bindToController: {
            inStream: '=',
            inSignals: '='
        },
    };

}

/** @ngInject */
export class tbStreamCtrl {
  
    // input:
    inStream: Stream;
    inSignals: Array<Signal>;

    btcRate: number;
    trades: Array<Trade>;
    infoAttributes: Array<StreamsAttribute> = StreamAttributes.infoAttributes();
    statsAttributes: Array<StreamsAttribute> = StreamAttributes.statsAttributes();
  
    /* @ngInject */
    constructor(private $timeout, private $mdDialog: angular.material.IDialogService, highchartsNG, bitcoinaverageApi: BitcoinaverageApi) {
        // Highcharts.setOptions(HighChartThemes.darkTheme);        
        this.trades = this.signalsToTrades(this.inSignals);

        bitcoinaverageApi.getPrice().then(
            (btcPrice: number) => {
                this.btcRate = btcPrice;
            });
    }

    signalsToTrades(signals: Array<Signal>): Array<Trade> {
        let tradesArray = new Array<Trade>();

        let startI = 0;
        let first = signals[startI];
        if (first.signal !== 0) {
            startI = 1;
        }

        for (let i = startI; i < signals.length; i++) {
            if (signals[i].signal === 0) {
                let close: Signal = signals[i];
                if (i + 1 < signals.length) {
                    let open: Signal = signals[i + 1];
                    let trade: Trade = {
                        open: open,
                        close: close,
                        position: this.positionNumberToString(open.signal)
                    };
                    tradesArray.push(trade);
                }
            }
        }
        return tradesArray;
    }

    private positionNumberToString(signalNum: number): string {
        if (signalNum === - 1) {
            return "short";
        } else if (signalNum === 1) {
            return "long";
        } else if (signalNum === 0) {
            return "close";
        }
    }

    private contentWidth(): number {
        let rawWidth = window.innerWidth;
        if (rawWidth >= 1055) {
            return rawWidth - 200;
        }
        else {
            return rawWidth - 55;
        }
    }

    openSubscriptionDialog(ev: any): void {
        this.$mdDialog.show({
            controller: "SubscribeController as subscribeCtrl",
            templateUrl: "app/stream/subscribe.tmpl.html",
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                stream: this.inStream,
                btcRate: this.btcRate
            }
        });

    }

}