/** @ngInject */
export function runBlock($log: angular.ILogService, $rootScope) {
  $log.debug('runBlock end');
   $rootScope._ = (<any> window)._;
}
