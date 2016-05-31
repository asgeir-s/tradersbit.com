import { TbFront } from "../../services/tb-front/tb-front"

export class TopNav implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
    }
    this.controller = TopNavCtrl
    this.templateUrl = "app/components/top-nav/top-nav.html"
  }
}

class TopNavCtrl {
  mustVerifyEmail: boolean = false
  wating: boolean = false
  watingPanelConfig: any

  constructor(private $mdPanel: any, private auth: any, private tbFront: TbFront, private $state: ng.ui.IStateService) {
    "ngInject"
    auth.config.auth0lib.$container = null // auth0 lock fix

    this.watingPanelConfig = {
      attachTo: angular.element(document.body),
      disableParentScroll: true,
      template: '<md-progress-circular md-mode="indeterminate"></md-progress-circular>',
      hasBackdrop: true,
      panelClass: 'demo-dialog-example',
      position: this.$mdPanel.newPanelPosition()
        .absolute()
        .center(),
      trapFocus: true,
      zIndex: 150,
      clickOutsideToClose: true,
      escapeToClose: true,
      focusOnOpen: true
    }

  }

  clickPublish() {
    if (this.auth.isAuthenticated) {
      this.$state.go("publish")
    }
    else {
      this.auth.signin({
        icon: "https://tradersbit.com/assets/logo/logo.png",
        loginAfterSignup: false,
        primaryColor: "#f9bb02",
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

          let panelRef = this.$mdPanel.create(this.watingPanelConfig)
          panelRef.open()
          this.tbFront.signIn(profile, token)
            .then(() => {
              this.$state.go("publish").then(() => panelRef.close())
            })
        }
      }, () => {
        console.log("signin failed!")
      })
    }
  }

  chnageState(newState: string) {
    this.$state.go(newState)
  }

}