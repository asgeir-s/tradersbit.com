/** @ngInject */
export function config($logProvider: angular.ILogProvider, $locationProvider: angular.ILocationProvider, $mdThemingProvider: any, authProvider: any) {
  // enable log
  $locationProvider.html5Mode(true);
  
  $logProvider.debugEnabled(true);

      // Extend the red theme with a few different colors
  var customCyan = $mdThemingProvider.extendPalette('cyan', {
    '500': '3893C6',
    'contrastDefaultColor': 'light'
  });
    var customOrange = $mdThemingProvider.extendPalette('orange', {
    '500': 'FEE496',
    'A200': 'FEE496',
    'contrastDefaultColor': 'dark'
  });
  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('customCyan', customCyan);
  $mdThemingProvider.definePalette('customOrange', customOrange);
  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('customCyan')
    .accentPalette('customOrange');
  
   authProvider.init({
    domain: 'cluda.auth0.com',
    clientID: '7VNS2Tc2IiQB2PvjUBcb5744qH9eY7iB',
    callbackUrl: location.href,
    loginState: 'publish'
  })

}
