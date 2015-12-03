

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
        controller: TbInfoTableCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbInfoTableCtrl {
}
