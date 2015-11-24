 /** @ngInject */
export class BitcoinaverageApi {

    private apiURL: string = "https://api.bitcoinaverage.com/ticker/USD/last";

    constructor(private $http: angular.IHttpService) {}

    getPrice() {
      return this.$http.get(this.apiURL, {
      })
        .then((response: any) => {
          return response.data;
        });
    }

  }