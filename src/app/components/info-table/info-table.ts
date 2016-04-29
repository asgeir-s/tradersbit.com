import { Stream } from "../../../app/typings/types"

export class InfoTable implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStream: "<",
      inAttributes: "<",
      inName: "@"
    }
    this.controller = InfoTableCtrl
    this.templateUrl = "app/components/info-table/info-table.html"
  }
}

class InfoTableCtrl {
  inStream: Stream
  inAttributes: number
  inName: String
}