/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// top-component
import { tbHome } from './comp-top/home/home';
import { tbStreams } from './comp-top/streams/streams';
import { tbStream } from './comp-top/stream/stream';

// components
import { tbSideNavLayout } from './components/side-nav-layout/side-nav-layout';
import { tbStreamsTable } from './components/streams-table/streams-table';
import { tbInfoTable } from './components/info-table/info-table';
import { tbTradesTable } from './components/trades-table/trades-table';

// services
import { PublicApi } from './services/public-api/public-api';
import { BitcoinaverageApi } from './services/bitcoinaverage-api/bitcoinaverage-api';


module tradersbitCom {
  'use strict';

  angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial'])
    .constant('_', (<any> window)._)
    .config(config)
    .config(routerConfig)
    .run(runBlock)
    
  // top-components
    .directive('tbHome', tbHome)
    .directive('tbStreams', tbStreams)
    .directive('tbStream', tbStream)
    
  // components
    .directive('tbSideNavLayout', tbSideNavLayout)
    .directive('tbStreamsTable', tbStreamsTable)
    .directive('tbInfoTable', tbInfoTable)
    .directive('tbTradesTable', tbTradesTable)
    
  // services
    .service('publicApi', PublicApi)
    .service('bitcoinaverageApi', BitcoinaverageApi);




}
