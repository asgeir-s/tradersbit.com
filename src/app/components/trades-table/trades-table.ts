import { Trade } from '../../../app/typings/types';

/** @ngInject */
export function tbTradesTable(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/trades-table/trades-table.html',
        bindToController: {
            inTrades: '='
        },
        controller: tbTradesTableCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class tbTradesTableCtrl {
    /* @ngInject */
    constructor() { }

}
