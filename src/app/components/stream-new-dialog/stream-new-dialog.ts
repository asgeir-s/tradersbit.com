

import { NewStream } from '../../../app/typings/types';
import { TbFront } from "../../services/tb-front/tb-front"

/** @ngInject */
export function tbStreamNewDialog(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/stream-new-dialog/stream-new-dialog.html',
    bindToController: {
    },
    controller: TbStreamNewCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbStreamNewCtrl {
  stream: NewStream = {
        name: "",
    exchange: "",
    currencyPair: "",
    payoutAddress: "",
    subscriptionPriceUSD: 5
    };
  wating: boolean = false;
  error: string;

  constructor(private tbFront: TbFront, private $state: ng.ui.IStateService, private $mdDialog: angular.material.IDialogService) { }

  cancel() {
    this.$mdDialog.cancel();
  };

  createStream(newStream: NewStream) {
    this.wating = true
    this.tbFront.postStream(newStream)
      .then((streamId: string) => {
        this.$state.go(<string>this.$state.current, {}, { reload: true })
          .then(() => {
            this.wating = false;
            this.$mdDialog.hide('some id');
          })
      })
      .catch((err: any) => {
        this.wating = false;
        this.error = err.errorMessage;
      })
  }
}
