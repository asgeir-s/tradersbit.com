/** @ngInject */
function acmeNavbar() {
    return {
        restrict: 'E',
        scope: {
            creationDate: '='
        },
        templateUrl: 'app/components/navbar/navbar.html',
        controller: NavbarController,
        controllerAs: 'vm',
        bindToController: true
    };
}
exports.acmeNavbar = acmeNavbar;
/** @ngInject */
var NavbarController = (function () {
    function NavbarController(moment) {
        this.relativeDate = moment(this.creationDate).fromNow();
    }
    return NavbarController;
})();
exports.NavbarController = NavbarController;
