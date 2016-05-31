import { TbFront } from "../../services/tb-front/tb-front"
import { Stream } from "../../../app/typings/types.d.ts"

export class SubscriptionPriceDialog implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<"
    }
    this.controller = SubscriptionPriceDialogCtrl
    this.templateUrl = "app/components/publisher-sub-price-dialog/publisher-sub-price-dialog.html"
  }
}

class SubscriptionPriceDialogCtrl {

  inStream: Stream
  subscriptionPrice: number
  apiKey: string
  wating: boolean = false
  subscriptionPriceUpdated: boolean = false

  constructor(
    private tbFront: TbFront,
    private $state: ng.ui.IStateService,
    private $mdDialog: angular.material.IDialogService) {
    "ngInject"
    this.subscriptionPrice = angular.copy(this.inStream.subscriptionPriceUSD)
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  updateSubscriptionPrice(newSubscriptionPrice: number) {
    this.wating = true
    this.tbFront.updateSubscriptionPrice(this.inStream.id, newSubscriptionPrice)
      .then(confirmation => {
        this.subscriptionPriceUpdated = true
        this.wating = false
      })
  }

  inputChnaged(): boolean {
    return this.subscriptionPrice !== this.inStream.subscriptionPriceUSD
  }

  chnageState(newState: string) {
    this.$state.go(newState)
    this.cancel()
  }

}
