import { TbFront } from "../../services/tb-front/tb-front"

/** @ngInject */
export function tbPublish(): angular.IDirective {

  return {
    restrict: "E",
    scope: {},
    templateUrl: "app/comp-top/publish/publish.html",
    controller: TbPublishCtrl,
    controllerAs: "ctrl",
    bindToController: {
      inVerify: "="
    }
  }
}

/** @ngInject */
export class TbPublishCtrl {
  inVerify: string
  verifyed: boolean = false

  constructor(private tbFront: TbFront, private $mdSidenav: angular.material.ISidenavService) {
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