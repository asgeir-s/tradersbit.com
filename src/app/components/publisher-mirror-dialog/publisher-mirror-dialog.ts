import { TbFront } from "../../services/tb-front/tb-front"

export class PublisherMirrorDialog implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStreamId: "@"
    }
    this.controller = PublisherMirrorDialogCtrl
    this.templateUrl = "app/components/publisher-mirror-dialog/publisher-mirror-dialog.html"
  }
}

class PublisherMirrorDialogCtrl {

  inStreamId: string
  apiKey: string
  apiSecret: string
  responds: string
  watingForResponds: boolean = false
  gotResponds: boolean = false

  constructor(
    private tbFront: TbFront,
    private $state: ng.ui.IStateService,
    private $mdDialog: ng.material.IDialogService) {
    "ngInject"
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  postMirror() {
    this.watingForResponds = true
    this.tbFront.postMirror(this.inStreamId, this.apiKey, this.apiSecret)
      .then((res: string) => {
        console.log("res: " + res)

        this.responds = res
        this.gotResponds = true
        this.watingForResponds = false
      })
  }

  chnageState(newState: string) {
    this.$state.go(newState)
    this.cancel()
  }
}
