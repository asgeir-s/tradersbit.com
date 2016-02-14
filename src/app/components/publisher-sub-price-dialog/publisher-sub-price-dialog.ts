import { AuthApi } from '../../services/auth-api/auth-api';
import { Stream } from '../../../app/typings/types';

/** @ngInject */
export function tbSubscriptionPriceDialog(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/publisher-sub-price-dialog/publisher-sub-price-dialog.html',
    bindToController: {
      inStream: "="
    },
    controller: tbSubscriptionPriceDialogCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class tbSubscriptionPriceDialogCtrl {
  
  inStream: Stream
  subscriptionPrice: number
  apiKey: string
  wating: boolean = false;
  subscriptionPriceUpdated: boolean = false;

  constructor(private authApi: AuthApi, private $state: ng.ui.IStateService, private $mdDialog: angular.material.IDialogService) {
    this.subscriptionPrice = angular.copy(this.inStream.subscriptionPriceUSD)
   }

  cancel() {
    this.$mdDialog.cancel();
  };

  updateSubscriptionPrice(newSubscriptionPrice: number) {
    this.wating = true;
    this.authApi.updateSubscriptionPrice(this.inStream.id, newSubscriptionPrice).then((confirmation: string) => {
      if(confirmation.indexOf('new price for subscribing to') > -1) {
        this.subscriptionPriceUpdated = true;
      }
      this.wating = false;
    })
  }
  
  inputChnaged(): boolean {
    return this.subscriptionPrice !== this.inStream.subscriptionPriceUSD
  }

  chnageState(newState: string) {
    this.$state.go(newState);
    this.cancel();
  }

}
