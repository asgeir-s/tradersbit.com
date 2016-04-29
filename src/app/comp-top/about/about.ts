export class AboutView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inTab: "<"
    }
    this.controller = AboutViewCtrl
    this.templateUrl = "app/comp-top/about/about.html"
  }
}

class AboutViewCtrl {
  inTab: string
  tabIndex: number

  constructor(private $mdSidenav: angular.material.ISidenavService) {
    "ngInject"
    if (this.inTab === "relese") {
      this.tabIndex = 1
    }
  }

  toggleMenu() {
    return this.$mdSidenav("leftBig").open()
  }
}