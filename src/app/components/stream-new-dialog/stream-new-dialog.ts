import { NewStream } from "../../../app/typings/types.d.ts"
import { TbFront } from "../../services/tb-front/tb-front"

export class StreamNewDialog implements ng.IComponentOptions {
  controller: any
  templateUrl: string

  constructor() {
    this.controller = StreamNewCtrl
    this.templateUrl = "app/components/stream-new-dialog/stream-new-dialog.html"
  }
}

class StreamNewCtrl {
  stream: NewStream = {
    name: "",
    exchange: "",
    currencyPair: "",
    payoutAddress: "",
    subscriptionPriceUSD: 5
  }
  wating: boolean = false
  error: string

  constructor(
    private tbFront: TbFront,
    private $state: ng.ui.IStateService,
    private $mdDialog: angular.material.IDialogService) {
    "ngInject"
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  createStream(newStream: NewStream) {
    this.wating = true
    this.tbFront.postStream(newStream)
      .then((streamId: string) => {
        this.$state.go(this.$state.current as string, {}, { reload: true })
          .then(() => {
            this.wating = false
            this.$mdDialog.hide("some id")
          })
      })
      .catch((err: any) => {
        this.wating = false
        this.error = err.errorMessage
      })
  }
}