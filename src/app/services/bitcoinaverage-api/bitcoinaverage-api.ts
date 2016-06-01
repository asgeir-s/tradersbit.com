/** @ngInject */
export class BitcoinaverageApi {
  updated: number
  updateIntervall: number = 15000
  rate: number = 0
  constructor(private $http: ng.IHttpService, private $q: ng.IQService) { }

  getPrice(): ng.IPromise<number> {
    const timeNow = new Date().getTime()
    return this.$q((resolve, reject) => {
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