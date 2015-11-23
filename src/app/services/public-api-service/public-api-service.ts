import { StreamsAttribute, Stream} from '../../../app/typings/types';

export class PublicApiService {
  private static BASE_URL: string = "https://dc3r5gsogb.execute-api.us-west-2.amazonaws.com/dev";
  private static streams: any;


  /** @ngInject */
  constructor(private $http: angular.IHttpService, public rx: any) {
    console.log('Const run');
    PublicApiService.streams = this.rx.Observable
        .fromPromise(this.$http.get(PublicApiService.BASE_URL + '/streams'))
        .map((response) => { return response.data; });

    PublicApiService.streams.subscribe((item) => console.log('got items from landa: ' + item));

  }

  allStreamsObs(): any {
    return PublicApiService.streams;
  }
}
