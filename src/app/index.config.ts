/** @ngInject */
export function config($logProvider: angular.ILogProvider, $locationProvider: angular.ILocationProvider, $mdThemingProvider: any, authProvider: any) {
  // enable log
  $locationProvider.html5Mode(true).hashPrefix('!');
  
  $logProvider.debugEnabled(true);

  $mdThemingProvider.theme('default')
    .primaryPalette('cyan')
    .accentPalette('orange');
  
   authProvider.init({
    domain: 'cluda.auth0.com',
    clientID: '7VNS2Tc2IiQB2PvjUBcb5744qH9eY7iB',
    callbackUrl: location.href,
    loginState: 'publish'
  })

}
