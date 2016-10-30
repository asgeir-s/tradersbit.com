import { Promise } from 'es6-promise';

/** @ngInject */
export class BitcoinaverageApi {
  updated: number
  updateIntervall: number = 600000
  rate: number = 0
  constructor(private $http: ng.IHttpService) { }

  getPrice() {
    const timeNow = new Date().getTime()
    return new Promise((resolve, reject) => {
      if (timeNow <= (this.updated + this.updateIntervall)) {
        resolve(this.rate)
      }
      else {
        return this.$http.get("https://api.bitcoinaverage.com/ticker/USD/last")
          .then((response: ng.IHttpPromiseCallbackArg<number>) => {
            this.updated = timeNow
            this.rate = response.data
            resolve(this.rate)
          })
      }

    })
  }
}