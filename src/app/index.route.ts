import { PublicApi } from './services/public-api/public-api'
import { AuthApi } from './services/auth-api/auth-api'
import { Stream, Signal } from './typings/types';

/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {


  $stateProvider
    .state('home', {
      url: '/',
      template: '<tb-home in-streams="ctrl.streams"></tb-home>',
      resolve: {
        streams: (publicApi: PublicApi) => publicApi.allStreams()
      },
      controller:
      class StateHome {
        constructor(public streams: Array<Stream>) { }
      },
      controllerAs: 'ctrl'
    })
    .state('streams', {
      url: '/streams',
      template: '<tb-streams in-streams="ctrl.streams"></tb-streams>',
      resolve: {
        streams: (publicApi: PublicApi) => publicApi.allStreams()
      },
      controller:
      class StateStreams {
        constructor(public streams: Array<Stream>) { }
      },
      controllerAs: 'ctrl'
    })
    .state('competition', {
      url: '/competition',
      template: '<tb-competition in-streams="ctrl.streams"></tb-competition>',
      resolve: {
        streams: (publicApi: PublicApi) => publicApi.allStreams()
      },
      controller:
      class StateCompetition {
        constructor(public streams: Array<Stream>) { }
      },
      controllerAs: 'ctrl'
    })
    .state("stream", {
      url: "/streams/:streamId",
      template: '<tb-stream in-stream="ctrl.stream" in-signals="ctrl.signals"></tb-stream>',
      resolve: {
        stream: (publicApi: PublicApi, $stateParams: any) => publicApi.stream($stateParams.streamId),
        signals: (publicApi: PublicApi, $stateParams: any) => publicApi.signals($stateParams.streamId)
      },
      controller:
      class StateStream {
        constructor(public stream: Array<Stream>, public signals: Array<Signal>) {
        }
      },
      controllerAs: "ctrl"
    })
    .state("publish-dash", {
      url: "/publish/dash",
      template: '<tb-publish-dash my-streams="ctrl.streams"></tb-publish-dash>',
      resolve: {
        streams: (authApi: AuthApi) => authApi.getMyStreams()
      },
      controller:
      class StateStream {
        constructor(public streams: Array<Stream>) { }
      },
      controllerAs: "ctrl",
      data: {
        requiresLogin: true
      }
    })
    .state('publish', {
      url: '/publish/:verify',
      template: '<tb-publish in-verify="ctrl.verify"></tb-publish>',
      controllerAs: 'ctrl',
      controller:
      class Publish {
        verify: string;
        constructor($stateParams) {
          this.verify = $stateParams.verify;
        }
      }
    })
    .state('api', {
      url: '/api',
      templateUrl: 'app/comp-top/api/api.html',
      controllerAs: "ctrl",
      controller:
      class TbAPICtrl {
        constructor(private $mdSidenav: angular.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav('leftBig').open();
        }
      },
    })
    .state('medium', {
      url: '/medium',
      templateUrl: 'app/comp-top/medium/medium.html',
      controller:
      class Medium {
        tab: string
        constructor($ocLazyLoad: any, private $mdSidenav: angular.material.ISidenavService) {
          $ocLazyLoad.load({
            files: ['https://static.medium.com/embed.js'],
            cache: false
          });
        }
        toggleMenu() {
          return this.$mdSidenav('leftBig').open();
        }
      },
      controllerAs: "ctrl"
    })
    .state('about', {
      url: '/about?tab',
      template: '<tb-about in-tab="ctrl.tab"></tb-about>',
      controller:
      class About {
        tab: string
        constructor(public $stateParams: any) {
          this.tab = $stateParams.tab;
        }
      },
      controllerAs: "ctrl"
    })
    .state('terms', {
      url: '/terms',
      templateUrl: 'app/comp-top/legal/terms-of-service.html',
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: angular.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav('leftBig').open();
        }
      },
      controllerAs: "ctrl"
    })
    .state('privacy', {
      url: '/privacy',
      templateUrl: 'app/comp-top/legal/privacy-policy.html',
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: angular.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav('leftBig').open();
        }
      },
      controllerAs: "ctrl"
    })
    .state('release-notes', {
      url: '/release-notes',
      templateUrl: 'app/comp-top/release-notes/release-notes.html',
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: angular.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav('leftBig').open();
        }
      },
      controllerAs: "ctrl"
    })
    .state('faq', {
      url: '/faq',
      templateUrl: 'app/comp-top/faq/faq.html',
      controller:
      class TbPublishCtrl {
        constructor(private $mdSidenav: angular.material.ISidenavService) { }
        toggleMenu() {
          return this.$mdSidenav('leftBig').open();
        }
      },
      controllerAs: "ctrl"
    });

  $urlRouterProvider.otherwise('/');
}
