import { TbFront } from "../../services/tb-front/tb-front"

/** @ngInject */
export function tbSignIn(): angular.IDirective {

  return {
    restrict: "E",
    scope: {},
    templateUrl: "app/components/sign-in/sign-in.html",
    bindToController: {
    },
    controller: TbSignInCtrl,
    controllerAs: "ctrl"
  }
}

/** @ngInject */
export class TbSignInCtrl {
  mustVerifyEmail: boolean = false
  wating: boolean = false

  constructor(private auth: any, tbFront: TbFront, private $state: ng.ui.IStateService) {
    auth.config.auth0lib.$container = null // auth0 lock fix

    auth.signin({
      container: "hiw-login-container",
      icon: "https://tradersbit.com/assets/logo/logo.png",
      loginAfterSignup: false,
      authParams: {
        scope: "user_id openid email app_metadata"
      },
      dict: {
        signin: {
          title: " Sign In "
        }
      }
    }, (profile: any, token: string) => {
      if (typeof profile === "undefined" || typeof token === "undefined") {
        this.mustVerifyEmail = true
      }
      else {
        // success callback
        this.wating = true

        tbFront.signIn(profile, token)
          .then(() => {
            this.$state.go("publish-dash")
          })
      }
    }, () => {
      console.log("signin failed!")
    })
  }

}
