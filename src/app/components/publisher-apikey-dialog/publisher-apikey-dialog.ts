import { TbFront } from "../../services/tb-front/tb-front"

/** @ngInject */
export function tbPublisherApikeyDialog(): angular.IDirective {

  return {
    restrict: "E",
    scope: {},
    templateUrl: "app/components/publisher-apikey-dialog/publisher-apikey-dialog.html",
    bindToController: {
      inStreamId: "="
    },
    controller: TbPublisherApikeyDialogCtrl,
    controllerAs: "ctrl"
  }

}

/** @ngInject */
export class TbPublisherApikeyDialogCtrl {

  inStreamId: string
  apiKey: string
  watingForKey: boolean = false

  constructor(
    private tbFront: TbFront,
    private $state: ng.ui.IStateService,
    private $mdDialog: angular.material.IDialogService) { }

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
