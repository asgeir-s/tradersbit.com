describe('service webDevTec', function () {
    beforeEach(angular.mock.module('tradersbitCom'));
    it('should be registered', inject(function (webDevTec) {
        expect(webDevTec).not.toEqual(null);
    }));
    it('get tec should return array of object', inject(function (webDevTec) {
        expect(webDevTec.tec.length > 5).toBeTruthy();
        webDevTec.tec.forEach(function (tecThing) {
            expect(tecThing).not.toBeNull();
        });
    }));
});
