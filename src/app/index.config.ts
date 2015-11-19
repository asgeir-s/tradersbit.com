/** @ngInject */
export function config($logProvider: angular.ILogProvider, $locationProvider: angular.ILocationProvider) {
  // enable log
  $logProvider.debugEnabled(true);
}
