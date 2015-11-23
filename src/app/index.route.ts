import { PublicApiService } from './services/public-api-service/public-api-service'

/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {


  $stateProvider
    .state('home', {
      url: '/',
      template: '<tb-home in-streams="ctrl.streams"></tb-home>',
      resolve: {
        streams: (publicApiService: PublicApiService) => publicApiService.allStreams()
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
        streams: (publicApiService: PublicApiService) => publicApiService.allStreams()
      },
      controller:
      class StateStreams {
        constructor(public streams) { }
      },
      controllerAs: 'ctrl'
    });

  $urlRouterProvider.otherwise('/');
}
