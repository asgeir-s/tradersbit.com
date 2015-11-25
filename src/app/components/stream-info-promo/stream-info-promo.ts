import { StreamsAttribute, Stream} from '../../../app/typings/types';

/** @ngInject */
export function tbStreamInfoPromo(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/stream-info-promo/stream-info-promo.html',
        bindToController: {
            inStream: '='
        },
        controller: tbStreamInfoPromeCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class tbStreamInfoPromeCtrl {
    inStream: Stream;

    /* @ngInject */
    constructor() { }

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

}
