/** @ngInject */
export function runBlock($log: angular.ILogService, auth: any) {
  $log.debug('runBlock end');

  // auth0: This hooks al auth events to check everything as soon as the app starts
  auth.hookEvents();

}
