/** @ngInject */
export function sideNavLayout(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/side-nav-layout/side-nav-layout.html',
    transclude: true
  };

}