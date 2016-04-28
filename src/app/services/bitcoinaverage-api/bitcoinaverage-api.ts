/** @ngInject */
export class BitcoinaverageApi {

  constructor(private $http: angular.IHttpService) { }

  getPrice() {
    return this.$http.get("https://api.bitcoinaverage.com/ticker/USD/last")
      .then((response: angular.IHttpPromiseCallbackArg<number>) => {
        return response.data
      })
  }
}