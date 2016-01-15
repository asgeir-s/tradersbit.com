/** @ngInject */
export function tbAbout(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/about/about.html',
    controller: TbAboutCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inTab: "="
    }
  };

}

/** @ngInject */
export class TbAboutCtrl {

  inTab: string;
  tabIndex: number;

  constructor(private $mdSidenav: angular.material.ISidenavService) {
    if (this.inTab === 'relese') {
      this.tabIndex = 1;
    }
  }

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

}



