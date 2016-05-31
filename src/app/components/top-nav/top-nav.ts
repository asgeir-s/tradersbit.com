
export class TopNav implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
    }
    this.controller = TopNavCtrl
    this.templateUrl = "app/components/top-nav/top-nav.html"
  }
}

class TopNavCtrl {
  constructor(private $state: any) {
    "ngInject"
  }

  chnageState(newState: string) {
    this.$state.go(newState)
  }
}