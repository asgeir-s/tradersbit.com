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
    
    constructor(private authApi: AuthApi) { }
    
    createStream(newStream: NewStream) {
        this.authApi.postStream(newStream);
    }
}
