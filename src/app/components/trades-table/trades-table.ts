export class TradesTable implements ng.IComponentOptions {
  bindings: any
  templateUrl: string

  constructor() {
    this.bindings = { inTrades: "<" }
    this.templateUrl = "app/components/trades-table/trades-table.html"
  }
}