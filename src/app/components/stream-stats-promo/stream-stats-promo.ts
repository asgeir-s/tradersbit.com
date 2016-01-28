import { Stream} from '../../../app/typings/types';

/** @ngInject */
export function tbStreamStatsPromo(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/stream-stats-promo/stream-stats-promo.html',
    bindToController: {
      inStream: '='
    },
    controller: TbStreamStatsPromeCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbStreamStatsPromeCtrl {
  inStream: Stream;
  netProfit: number;
  averageTrade: number;
  partProfitableTrads: number;
  profitFactor: number;

  constructor() {
    this.netProfit = this.compNetProfit(this.inStream);
    this.averageTrade = this.compAverageTrade(this.inStream);
    this.partProfitableTrads = this.compPartProfitableTrads(this.inStream);
    this.profitFactor = this.compProfitFactor(this.inStream);
  }

  compAverageMonthlyProfit(stream: Stream): number {
    let allProfit = stream.stats.allTimeValueIncl - 1;
    let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
    let secInMonth = 86400000 * 30;
    return (((allProfit / duration)) * secInMonth) * 100;
  }

  compNetProfit(stream: Stream): number {
    return ((stream.stats.allTimeValueIncl - 1) * 100);
  }

  compAverageTrade(stream: Stream): number {
    let allProfit = stream.stats.allTimeValueIncl - 1;
    return (allProfit / stream.stats.numberOfClosedTrades) * 100;
  }

  compPartProfitableTrads(stream: Stream): number {
    return (stream.stats.numberOfProfitableTrades / stream.stats.numberOfClosedTrades) * 100
  }

  compProfitFactor(stream: Stream): number {
    return stream.stats.accumulatedProfit / stream.stats.accumulatedLoss;
  }
}
