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
import { tbStreamInfoPromo } from './components/stream-info-promo/stream-info-promo';
import { tbStreamStatsPromo } from './components/stream-stats-promo/stream-stats-promo';
import { tbStreamChartProfit } from './components/stream-chart-profit/stream-chart-profit';
import { tbStreamPiechartTrades } from './components/stream-piechart-trades/stream-piechart-trades';
import { tbStreamAverageTradeChart } from './components/stream-average-trade-chart/stream-average-trade-chart';

// services
import { PublicApi } from './services/public-api/public-api';
import { BitcoinaverageApi } from './services/bitcoinaverage-api/bitcoinaverage-api';


module tradersbitCom {
  'use strict';

  angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial', 'googlechart', 'highcharts-ng'])
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
    .directive('tbStreamInfoPromo', tbStreamInfoPromo)
    .directive('tbStreamStatsPromo', tbStreamStatsPromo)
    .directive('tbStreamChartProfit', tbStreamChartProfit)
    .directive('tbStreamPiechartTrades', tbStreamPiechartTrades)
    .directive('tbStreamAverageTradeChart', tbStreamAverageTradeChart)
   
  // services
    .service('publicApi', PublicApi)
    .service('bitcoinaverageApi', BitcoinaverageApi);




}
