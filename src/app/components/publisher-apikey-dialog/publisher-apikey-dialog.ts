import { TbFront } from "../../services/tb-front/tb-front"

export class PublisherApikeyDialog implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStreamId: "@"
    }
    this.controller = PublisherApikeyDialogCtrl
    this.templateUrl = "app/components/publisher-apikey-dialog/publisher-apikey-dialog.html"
  }
}

class PublisherApikeyDialogCtrl {

  inStreamId: string
  apiKey: string
  watingForKey: boolean = false

  constructor(
    private tbFront: TbFront,
    private $state: ng.ui.IStateService,
    private $mdDialog: angular.material.IDialogService) {
    "ngInject"
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  getApiKey() {
    this.watingForKey = true
    this.tbFront.getApiKey(this.inStreamId).then((apiKey: string) => {
      this.apiKey = apiKey
      this.watingForKey = false
    })
  }

  chnageState(newState: string) {
    this.$state.go(newState)
    this.cancel()
  }
}
