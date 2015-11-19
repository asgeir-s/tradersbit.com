/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { main } from './comp-top/main/main';
import { GithubContributor } from '../app/services/githubContributor/githubContributor.service';
import { WebDevTecService } from '../app/services/webDevTec/webDevTec.service';
import { acmeNavbar } from '../app/components/navbar/navbar.directive';
import { acmeMalarkey } from '../app/components/malarkey/malarkey.directive';
import { sideNavLayout } from '../app/components/side-nav-layout/side-nav-layout'

declare var malarkey: any;
declare var moment: moment.MomentStatic;

module tradersbitCom {
  'use strict';

  angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial'])
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    .service('githubContributor', GithubContributor)
    .service('webDevTec', WebDevTecService)
    .directive('acmeNavbar', acmeNavbar)
    .directive('acmeMalarkey', acmeMalarkey)
    .directive('main', main)
    .directive('sideNavLayout', sideNavLayout);
}
