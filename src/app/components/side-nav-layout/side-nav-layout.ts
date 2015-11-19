/** @ngInject */
export function tbSideNavLayout(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/side-nav-layout/side-nav-layout.html',
    transclude: true,
    controller: tbSideNavLayoutCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class tbSideNavLayoutCtrl {

  /* @ngInject */
  constructor (private $state: ng.ui.IStateService) {

  }

  chnageState(newState) {
    this.$state.go(newState);
  }

}
