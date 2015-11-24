import { PublicApi } from './services/public-api/public-api'

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
        constructor(public streams) { }
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
        constructor(public streams) { }
      },
      controllerAs: 'ctrl'
    })
    .state("stream", {
      url: "/streams/:streamId",
      template: '<tb-stream in-stream="ctrl.stream" in-signals="ctrl.signals"></tb-stream>',
      resolve: {
        stream: (publicApi: PublicApi, $stateParams) => publicApi.stream($stateParams.streamId),
        signals: (publicApi: PublicApi, $stateParams) => publicApi.signals($stateParams.streamId)
      },
      controller:
      class StateStream {
        constructor(public stream, public signals) {
          console.log('stream: ' + JSON.stringify(stream));
          console.log('signals: ' + JSON.stringify(signals));
         }
      },
      controllerAs: "ctrl"
    });

  $urlRouterProvider.otherwise('/');
}
