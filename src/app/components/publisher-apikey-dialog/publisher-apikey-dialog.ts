import { AuthApi } from '../../services/auth-api/auth-api'

/** @ngInject */
export function tbPublisherApikeyDialog(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/publisher-apikey-dialog/publisher-apikey-dialog.html',
    bindToController: {
      inStreamId: "="
    },
    controller: TbPublisherApikeyDialogCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbPublisherApikeyDialogCtrl {

  inStreamId: string
  apiKey: string

  constructor(private authApi: AuthApi, private $state: ng.ui.IStateService, private $mdDialog: angular.material.IDialogService) { }

  cancel() {
    this.$mdDialog.cancel();
  };

  getApiKey() {
    this.authApi.getApiKey(this.inStreamId).then((apiKey: string) =>
      this.apiKey = apiKey
    )
  }

  chnageState(newState: string) {
    this.$state.go(newState);
    this.cancel();
  }

}
