/** @ngInject */
export function config($logProvider: angular.ILogProvider, $locationProvider: angular.ILocationProvider, $mdThemingProvider: any) {
  // enable log
  $logProvider.debugEnabled(true);
  
  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');
}
