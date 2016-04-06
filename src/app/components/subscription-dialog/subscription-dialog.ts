
import { Stream, SubscriptionRequest, CoinbaseEmbedCode } from "../../../app/typings/types"
import { TbFront } from "../../services/tb-front/tb-front"

/** @ngInject */
export function tbSubscriptionDialog(): angular.IDirective {

  return {
    restrict: "E",
    scope: {},
    templateUrl: "app/components/subscription-dialog/subscription-dialog.html",
    bindToController: {
      inStream: "=",
      inBtcRate: "="
    },
    controller: TbSubscriptionDialogCtrl,
    controllerAs: "ctrl"
  }

}

/** @ngInject */
export class TbSubscriptionDialogCtrl {
  // inputs
  inStream: Stream
  inBtcRate: number

  subscriptionPriceUSD: number
  subscription: SubscriptionRequest // signalsToEmail should be true when relesing subscriptions
  fullPriceUSD: number
  subscribeAutoTrader: boolean = false
  fullPriceBTC: number
  autoTraderPrice: number = 15
  showRecaptchaWarning: boolean = false
  waitForResponds = false
  gotPaymentInfo = false
  coinbaseEmbedCode: string
  private reCaptchaResponds: string


  /* @ngInject */
  constructor(private tbFront: TbFront, private $sce: angular.ISCEService,
    private $mdDialog: angular.material.IDialogService,
    private $mdSidenav: angular.material.ISidenavService, private $state: any, private $timeout: any) {

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

    console.log("subscription:" + JSON.stringify(subscription))
    this.showRecaptchaWarning = false

    this.tbFront.publicSubscribeReturnPaymentCode(this.reCaptchaResponds, subscription)
      .then(coinbasePaymentCode => {
        this.coinbaseEmbedCode = coinbasePaymentCode
        this.gotPaymentInfo = true
      })
      .catch((err: any) => console.log("Server error: " + err))
      .finally(() => this.$timeout(() => this.waitForResponds = false, 2000))
  }

}
