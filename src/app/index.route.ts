/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      template: '<tb-home></tb-home>'
    });

  $urlRouterProvider.otherwise('/');
}
