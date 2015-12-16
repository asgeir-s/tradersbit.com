import { Stream, Signal, Subscription, CoinbaseEmbedCode } from '../../../app/typings/types';

export class AuthApi {
  streams: Array<Stream>;
  signalsMap: { [streamId: string]: Array<Signal>; } = {};
  private apigClient: any;
  
  /** @ngInject */
  constructor(private auth: any, private store: any, private $q: angular.IQService, private _: _.LoDashStatic, private $window: any, private $state: ng.ui.IStateService) { }

  signIn(profile: string, token: string): angular.IPromise<boolean> {
    let deferred: angular.IDeferred<boolean> = this.$q.defer();

    this.store.set('profile', profile);
    this.store.set('token', token);

    var options = {
      "id_token": token,
      "role": "arn:aws:iam::525932482084:role/auth0-api-role",
      "principal": "arn:aws:iam::525932482084:saml-provider/auth0"
    }

    this.auth.getToken(options)
      .then(
      (delegation) => {
        this.store.set('awstoken', delegation.Credentials);  //add to local storage
        this.createApiClient(delegation.Credentials)
        deferred.resolve(true);
      },
      (err) => {
        console.log('failed to acquire delegation token', err);
        deferred.reject('failed to acquire delegation token')
      });
    return deferred.promise;
  };

  createApiClient(awstoken: any) {
    this.apigClient = this.$window.apigClientFactory.newClient({
      accessKey: awstoken.AccessKeyId,
      secretKey: awstoken.SecretAccessKey,
      sessionToken: awstoken.SessionToken,
      region: 'us-west-2' // Set to your region
    });
  }

  signOut() {
    this.auth.signout();
    this.store.remove('profile');
    this.store.remove('token');
    this.store.remove('awstoken');
    console.log("auth-api: signed out");
    this.$state.go('home');
  };

  isAuthentificated(): boolean {
    console.log('isAuthentificated: ' + this.auth.isAuthenticated);
    return this.auth.isAuthenticated;
  }

  getMyStreams(): angular.IPromise<Array<Stream>> {
    let deferred: angular.IDeferred<Array<Stream>> = this.$q.defer();

    if (typeof this.streams !== 'undefined') {
      // the variable is defined
      console.log('AuthApi - gets already fatched streams.');
      deferred.resolve(this.streams);
    }
    else {
      console.log('AuthApi - fatches streams');
      this.apigClient.streamsGet({ "x-auth-token": this.store.get('token') }, {}, {})
        .then((res: SuccessRespondse<Array<Stream>>) => {
          //This is where you would put a success callback
          this.streams = res.data;
          deferred.resolve(this.streams);
        })
        .catch((err: any) => {
          //This is where you would put an error callback
          console.log('error: ' + err);
          deferred.reject('AuthApi - Could not get streams. Error: ' + err);
        });

    }
    return deferred.promise;
  }

}

interface SuccessRespondse<T> {
  data: T
}