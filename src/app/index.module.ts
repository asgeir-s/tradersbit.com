/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// top-component
import { tbHome } from './comp-top/home/home';
import { tbStreams } from './comp-top/streams/streams';

// components
import { tbSideNavLayout } from './components/side-nav-layout/side-nav-layout';
import { tbStreamsTable } from './components/streams-table/streams-table';

// services
import { PublicApiService } from './services/public-api-service/public-api-service';


module tradersbitCom {
  'use strict';

  angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial', 'rx'])
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    
  // top-components
    .directive('tbHome', tbHome)
    .directive('tbStreams', tbStreams)
    
  // components
    .directive('tbSideNavLayout', tbSideNavLayout)
    .directive('tbStreamsTable', tbStreamsTable)
    
  // services
    .service('publicApiService', PublicApiService);




}
