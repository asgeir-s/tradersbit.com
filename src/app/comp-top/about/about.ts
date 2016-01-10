/** @ngInject */
export function tbAbout(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/about/about.html',
    controller: TbAboutCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbAboutCtrl {

  constructor(private $mdSidenav: angular.material.ISidenavService) { }

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

}



