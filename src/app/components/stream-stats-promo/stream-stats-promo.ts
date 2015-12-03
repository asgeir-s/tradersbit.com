import { Stream} from '../../../app/typings/types';

/** @ngInject */
export function tbStreamStatsPromo(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/stream-stats-promo/stream-stats-promo.html',
        bindToController: {
            inStream: '='
        },
        controller: TbStreamStatsPromeCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbStreamStatsPromeCtrl {
    inStream: Stream;
}
