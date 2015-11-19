/** @ngInject */
export function config($logProvider: ng.ILogProvider, $locationProvider: ng.ILocationProvider) {
  // enable log
  $logProvider.debugEnabled(true);
}
