import { NewStream } from '../../../app/typings/types';
import { AuthApi } from '../../services/auth-api/auth-api'

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
    stream: NewStream;
    wating: boolean = false;
    error: string;

    constructor(private authApi: AuthApi, private $state: ng.ui.IStateService, private $mdDialog: angular.material.IDialogService) { }

    createStream(newStream: NewStream) {
        this.wating = true;
        this.authApi.postStream(newStream)
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
