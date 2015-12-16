import { PublisherStream } from '../../../app/typings/types';

/** @ngInject */
export function tbPublisherStream(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/publisher-stream/publisher-stream.html',
        bindToController: {
            inStream: '='
        },
        controller: TbPublisherStreamCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbPublisherStreamCtrl {
    inStream: PublisherStream;

    constructor() {
        console.log('inStream: ' + JSON.stringify(this.inStream));
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

    unrealizedPL(): number {
        
        return 0;
    }
}
