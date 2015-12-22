import { AuthApi } from '../../services/auth-api/auth-api'

/** @ngInject */
export function tbSignIn(): angular.IDirective {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/sign-in/sign-in.html',
        bindToController: {
        },
        controller: TbSignInCtrl,
        controllerAs: 'ctrl'
    };

}

/** @ngInject */
export class TbSignInCtrl {

    wating: boolean = false;

    constructor(private auth: any, authApi: AuthApi, private $state: ng.ui.IStateService) {
        auth.config.auth0lib.$container = null; // auth0 lock fix
        console.log('constructor rusn');

        auth.signin({
            container: 'hiw-login-container',
            authParams: {
                scope: "user_id openid email app_metadata"
            },
            dict: {
                signin: {
                    title: ' Sign in '
                }
            }
        }, (profile, token) => {
            // Success callback
            this.wating = true;

            authApi.signIn(profile, token)
                .then(() => {
                    this.$state.go('publish-dash')
                    this.wating = false;
                })
        }, () => {
            console.log('signin failed!');
        });
    }

}
