import { AuthApi } from './services/auth-api/auth-api'

/** @ngInject */
export function runBlock($log: angular.ILogService, auth: any, $rootScope: any, store: any, jwtHelper: any, authApi: AuthApi) {
  $log.debug('runBlock end');

  // auth0: This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();

  $rootScope.$on('$locationChangeStart', function() {
    let token = store.get('token');
    if (token) {
      if (!jwtHelper.isTokenExpired(token)) {
        if (!auth.isAuthenticated) {
          auth.authenticate(store.get('profile'), token);
          authApi.createApiClient(store.get('awstoken'));
        }
      } else {
        // either show Login page or use the refresh token to get a new idToken
      }
    }
  })

}
