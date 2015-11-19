/// <reference path="../../.tmp/typings/tsd.d.ts" />
var index_config_1 = require('./index.config');
var index_route_1 = require('./index.route');
var index_run_1 = require('./index.run');
var main_1 = require('./comp-top/main/main');
var githubContributor_service_1 = require('../app/services/githubContributor/githubContributor.service');
var webDevTec_service_1 = require('../app/services/webDevTec/webDevTec.service');
var navbar_directive_1 = require('../app/components/navbar/navbar.directive');
var malarkey_directive_1 = require('../app/components/malarkey/malarkey.directive');
var tradersbitCom;
(function (tradersbitCom) {
    'use strict';
    angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial'])
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .config(index_config_1.config)
        .config(index_route_1.routerConfig)
        .run(index_run_1.runBlock)
        .service('githubContributor', githubContributor_service_1.GithubContributor)
        .service('webDevTec', webDevTec_service_1.WebDevTecService)
        .directive('acmeNavbar', navbar_directive_1.acmeNavbar)
        .directive('acmeMalarkey', malarkey_directive_1.acmeMalarkey)
        .directive('main', main_1.main);
})(tradersbitCom || (tradersbitCom = {}));
