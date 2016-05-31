import { Stream } from "../../../app/typings/types.d.ts"

export class StreamInfoPromo implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<",
      inBtcRate: "<"
    }
    this.controller = StreamInfoPromeCtrl
    this.templateUrl = "app/components/stream-info-promo/stream-info-promo.html"
  }
}

class StreamInfoPromeCtrl {
    inStream: Stream
    inBtcRate: number
}