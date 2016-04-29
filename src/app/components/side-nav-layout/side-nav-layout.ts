export class SideNavLayout implements ng.IComponentOptions {
  controller: any
  templateUrl: string
  transclude: boolean

  constructor() {
    this.controller = SideNavLayoutCtrl
    this.templateUrl = "app/components/side-nav-layout/side-nav-layout.html"
    this.transclude = true
  }
}

class SideNavLayoutCtrl {
  constructor(private $state: ng.ui.IStateService, private $mdSidenav: angular.material.ISidenavService) {
    "ngInject"
  }

  chnageState(newState: string) {
    this.$state.go(newState)
    return this.$mdSidenav("leftBig").close()
  }

  stateIs(stateIn: string) {
    return this.$state.is(stateIn)
  }

  goToApiHelp() {
    this.$state.go("help", { "tab": "api" })
  }
}