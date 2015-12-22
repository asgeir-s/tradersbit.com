

/** @ngInject */
export function tbStreamPublisherRow(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/stream-publisher-row/stream-publisher-row.html',
        bindToController: {
            inLastSignal: '=',
            inBtcRate: '='
        },
        controller: TbStreamPublisherRowCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbStreamPublisherRowCtrl {
    
    constructor(private $state: angular.ui.IStateService) { }
    
    goToPublish() {
        this.$state.go('publish-dash');
    }
    
}
