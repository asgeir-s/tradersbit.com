/// <reference path="../../typings/index.d.ts" />

declare const require: any

require("script!../assets/tb-front-sdk/lib/axios/dist/axios.standalone.js")
require("script!../assets/tb-front-sdk/lib/CryptoJS/rollups/hmac-sha256.js")
require("script!../assets/tb-front-sdk/lib/CryptoJS/rollups/sha256.js")
require("script!../assets/tb-front-sdk/lib/CryptoJS/components/hmac.js")
require("script!../assets/tb-front-sdk/lib/CryptoJS/components/enc-base64.js")
require("script!../assets/tb-front-sdk/lib/url-template/url-template.js")
require("script!../assets/tb-front-sdk/lib/apiGatewayCore/sigV4Client.js")
require("script!../assets/tb-front-sdk/lib/apiGatewayCore/apiGatewayClient.js")
require("script!../assets/tb-front-sdk/lib/apiGatewayCore/simpleHttpClient.js")
require("script!../assets/tb-front-sdk/lib/apiGatewayCore/utils.js")
require("script!../assets/tb-front-sdk/apigClient.js")

require("script!../assets/highchart/highstock.js")
require("script!../assets/highchart/highcharts-more.js")
require("script!../assets/highchart/solid-gauge.js")

import { config } from "./index.config"
import { routerConfig } from "./index.route"
import { runBlock } from "./index.run"

// top-component
import { HomeView } from "./comp-top/home/home"
import { StreamsView } from "./comp-top/streams/streams"
import { StreamView } from "./comp-top/stream/stream"
import { PublishView } from "./comp-top/publish/publish"
import { PublishDashView } from "./comp-top/publish-dash/publish-dash"
import { AboutView } from "./comp-top/about/about"
import { CompetitionView } from "./comp-top/competition/competition"

// components
import { SideNavLayout } from "./components/side-nav-layout/side-nav-layout"
import { TbStreamsTable } from "./components/streams-table/streams-table"
import { InfoTable } from "./components/info-table/info-table"
import { TradesTable } from "./components/trades-table/trades-table"
import { StreamInfoPromo } from "./components/stream-info-promo/stream-info-promo"
import { StreamStatsPromo } from "./components/stream-stats-promo/stream-stats-promo"
import { StreamChartProfit } from "./components/stream-chart-profit/stream-chart-profit"
import { StreamPiechartTrades } from "./components/stream-piechart-trades/stream-piechart-trades"
import { StreamAverageTradeChart } from "./components/stream-average-trade-chart/stream-average-trade-chart"
import { SubscriptionDialog } from "./components/subscription-dialog/subscription-dialog"
import { SignIn } from "./components/sign-in/sign-in"
import { PublisherStream } from "./components/publisher-stream/publisher-stream"
import { StreamNewDialog } from "./components/stream-new-dialog/stream-new-dialog"
import { StreamPublisherRow } from "./components/stream-publisher-row/stream-publisher-row"
import { PublisherApikeyDialog } from "./components/publisher-apikey-dialog/publisher-apikey-dialog"
import { SubscriptionPriceDialog } from "./components/publisher-sub-price-dialog/publisher-sub-price-dialog"
import { PublisherMirrorDialog } from "./components/publisher-mirror-dialog/publisher-mirror-dialog"
import { StreamListItem } from "./components/stream-list-item/stream-list-item"
import { TopNav } from "./components/top-nav/top-nav"


// services
import { TbFront } from "./services/tb-front/tb-front"
import { BitcoinaverageApi } from "./services/bitcoinaverage-api/bitcoinaverage-api"
import { BitfinexSocket } from "./services/bitfinex-socket/bitfinex-socket"

module tradersbitCom {
  "use strict"

  angular.module("tradersbitCom", [
    "ngSanitize",
    "ui.router",
    "ngMaterial",
    "highcharts-ng",
    "vcRecaptcha",
    "auth0",
    "angular-storage",
    "angular-jwt",
    "ngWebSocket",
    "oc.lazyLoad",
    "ngOnload"])

    .constant("_", (window as any)._)
    .constant("highcharts", (window as any).Highcharts)

    .config(config)
    .config(routerConfig)
    .run(runBlock)

    // top-components
    .component("tbHome", new HomeView())
    .component("tbStreams", new StreamsView())
    .component("tbStream", new StreamView())
    .component("tbPublish", new PublishView())
    .component("tbPublishDash", new PublishDashView())
    .component("tbAbout", new AboutView())
    .component("tbCompetition", new CompetitionView())

    // components
    .component("tbSideNavLayout", new SideNavLayout())
    .component("tbStreamsTable", new TbStreamsTable())
    .component("tbInfoTable", new InfoTable())
    .component("tbTradesTable", new TradesTable())
    .component("tbStreamInfoPromo", new StreamInfoPromo())
    .component("tbStreamStatsPromo", new StreamStatsPromo())
    .component("tbStreamChartProfit", new StreamChartProfit())
    .component("tbStreamPiechartTrades", new StreamPiechartTrades())
    .component("tbStreamAverageTradeChart", new StreamAverageTradeChart())
    .component("tbSubscriptionDialog", new SubscriptionDialog())
    .component("tbSignIn", new SignIn())
    .component("tbPublisherStream", new PublisherStream())
    .component("tbStreamNewDialog", new StreamNewDialog())
    .component("tbStreamPublisherRow", new StreamPublisherRow())
    .component("tbPublisherApikeyDialog", new PublisherApikeyDialog())
    .component("tbSubscriptionPriceDialog", new SubscriptionPriceDialog())
    .component("tbPublisherMirrorDialog", new PublisherMirrorDialog())
    .component("tbStreamListItem", new StreamListItem())
    .component("tbTopNav", new TopNav())

    // services
    .service("tbFront", TbFront)
    .service("bitcoinaverageApi", BitcoinaverageApi)
    .service("bitfinexSocket", BitfinexSocket)
}
