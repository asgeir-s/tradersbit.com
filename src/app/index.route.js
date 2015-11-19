/** @ngInject */
function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
        url: '/',
        template: '<main></main>'
    });
    $urlRouterProvider.otherwise('/');
}
exports.routerConfig = routerConfig;
