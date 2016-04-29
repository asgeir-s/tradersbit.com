import { Stream } from "../../../app/typings/types"

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

    logoUrl(): string {
        if (this.inStream.exchange === "bitstamp") {
            return "assets/images/bitstamp_logo.png"
        }
        else if (this.inStream.exchange === "bitfinex") {
            return "assets/images/bitfinex_logo.png"
        }
        else {
            return ""
        }
    }
}