

import { TbFront } from "../../services/tb-front/tb-front"
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

  constructor(private tbFront: TbFront, private $state: ng.ui.IStateService, private $mdDialog: angular.material.IDialogService) {
    this.subscriptionPrice = angular.copy(this.inStream.subscriptionPriceUSD)
  }

  cancel() {
    this.$mdDialog.cancel();
  };

  updateSubscriptionPrice(newSubscriptionPrice: number) {
    this.wating = true;
    this.tbFront.updateSubscriptionPrice(this.inStream.id, newSubscriptionPrice)
      .then(confirmation => {
        this.subscriptionPriceUpdated = true;
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
