import { PublisherStream } from '../../../app/typings/types';
import { Signal } from '../../typings/types'

/** @ngInject */
export function tbPublisherStream(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/publisher-stream/publisher-stream.html',
        bindToController: {
            inStream: '=',
            inBtcRate: '&'
        },
        controller: TbPublisherStreamCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbPublisherStreamCtrl {
    inStream: PublisherStream;
    inBtcRate: number;
    unrealizedPL: number;

    constructor(private $q: angular.IQService, private $http: angular.IHttpService, private $state: any) {
        console.log('inStream: ' + JSON.stringify(this.inStream));
        this.computeUnrealizedPL(this.inStream.lastSignal, this.inStream.exchange)
    }


    logoUrl(): string {
        if (this.inStream.exchange === 'bitstamp') {
            return 'assets/images/bitstamp_logo.png'
        }
        else if (this.inStream.exchange === 'bitfinex') {
            return 'assets/images/bitfinex_logo.png'
        }
        else {
            return '';
        }
    }

    positionString(): string {
        if (this.inStream.status === -1) {
            return 'SHORT';
        }
        else if (this.inStream.status === 0) {
            return 'CLOSE';
        }
        else if (this.inStream.status === 1) {
            return 'LONG';
        }
    }

    computeUnrealizedPL(lastSignal: Signal, exchange: string) {
        this.unrealizedPL = 10;
        /*
        this.getLastRate(this.inStream.exchange)
            .then((rate: number) => {
                if (lastSignal.signal === 0) {
                    this.unrealizedPL = 0;
                }
                else if (lastSignal.signal === 1) {
                    this.unrealizedPL = rate - lastSignal.price;
                }
                else if (lastSignal.signal === -1) {
                    this.unrealizedPL = lastSignal.price - rate;
                }
            })
            */

    }

    getLastRate(exchange: string) {
        return this.$http.get('https://api.bitcoinaverage.com/exchanges/USD').then(
            (res: angular.IHttpPromiseCallbackArg<any>) => {
                console.log('last rate at ' + exchange + ': ' + res.data[exchange].rates.last);
                return res.data[exchange].rates.last
            },
            (err: any) => {
                console.error('Could not get bitcoin/usd rate at ' + exchange + '. Error: ' + err);
            })
    }

    goToStream(streamID: string) {
        this.$state.go('stream', { 'streamId': streamID });
    }
}
