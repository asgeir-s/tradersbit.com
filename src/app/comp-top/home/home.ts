import { Stream, StreamsAttribute } from "../../typings/types.d.ts"
import { BitcoinaverageApi } from "../../services/bitcoinaverage-api/bitcoinaverage-api"
import { TbFront } from "../../services/tb-front/tb-front"

export class HomeView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStreams: "<"
    }
    this.controller = HomeViewCtrl
    this.templateUrl = "app/comp-top/home/home.html"
  }
}

class HomeViewCtrl {
  inStreams: Array<Stream>
  activeLastDays: number = 30
  minNumTrades: number = 20
  minNetProfit: number = 10
  mustVerifyEmail: boolean = false
  wating: boolean = false
  watingPanelConfig: any

  constructor(
    private tbFront: TbFront,
    private $mdPanel: any,
    private $state: any,
    private auth: any,
    private $mdSidenav: any,
    bitcoinaverageApi: BitcoinaverageApi) {
    "ngInject"

    this.watingPanelConfig = {
      attachTo: angular.element(document.body),
      disableParentScroll: true,
      template: '<md-progress-circular md-mode="indeterminate" md-diameter="100"></md-progress-circular>',
      hasBackdrop: true,
      panelClass: "demo-dialog-example",
      position: this.$mdPanel.newPanelPosition()
        .absolute()
        .center(),
      trapFocus: true,
      zIndex: 150,
      clickOutsideToClose: false,
      escapeToClose: false,
      focusOnOpen: true
    }
  }

  chnageState(newState: string) {
    this.$state.go(newState)
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
          const panelRef = this.$mdPanel.create(this.watingPanelConfig)
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

  toggleRightSidebar(): void {
    this.$mdSidenav("home-right").toggle()
  }

  allTimeValueIncl(stream) {
    return stream.stats.allTimeValueIncl
  }
}