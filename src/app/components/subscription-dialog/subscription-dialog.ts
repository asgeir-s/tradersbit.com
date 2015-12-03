import { Stream, Subscription, CoinbaseEmbedCode } from '../../../app/typings/types';
import { PublicApi } from '../../services/public-api/public-api';

/** @ngInject */
export function tbSubscriptionDialog(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/subscription-dialog/subscription-dialog.html',
        bindToController: {
            inStream: "=",
            inBtcRate: "="
        },
        controller: TbSubscriptionDialogCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbSubscriptionDialogCtrl {
    // inputs
    inStream: Stream;
    inBtcRate: number;

    subscriptionPriceUSD: number;
    subscription: Subscription = { email: "", apiKey: "", apiSecret: "", signalsToEmail: true };
    fullPriceUSD: number;
    subscribeAutoTrader: boolean = false;
    fullPriceBTC: number;
    autoTraderPrice: number = 10;
    showRecaptchaWarning: boolean = false;
    waitForResponds = false;
    gotPaymentInfo = false;
    coinbaseEmbedCode: string;
    private reCaptchaResponds: string;


    /* @ngInject */
    constructor(private publicApi: PublicApi, private $sce: angular.ISCEService) {
        this.subscriptionPriceUSD = this.inStream.subscriptionPriceUSD;
        this.updatePrice();
    }

    updatePrice(): void {
        if (this.subscribeAutoTrader) {
            this.fullPriceUSD = this.subscriptionPriceUSD + this.autoTraderPrice;
        } else {
            this.subscription.apiKey = "";
            this.subscription.apiSecret = "";
            this.fullPriceUSD = this.subscriptionPriceUSD;
        }
    }

    setReCaptchaResponds(response: any): void {
        this.reCaptchaResponds = response;
    }

    trustSrc(src: string): string {
        return this.$sce.trustAsResourceUrl(src);
    }

    postSubscriptionReturnButtonCode(subscription: Subscription): void {
        this.waitForResponds = true;
        if (!this.subscribeAutoTrader) {
            subscription.apiKey = "";
            subscription.apiSecret = "";
        }
        console.log("subscription:" + JSON.stringify(subscription));
        this.showRecaptchaWarning = false;

        this.publicApi.subscribe(this.reCaptchaResponds, this.inStream.id, subscription)
            .then((coinbaseEmbedCode: CoinbaseEmbedCode) => {
                console.log(coinbaseEmbedCode);
                this.coinbaseEmbedCode = coinbaseEmbedCode.embed_code;
                this.gotPaymentInfo = true;
            })
            .catch((err: any) => console.log("Server error: " + err))
            .finally(() => this.waitForResponds = false);
    }

}
