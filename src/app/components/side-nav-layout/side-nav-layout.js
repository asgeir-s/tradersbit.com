/** @ngInject */
function tbSideNavLayout() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/components/side-nav-layout/side-nav-layout.html',
        transclude: true,
        controller: tbSideNavLayoutCtrl,
        controllerAs: 'ctrl'
    };
}
exports.tbSideNavLayout = tbSideNavLayout;
/** @ngInject */
var tbSideNavLayoutCtrl = (function () {
    /* @ngInject */
    function tbSideNavLayoutCtrl($state) {
        this.$state = $state;
    }
    tbSideNavLayoutCtrl.prototype.chnageState = function (newState) {
        this.$state.go(newState);
    };
    return tbSideNavLayoutCtrl;
})();
exports.tbSideNavLayoutCtrl = tbSideNavLayoutCtrl;
