import { StreamsAttribute, Stream} from '../../../app/typings/types';

export class PublicApiService {
  private static BASE_URL: string = "https://dc3r5gsogb.execute-api.us-west-2.amazonaws.com/dev";
  streams: any;
  

  /** @ngInject */
  constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
  }

  allStreams(): angular.IPromise<Array<Stream>> {
    var deferred = this.$q.defer();
    if (this.streams) {
      console.log('PublicApiService - get already fatched streams: ' + this.streams);
      deferred.resolve(this.streams);
    }
    else {
      console.log('PublicApiService - fatches streams');
      this.$http.get(PublicApiService.BASE_URL + '/streams').then(
        (res) => {
          this.streams = res.data;
          deferred.resolve(this.streams);
        },
        (err) => {
          console.error('PublicApiService - Could not get streams. Error: ' + err);
          deferred.reject('PublicApiService - Could not get streams. Error: ' + err);
        })
    }
    return deferred.promise;
  }
}
