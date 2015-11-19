/** @ngInject */
function config($logProvider, $locationProvider) {
    // enable log
    $logProvider.debugEnabled(true);
}
exports.config = config;
