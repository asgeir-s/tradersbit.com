/** @ngInject */
function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
        url: '/',
        template: '<tb-home></tb-home>'
    });
    $urlRouterProvider.otherwise('/');
}
exports.routerConfig = routerConfig;
