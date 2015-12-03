/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// top-component
import { tbHome } from './comp-top/home/home';
import { tbStreams } from './comp-top/streams/streams';
import { tbStream } from './comp-top/stream/stream';
import { tbPublish } from './comp-top/publish/publish';

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
import { tbSubscriptionDialog } from './components/subscription-dialog/subscription-dialog';

// services
import { PublicApi } from './services/public-api/public-api';
import { BitcoinaverageApi } from './services/bitcoinaverage-api/bitcoinaverage-api';


module tradersbitCom {
  'use strict';

  angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial', 'googlechart', 'highcharts-ng', 'vcRecaptcha', 'auth0'])
    .constant('_', (<any> window)._)
    .constant('highcharts', (<any> window).Highcharts)
    .config(config)
    .config(routerConfig)
    .run(runBlock)

  // top-components
    .directive('tbHome', tbHome)
    .directive('tbStreams', tbStreams)
    .directive('tbStream', tbStream)
    .directive('tbPublish', tbPublish)

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
    .directive('tbSubscriptionDialog', tbSubscriptionDialog)

  // services
    .service('publicApi', PublicApi)
    .service('bitcoinaverageApi', BitcoinaverageApi);

}
