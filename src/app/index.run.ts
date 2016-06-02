import { TbFront } from "./services/tb-front/tb-front"

/** @ngInject */
export function runBlock($log: ng.ILogService, auth: any, $rootScope: any, store: any, jwtHelper: any,
  tbFront: TbFront) {
  $log.debug("runBlock end")

  $rootScope.$on("$stateChangeSuccess", () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0
  })

  // auth0: This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents()

  $rootScope.$on("$locationChangeStart", function () {
    let token = store.get("token")
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get("profile"), token)
          tbFront.createApiClient(store.get("awstoken"))
        }
      } else {
        // either show Login page or use the refresh token to get a new idToken
      }
    }
  })

}
