/** @ngInject */
export function config(
  $logProvider: ng.ILogProvider,
  $locationProvider: ng.ILocationProvider,
  $mdThemingProvider: any,
  authProvider: any) {
  // enable log
  $locationProvider.html5Mode(true)

  // extend the red theme with a few different colors
  let customBlue = $mdThemingProvider.extendPalette("blue", {
    "500": "3893C6",
    "contrastDefaultColor": "light"
  })
  // register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette("customBlue", customBlue)
  // use that theme for the primary intentions
  $mdThemingProvider.theme("default")
    .primaryPalette("customBlue")
    .accentPalette("amber")

  $mdThemingProvider.theme("dark", "default")
    .primaryPalette("amber")
    .dark()

  $mdThemingProvider.theme("trading")
    .primaryPalette("green")
    .accentPalette("red")

  authProvider.init({
    domain: "cluda.auth0.com",
    clientID: "7VNS2Tc2IiQB2PvjUBcb5744qH9eY7iB",
    callbackUrl: location.href,
    loginState: "publish"
  })
}