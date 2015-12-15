import { Stream, Signal, Subscription, CoinbaseEmbedCode } from '../../../app/typings/types';

export class AuthApi {
  streams: Array<Stream>;
  signalsMap: { [streamId: string]: Array<Signal>; } = {};
  
  /** @ngInject */
  constructor(private store: any, private $http: angular.IHttpService, private $q: angular.IQService, private _: _.LoDashStatic, private apigClient: any) {
   }
  
  getMyStreams(): angular.IPromise<Array<Stream>> {
    let deferred: angular.IDeferred<Array<Stream>> = this.$q.defer();

    if (typeof this.streams !== 'undefined') {
      // the variable is defined
      console.log('PublicApiService - gets already fatched streams.');
      deferred.resolve(this.streams);
    }
    else {
      console.log('PublicApiService - fatches streams');
   
      this.apigClient.streamsGet({"x-auth-token": this.store.get('token')},{},{})
      .then( (res: SuccessRespondse<Array<Stream>>) => {
        //This is where you would put a success callback
          this.streams = res.data;
          deferred.resolve(this.streams);
      })
      .catch( (err: any) => {
        //This is where you would put an error callback
        console.log('error: ' + err);
        deferred.reject('PublicApiService - Could not get streams. Error: ' + err);
      });
      
    }
    return deferred.promise;
  }
    
}


interface SuccessRespondse<T>{
  data: T
}