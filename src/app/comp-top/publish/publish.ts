import { TbFront } from "../../services/tb-front/tb-front"

export class PublishView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inVerify: "<"
    }
    this.controller = PublishViewCtrl
    this.templateUrl = "app/comp-top/publish/publish.html"
  }
}

class PublishViewCtrl {
  inVerify: string
  verifyed: boolean = false

  constructor(private tbFront: TbFront, private $mdSidenav: angular.material.ISidenavService) {
    "ngInject"
    if (typeof this.inVerify !== "undefined" && this.inVerify === "verifyed") {
      this.verifyed = true
    }
  }

  signOut() {
    this.tbFront.signOut("")
  }

  toggleMenu() {
    return this.$mdSidenav("leftBig").open()
  }
}