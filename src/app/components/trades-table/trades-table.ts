/** @ngInject */
export function tbTradesTable(): angular.IDirective {

  return {
    restrict: "E",
    scope: {},
    templateUrl: "app/components/trades-table/trades-table.html",
    bindToController: {
      inTrades: "="
    },
    controller: TbTradesTableCtrl,
    controllerAs: "ctrl"
  }
}

/** @ngInject */
export class TbTradesTableCtrl { }