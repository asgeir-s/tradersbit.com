import { Stream } from "../../../app/typings/types.d.ts"

export class Footer implements ng.IComponentOptions {
  controller: any
  templateUrl: string

  constructor() {
    this.controller = FooterCtrl
    this.templateUrl = "app/components/footer/footer.html"
  }
}

class FooterCtrl {

  constructor(public $state: any) {
     "ngInject"
   }
}