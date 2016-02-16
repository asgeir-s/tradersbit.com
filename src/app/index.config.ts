/** @ngInject */
export function config($logProvider: angular.ILogProvider, $locationProvider: angular.ILocationProvider, $mdThemingProvider: any, authProvider: any) {
  // enable log
  $locationProvider.html5Mode(true);

  $logProvider.debugEnabled(true);

  // extend the red theme with a few different colors
  var customBlue = $mdThemingProvider.extendPalette('blue', {
    '500': '3893C6',
    'contrastDefaultColor': 'light'
  });
  var customAmber = $mdThemingProvider.extendPalette('amber', {
    'A100': 'FEE496',
    'A400': 'FEE496',
    'contrastDefaultColor': 'dark'
  });
  // register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('customCyan', customBlue);
  $mdThemingProvider.definePalette('customOrange', customAmber);
  // use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('customCyan')
    .accentPalette('customOrange');

  $mdThemingProvider.theme('docs-dark')
    .primaryPalette('yellow')
    .dark();

  authProvider.init({
    domain: 'cluda.auth0.com',
    clientID: '7VNS2Tc2IiQB2PvjUBcb5744qH9eY7iB',
    callbackUrl: location.href,
    loginState: 'publish'
  })

}
