describe('service githubContributor', function () {
    beforeEach(angular.mock.module('tradersbitCom'));
    it('should be registered', inject(function (githubContributor) {
        expect(githubContributor).not.toBeNull();
    }));
    describe('getContributors function', function () {
        it('should return data', inject(function (githubContributor, $httpBackend) {
            $httpBackend.when('GET', githubContributor.apiHost + '/contributors?per_page=1').respond(200, [{ pprt: 'value' }]);
            var data;
            githubContributor.getContributors(1).then(function (fetchedData) {
                data = fetchedData;
            });
            $httpBackend.flush();
            expect(data.length === 1).toBeTruthy();
            expect(data[0]).not.toBeNull();
        }));
        it('should define a limit per page as default value', inject(function (githubContributor, $httpBackend) {
            $httpBackend.when('GET', githubContributor.apiHost + '/contributors?per_page=30').respond(200, new Array(30));
            var data;
            githubContributor.getContributors().then(function (fetchedData) {
                data = fetchedData;
            });
            $httpBackend.flush();
            expect(data.length === 30).toBeTruthy();
        }));
        it('should log a error', inject(function (githubContributor, $httpBackend, $log) {
            $httpBackend.when('GET', githubContributor.apiHost + '/contributors?per_page=1').respond(500);
            githubContributor.getContributors(1);
            $httpBackend.flush();
            expect($log.error.logs).toEqual(jasmine.stringMatching('XHR Failed for'));
        }));
    });
});
