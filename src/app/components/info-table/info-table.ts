import { StreamsAttribute, Stream} from '../../../app/typings/types';

/** @ngInject */
export function tbInfoTable(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/info-table/info-table.html',
        bindToController: {
            inStream: '=',
            inAttributes: '=',
            inName: '@'
        },
        controller: tbInfoTableCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class tbInfoTableCtrl {
    /* @ngInject */
    constructor() { }

}
