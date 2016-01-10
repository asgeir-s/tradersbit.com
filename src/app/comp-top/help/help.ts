/** @ngInject */
export function tbHelp(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/help/help.html',
    controller: TbHelpCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbHelpCtrl {

  constructor(private $mdSidenav: angular.material.ISidenavService) { }

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

}
