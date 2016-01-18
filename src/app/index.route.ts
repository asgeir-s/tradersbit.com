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
    .state('publish', {
      url: '/publish',
      template: '<tb-publish></tb-publish>'
    })
    .state("publish-dash", {
      url: "/publish/dash",
      template: '<tb-publish-dash my-streams="ctrl.streams"></tb-publish-dash>',
      resolve: {
        streams: (authApi: AuthApi) => authApi.getMyStreams()
      },
      controller:
      class StateStream {
        constructor(public streams: Array<Stream>) {
          console.log('publish-dash!!!');
        }
      },
      controllerAs: "ctrl",
      data: {
        requiresLogin: true
      }
    })
    .state('help', {
      url: '/help?tab',
      template: '<tb-help in-tab="ctrl.tab"></tb-help>',
      controller:
      class Help {
        tab: string
        constructor(public $stateParams: any) {
          this.tab = $stateParams.tab;
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
    });

  $urlRouterProvider.otherwise('/');
}
