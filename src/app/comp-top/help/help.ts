/** @ngInject */
export function tbHelp(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/help/help.html',
    controller: TbHelpCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inTab: "="
    }
  };

}

/** @ngInject */
export class TbHelpCtrl {

  inTab: string;
  tabIndex: number;

  dataStream: any;

  constructor(private $mdSidenav: angular.material.ISidenavService) {
    console.log('intab:' + this.inTab);
    if (this.inTab === 'api') {
      this.tabIndex = 2;
    }
  }

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

}
