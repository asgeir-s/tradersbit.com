/** @ngInject */
function main() {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'app/comp-top/main/main.html',
        controller: MainController,
        controllerAs: 'main',
        bindToController: true
    };
}
exports.main = main;
/** @ngInject */
var MainController = (function () {
    /* @ngInject */
    function MainController($timeout, webDevTec) {
        this.awesomeThings = new Array();
        this.webDevTec = webDevTec;
        this.classAnimation = '';
        this.creationDate = 1447940717730;
        this.activate($timeout);
    }
    /** @ngInject */
    MainController.prototype.activate = function ($timeout) {
        this.getWebDevTec();
        var self = this;
        $timeout(function () {
            self.classAnimation = 'rubberBand';
        }, 4000);
    };
    MainController.prototype.getWebDevTec = function () {
        this.awesomeThings = this.webDevTec.tec;
    };
    return MainController;
})();
exports.MainController = MainController;
