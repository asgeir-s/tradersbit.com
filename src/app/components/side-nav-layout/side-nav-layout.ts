/** @ngInject */
export function tbSideNavLayout(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/side-nav-layout/side-nav-layout.html',
    transclude: true,
    controller: TbSideNavLayoutCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbSideNavLayoutCtrl {

  /* @ngInject */
  constructor (private $state: ng.ui.IStateService) { }

  chnageState(newState: string) {
    this.$state.go(newState);
  }
  
  stateIs(stateIn: string) {
    return this.$state.is(stateIn);
  }

}
