/**
 * @todo Complete the test
 * This example is not perfect.
 * The `link` function is not tested.
 * (malarkey usage, addClass, $watch, $destroy)
 */
describe('directive malarkey', function () {
    var element;
    var malarkeyController;
    beforeEach(angular.mock.module('tradersbitCom'));
    beforeEach(inject(function ($compile, $rootScope, githubContributor, $q) {
        spyOn(githubContributor, 'getContributors').and.callFake(function () {
            return $q.when([{}, {}, {}, {}, {}, {}]);
        });
        element = angular.element("\n      <acme-malarkey extra-values=\"['Poney', 'Monkey']\"></acme-malarkey>\n    ");
        $compile(element)($rootScope.$new());
        $rootScope.$digest();
        malarkeyController = element.isolateScope().vm;
    }));
    it('should be compiled', function () {
        expect(element.html()).not.toEqual(null);
    });
    it('should have isolate scope object with instanciate members', function () {
        expect(malarkeyController).toEqual(jasmine.any(Object));
        expect(malarkeyController.contributors.length).toEqual(6);
    });
    it('should log a info', inject(function ($log) {
        expect($log.info.logs).toEqual(jasmine.stringMatching('Activated Contributors View'));
    }));
});
