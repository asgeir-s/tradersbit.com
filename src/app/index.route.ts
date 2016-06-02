import { TbFront } from "./services/tb-front/tb-front"
import { Stream, Signal } from "./typings/types.d.ts"

/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {

  $stateProvider
    .state("home", {
      url: "/",
      template: '<tb-home in-streams="ctrl.streams"></tb-home>',
      resolve: {
        streams: (tbFront: TbFront) => tbFront.publicGetAllStreams()
      },
      controller:
      class StateHome {
        constructor(public streams: Array<Stream>) { }
      },
      controllerAs: "ctrl"
    })
    .state("streams", {
      url: "/streams",
      template: '<tb-streams in-streams="ctrl.streams"></tb-streams>',
      resolve: {
        streams: (tbFront: TbFront) => tbFront.publicGetAllStreams()
      },
      controller:
      class StateStreams {
        constructor(public streams: Array<Stream>) { }
      },
      controllerAs: "ctrl"
    })
    .state("competition", {
      url: "/competition",
      template: '<tb-competition in-streams="ctrl.streams"></tb-competition>',
      resolve: {
        streams: (tbFront: TbFront) => tbFront.publicGetAllStreams()
      },
      controller:
      class StateCompetition {
        constructor(public streams: Array<Stream>) { }
      },
      controllerAs: "ctrl"
    })
    .state("stream", {
      url: "/streams/:streamId",
      template: '<tb-stream in-stream="ctrl.stream" in-signals="ctrl.signals"></tb-stream>',
      resolve: {
        stream: (tbFront: TbFront, $stateParams: any) => tbFront.publicGetStream($stateParams.streamId),
        signals: (tbFront: TbFront, $stateParams: any) => tbFront.publicGetSignals($stateParams.streamId)
      },
      controller:
      class StateStream {
        constructor(public stream: Array<Stream>, public signals: Array<Signal>) {
        }
      },
      controllerAs: "ctrl"
    })
    .state("publish", {
      url: "/publish/:verify",
      template: '<tb-publish my-streams="ctrl.streams"></tb-publish>',
      resolve: {
        streams: (tbFront: TbFront) => tbFront.getMyStreams()
      },
      controller:
      class Publish {
        verify: string
        constructor(public streams: Array<Stream>, $stateParams: any) {
          this.verify = $stateParams.verify
        }
      },
      controllerAs: "ctrl",
      data: {
        requiresLogin: true
      }
    })
    .state("api", {
      url: "/api",
      templateUrl: "app/comp-top/api/api.html",
      controllerAs: "ctrl",
      controller:
      class TbAPICtrl {
        constructor(private $mdSidenav: ng.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
    })
    .state("how-it-works", {
      url: "/how-it-works",
      templateUrl: "app/comp-top/how-it-works/how-it-works.html",
      controllerAs: "ctrl",
      controller:
      class TbhowItWorksCtrl {
        constructor(private $mdSidenav: ng.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
    })
    .state("medium", {
      url: "/medium",
      templateUrl: "app/comp-top/medium/medium.html",
      controller:
      class Medium {
        tab: string
        constructor($ocLazyLoad: any, private $mdSidenav: ng.material.ISidenavService) {
          $ocLazyLoad.load({
            files: ["https://static.medium.com/embed.js"],
            cache: false
          })
        }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
      controllerAs: "ctrl"
    })
    .state("about", {
      url: "/about?tab",
      templateUrl: "app/comp-top/about/about.html",
      controller:
      class About {
        tab: string
        constructor(public $stateParams: any) {
          this.tab = $stateParams.tab
        }
      },
      controllerAs: "ctrl"
    })
    .state("roadmap", {
      url: "/roadmap",
      templateUrl: "app/comp-top/roadmap/roadmap.html",
      controller:
      class Roadmap {
        tab: string
        constructor(private $mdSidenav: ng.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
      controllerAs: "ctrl"
    })
    .state("terms", {
      url: "/terms",
      templateUrl: "app/comp-top/legal/terms-of-service.html",
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: ng.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
      controllerAs: "ctrl"
    })
    .state("privacy", {
      url: "/privacy",
      templateUrl: "app/comp-top/legal/privacy-policy.html",
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: ng.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
      controllerAs: "ctrl"
    })
    .state("release-notes", {
      url: "/release-notes",
      templateUrl: "app/comp-top/release-notes/release-notes.html",
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: ng.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
      controllerAs: "ctrl"
    })
    .state("faq", {
      url: "/faq",
      templateUrl: "app/comp-top/faq/faq.html",
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: ng.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav("leftBig").open()
        }
      },
      controllerAs: "ctrl"
    })

  $urlRouterProvider.otherwise("/")
}
