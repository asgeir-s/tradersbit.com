/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { main } from './comp-top/main/main';
import { GithubContributor } from '../app/services/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/services/webDevTec/webDevTec.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { acmeMalarkey } from '../app/components/malarkey/malarkey.directive';
import { tbSideNavLayout } from '../app/components/side-nav-layout/side-nav-layout';
import { tbHome } from '../app/comp-top/home/home';
import { tbStreamsTable } from '../app/components/streams-table/streams-table';
import { PublicApiService } from '../app/services/public-api-service/public-api-service';

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module tradersbitCom {
  'use strict';

  angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial', 'rx'])
    .config(function($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('orange');
    })
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .service('publicApiService', PublicApiService)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey)
    .directive('main', main)
    .directive('tbSideNavLayout', tbSideNavLayout)
    .directive('tbHome', tbHome)
    .directive('tbStreamsTable', tbStreamsTable);
}
