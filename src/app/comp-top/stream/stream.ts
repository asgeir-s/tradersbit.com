import { BitcoinaverageApi } from '../../services/bitcoinaverage-api/bitcoinaverage-api'
import { Stream, StreamsAttribute, Signal, Trade } from '../../typings/types'
import { StreamAttributes } from '../../util/stream-attributes'

/** @ngInject */
export function tbStream(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/comp-top/stream/stream.html',
        controller: TbStreamCtrl,
        controllerAs: 'ctrl',
        bindToController: {
            inStream: '=',
            inSignals: '='
        }
    };

}

/** @ngInject */
export class TbStreamCtrl {
  
    // input:
    inStream: Stream;
    inSignals: Array<Signal>;

    btcRate: number;
    trades: Array<Trade>;
    infoAttributes: Array<StreamsAttribute> = StreamAttributes.infoAttributes();
    statsAttributes: Array<StreamsAttribute> = StreamAttributes.statsAttributes();
  
    /* @ngInject */
    constructor(private $timeout: angular.ITimeoutService, private $mdDialog: angular.material.IDialogService, highchartsNG: any, bitcoinaverageApi: BitcoinaverageApi) {
        // highcharts.setOptions(HighChartThemes.darkTheme);        
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

    openSubscriptionDialog(ev: any): void {

        this.$mdDialog.show({
            template: `
                <md-dialog aria-label="Subscribe">
                    <tb-subscription-dialog in-stream="ctrl.stream" in-btc-rate="ctrl.btcRate">
                </tb-subscription-dialog></md-dialog>`,
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            locals: {
                stream: this.inStream,
                btcRate: this.btcRate
            },
            controller: 
            /** @ngInject */
            class DialogCtrl {
                constructor(public stream: Stream, public btcRate: number) {
                }
            },
            controllerAs: 'ctrl'
        });

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

}