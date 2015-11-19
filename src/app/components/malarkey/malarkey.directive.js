/** @ngInject */
function acmeMalarkey(malarkey) {
    return {
        restrict: 'E',
        scope: {
            extraValues: '='
        },
        template: '&nbsp;',
        link: linkFunc,
        controller: MalarkeyController,
        controllerAs: 'vm'
    };
}
exports.acmeMalarkey = acmeMalarkey;
function linkFunc(scope, el, attr, vm) {
    var watcher;
    var typist = vm.malarkey(el[0], {
        typeSpeed: 40,
        deleteSpeed: 40,
        pauseDelay: 800,
        loop: true,
        postfix: ' '
    });
    el.addClass('acme-malarkey');
    angular.forEach(scope.extraValues, function (value) {
        typist.type(value).pause().delete();
    });
    watcher = scope.$watch('vm.contributors', function (current, original) {
        angular.forEach(vm.contributors, function (contributor) {
            typist.type(contributor.login).pause().delete();
        });
    });
    scope.$on('$destroy', function () {
        watcher();
    });
}
/** @ngInject */
var MalarkeyController = (function () {
    function MalarkeyController($log, githubContributor, malarkey) {
        this.contributors = [];
        this.$log = $log;
        this.githubContributor = githubContributor;
        this.malarkey = malarkey;
        this.activate();
    }
    MalarkeyController.prototype.activate = function () {
        var _this = this;
        return this.getContributors()
            .then(function () {
            _this.$log.info('Activated Contributors View');
        });
    };
    MalarkeyController.prototype.getContributors = function () {
        var _this = this;
        return this.githubContributor.getContributors(10)
            .then(function (data) {
            _this.contributors = data;
            return _this.contributors;
        });
    };
    return MalarkeyController;
})();
exports.MalarkeyController = MalarkeyController;
