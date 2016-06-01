import { Stream, SubscriptionRequest, CoinbaseEmbedCode } from "../../../app/typings/types.d.ts"
import { TbFront } from "../../services/tb-front/tb-front"

export class SubscriptionDialog implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<",
      inBtcRate: "<"
    }
    this.controller = SubscriptionDialogCtrl
    this.templateUrl = "app/components/subscription-dialog/subscription-dialog.html"
  }
}

class SubscriptionDialogCtrl {
  // inputs
  inStream: Stream
  inBtcRate: number

  subscriptionPriceUSD: number
  subscription: SubscriptionRequest // signalsToEmail should be true when relesing subscriptions
  fullPriceUSD: number
  subscribeAutoTrader: boolean = false
  fullPriceBTC: number
  autoTraderPrice: number = 12
  showRecaptchaWarning: boolean = false
  waitForResponds = false
  gotPaymentInfo = false
  coinbaseEmbedCode: string
  percentToTrade = 100
  private reCaptchaResponds: string

  constructor(
    private tbFront: TbFront,
    private $sce: ng.ISCEService,
    private $mdDialog: ng.material.IDialogService,
    private $mdSidenav: ng.material.ISidenavService,
    private $state: any,
    private $timeout: any) {
    "ngInject"
    this.subscriptionPriceUSD = this.inStream.subscriptionPriceUSD
    this.updatePrice()
  }

  cancel() {
    this.$mdDialog.cancel()
  }

  updatePrice(): void {
    if (this.subscribeAutoTrader) {
      this.fullPriceUSD = this.subscriptionPriceUSD + this.autoTraderPrice
    } else {
      this.fullPriceUSD = this.subscriptionPriceUSD
    }
  }

  setReCaptchaResponds(response: any): void {
    this.reCaptchaResponds = response
  }

  trustSrc(src: string): string {
    return this.$sce.trustAsResourceUrl(src)
  }

  postSubscriptionReturnButtonCode(subscription: SubscriptionRequest): void {
    this.waitForResponds = true

    subscription.autoTrader = this.subscribeAutoTrader
    subscription.streamId = this.inStream.id

    let subscriptionRequest = {
      "email": this.subscription.email,
      "autoTrader": this.subscribeAutoTrader,
      "streamId": this.inStream.id
    }

    if (this.subscribeAutoTrader) {
      subscriptionRequest["apiKey"] = this.subscription.apiKey
      subscriptionRequest["apiSecret"] = this.subscription.apiSecret
      subscriptionRequest["autoTraderData"] = {
        "percentToTrade": this.percentToTrade / 100
      }
    }

    // console.log("subscriptionRequest:" + JSON.stringify(subscriptionRequest))
    this.showRecaptchaWarning = false

    this.tbFront.publicSubscribeReturnPaymentCode(this.reCaptchaResponds, subscriptionRequest)
      .then(coinbasePaymentCode => {
        this.coinbaseEmbedCode = coinbasePaymentCode
        this.gotPaymentInfo = true
      })
      .catch((err: any) => console.log("Server error: " + err))
      .finally(() => this.$timeout(() => this.waitForResponds = false, 2000))
  }

}
