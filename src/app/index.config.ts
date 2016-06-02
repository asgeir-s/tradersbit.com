/** @ngInject */
export function config(
  $logProvider: ng.ILogProvider,
  $locationProvider: ng.ILocationProvider,
  $mdThemingProvider: any,
  authProvider: any) {
  // enable log
  $locationProvider.html5Mode(true)

  // extend the red theme with a few different colors
  const customBlue = $mdThemingProvider.extendPalette("blue", {
    "500": "3893C6",
    "contrastDefaultColor": "light"
  })
  // register the new color paconstte map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette("customBlue", customBlue)
  // use that theme for the primary intentions
  $mdThemingProvider.theme("default")
    .primaryPalette("customBlue")
    .accentPalette("amber")

  $mdThemingProvider.theme("dark", "default")
    .primaryPalette("amber")
    .dark()

  let customGreen = $mdThemingProvider.extendPalette("green", {
    "A100": "c8f0d3",
    "A200": "81C784",
    "contrastDefaultColor": "light"
  })

  let customRed = $mdThemingProvider.extendPalette("red", {
    "A200": "E57373",
    "contrastDefaultColor": "light"
  })

  $mdThemingProvider.definePalette("customGreen", customGreen)
  $mdThemingProvider.definePalette("customRed", customRed)

  $mdThemingProvider.theme("trading")
    .primaryPalette("customGreen")
    .accentPalette("customRed")

  authProvider.init({
    domain: "cluda.auth0.com",
    clientID: "7VNS2Tc2IiQB2PvjUBcb5744qH9eY7iB",
    callbackUrl: location.href,
    loginState: "publish"
  })
}