var PublicApiService = (function () {
    /** @ngInject */
    function PublicApiService($http, rx) {
        this.$http = $http;
        this.rx = rx;
        PublicApiService.streams2 = this.rx.Observable
            .fromPromise(this.$http.get(PublicApiService.BASE_URL + '/streams'))
            .map(function (response) { return response.data[1]; });
        PublicApiService.streams2.subscribe(function (item) { return console.log(item); });
    }
    PublicApiService.allStreams = function () {
        return PublicApiService.streams2;
    };
    PublicApiService.BASE_URL = "https://dc3r5gsogb.execute-api.us-west-2.amazonaws.com/dev";
    return PublicApiService;
})();
exports.PublicApiService = PublicApiService;
