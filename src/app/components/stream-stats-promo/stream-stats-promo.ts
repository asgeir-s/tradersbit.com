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
  averageMonthlyProfit: number;
  averageTrade: number;
  partProfitableTrads: number;
  profitFactor: number;

  constructor() {
    this.averageMonthlyProfit = this.compAverageMonthlyProfit(this.inStream)
    //this.averageTrade = arr
      
    }
    
  compAverageMonthlyProfit(stream: Stream): number {
    let allProfit = stream.stats.allTimeValueIncl - 1;
    let duration = stream.stats.timeOfLastSignal - stream.stats.timeOfFirstSignal;
    let secInMonth = 86400000 * 30;
    return (((allProfit / duration)) * secInMonth) * 100;
  }
}
