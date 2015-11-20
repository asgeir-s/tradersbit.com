/** @ngInject */
function tbHome() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/comp-top/home/home.html',
        controller: tbHomeCtrl,
        controllerAs: 'ctrl'
    };
}
exports.tbHome = tbHome;
/** @ngInject */
var tbHomeCtrl = (function () {
    function tbHomeCtrl(publicApiService) {
        this.relativeDate = moment(this.creationDate).fromNow();
    }
    return tbHomeCtrl;
})();
exports.tbHomeCtrl = tbHomeCtrl;
