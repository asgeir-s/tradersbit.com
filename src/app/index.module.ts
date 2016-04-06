/// <reference path="../../typings/main.d.ts" />

declare const require: any

require('script!../assets/tb-front-sdk/lib/axios/dist/axios.standalone.js');
require('script!../assets/tb-front-sdk/lib/CryptoJS/rollups/hmac-sha256.js');
require('script!../assets/tb-front-sdk/lib/CryptoJS/rollups/sha256.js');
require('script!../assets/tb-front-sdk/lib/CryptoJS/components/hmac.js');
require('script!../assets/tb-front-sdk/lib/CryptoJS/components/enc-base64.js');
//require('script!../assets/tb-front-sdk/lib/moment/moment.js');
require('script!../assets/tb-front-sdk/lib/url-template/url-template.js');
require('script!../assets/tb-front-sdk/lib/apiGatewayCore/sigV4Client.js');
require('script!../assets/tb-front-sdk/lib/apiGatewayCore/apiGatewayClient.js');
require('script!../assets/tb-front-sdk/lib/apiGatewayCore/simpleHttpClient.js');
require('script!../assets/tb-front-sdk/lib/apiGatewayCore/utils.js');
require('script!../assets/tb-front-sdk/apigClient.js');

require('script!../assets/highstock.js');

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';

// top-component
import { tbHome } from './comp-top/home/home';
import { tbStreams } from './comp-top/streams/streams';
import { tbStream } from './comp-top/stream/stream';
import { tbPublish } from './comp-top/publish/publish';
import { tbPublishDash } from './comp-top/publish-dash/publish-dash';
import { tbAbout } from './comp-top/about/about';
import { tbCompetition } from './comp-top/competition/competition';

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
import { tbSignIn } from './components/sign-in/sign-in';
import { tbPublisherStream } from './components/publisher-stream/publisher-stream';
import { tbStreamNewDialog } from './components/stream-new-dialog/stream-new-dialog';
import { tbStreamPublisherRow } from './components/stream-publisher-row/stream-publisher-row'
import { tbPublisherApikeyDialog } from './components/publisher-apikey-dialog/publisher-apikey-dialog';
import { tbSubscriptionPriceDialog } from './components/publisher-sub-price-dialog/publisher-sub-price-dialog'

// services
//import { PublicApi } from './services/public-api/public-api';
//import { AuthApi } from './services/auth-api/auth-api';
import { TbFront } from './services/tb-front/tb-front'
import { BitcoinaverageApi } from './services/bitcoinaverage-api/bitcoinaverage-api';
import { BitfinexSocket } from './services/bitfinex-socket/bitfinex-socket';


module tradersbitCom {
  'use strict';

  angular.module('tradersbitCom', ['ngSanitize', 'ui.router', 'ngMaterial', 'highcharts-ng', 'vcRecaptcha', 'auth0', 'angular-storage', 'angular-jwt', 'ngWebSocket', "oc.lazyLoad", "ngOnload"]) //  'angular-storage'
    .constant('_', (<any>window)._)
    .constant('highcharts', (<any>window).Highcharts)

    .config(config)
    .config(routerConfig)
    .run(runBlock)

    // top-components
    .directive('tbHome', tbHome)
    .directive('tbStreams', tbStreams)
    .directive('tbStream', tbStream)
    .directive('tbPublish', tbPublish)
    .directive('tbPublishDash', tbPublishDash)
    .directive('tbAbout', tbAbout)
    .directive('tbCompetition', tbCompetition)

     //components
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
    .directive('tbSignIn', tbSignIn)
    .directive('tbPublisherStream', tbPublisherStream)
    .directive('tbStreamNewDialog', tbStreamNewDialog)
    .directive('tbStreamPublisherRow', tbStreamPublisherRow)
    .directive('tbPublisherApikeyDialog', tbPublisherApikeyDialog)
    .directive('tbSubscriptionPriceDialog', tbSubscriptionPriceDialog)

     //services
    //.service('publicApi', PublicApi)
    //.service('authApi', AuthApi)
    .service("tbFront", TbFront)
    .service('bitcoinaverageApi', BitcoinaverageApi)
    .service('bitfinexSocket', BitfinexSocket);

}
