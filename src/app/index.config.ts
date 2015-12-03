/** @ngInject */
export function config($logProvider: angular.ILogProvider, $locationProvider: angular.ILocationProvider, $mdThemingProvider: any, authProvider: any) {
  // enable log
  $logProvider.debugEnabled(true);

  $locationProvider.html5Mode(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');


  authProvider.init({
    domain: 'cluda.auth0.com',
    clientID: '7VNS2Tc2IiQB2PvjUBcb5744qH9eY7iB'
  });

}
