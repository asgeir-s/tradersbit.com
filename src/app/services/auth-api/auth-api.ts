import { NewStream, Stream, Signal } from '../../../app/typings/types';
import { PublicApi } from '../../services/public-api/public-api'

export class AuthApi {
  streamIds: Array<string>;
  streams: Array<Stream>;
  signalsMap: { [streamId: string]: Array<Signal>; } = {};
  private apigClient: any;
  
  /** @ngInject */
  constructor(private auth: any, private store: any, private $q: angular.IQService, private _: _.LoDashStatic, private $window: any, private $state: ng.ui.IStateService, private publicApi: PublicApi, private jwtHelper: any) {
    try {
      let token = this.store.get('token');
      if (typeof token !== 'undefined') {
        this.streamIds = this.getStreamIdsFromJWT(this.jwtHelper.decodeToken(token));
      }
    }
    catch (err) { }
  }

  signIn(profile: string, token: string): angular.IPromise<boolean> {
    this.streamIds = this.getStreamIdsFromJWT(this.jwtHelper.decodeToken(token));

    let deferred: angular.IDeferred<boolean> = this.$q.defer();

    this.store.set('profile', profile);
    this.store.set('token', token);

    console.log('JWT:' + token);


    var options = {
      "id_token": token,
      "role": "arn:aws:iam::525932482084:role/auth0-api-role",
      "principal": "arn:aws:iam::525932482084:saml-provider/auth0"
    }

    this.auth.getToken(options)
      .then(
      (delegation: any) => {
        this.store.set('awstoken', delegation.Credentials);  // add to local storage
        this.createApiClient(delegation.Credentials)
        deferred.resolve(true);
      },
      (err: any) => {
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
      region: 'us-east-1' // set to your region
    });
  }

  signOut() {
    this.auth.signout();
    this.store.remove('profile');
    this.store.remove('token');
    this.store.remove('awstoken');
    this.signalsMap = {};
    this.streams = undefined;
    this.streamIds = undefined;
    this.apigClient = undefined;
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
      this.apigClient.streamsMeGet({ "x-auth-token": this.store.get('token') }, {}, {})
        .then((res: any) => {
          // this is where you would put a success callback
                    
          if (typeof res.data === 'undefined') {
            this.streams = [];
          }
          else if (JSON.stringify(res.data).indexOf("could not authenticate") > -1) {
            this.streams = [];
          }
          else {
            this.streams = res.data;
          }

          deferred.resolve(this.streams);
        })
        .catch((err: any) => {
          // this is where you would put an error callback
          this.signOut();
          console.log('error: ' + err);
          deferred.reject('AuthApi - Could not get streams. Error: ' + err);
        });

    }
    return deferred.promise;
  }

  postSignal(streamId: string, signal: number): angular.IPromise<Array<Signal>> {
    delete this.signalsMap[streamId];
    delete this.publicApi.signalsMap[streamId];
    _.remove(this.publicApi.streams, (stream: Stream) => stream.id === streamId);
    this.publicApi.streamsDirty = true;

    let deferred: angular.IDeferred<Array<Signal>> = this.$q.defer();

    console.log('AuthApi - post signal');
    this.apigClient.streamsStreamIdSignalPost({ "x-auth-token": this.store.get('token'), "streamId": streamId }, {
      "signal": signal
    }, {})
      .then((res: SuccessRespondse<Array<Signal>>) => {
        // this is where you would put a success callback
        console.log("signal res: " + JSON.stringify(res));
        deferred.resolve(res.data);
      })
      .catch((err: any) => {
        // this is where you would put an error callback
        this.signOut();
        console.log('signal error: ' + JSON.stringify(err));
        deferred.reject('AuthApi - Could not post signal. Error: ' + err);
      });
    return deferred.promise;
  }

  postStream(newStream: NewStream): angular.IPromise<string> {
    this.streams = undefined;
    this.publicApi.streams = undefined;
    let deferred: angular.IDeferred<string> = this.$q.defer();

    console.log('AuthApi - post new stream');
    this.apigClient.streamsPost({ "x-auth-token": this.store.get('token') }, newStream, {})
      .then((res: SuccessRespondse<any>) => {
        // this is where you would put a success callback
        if (typeof res.data.jwt !== 'undefined') {
          console.log("new stream res: " + JSON.stringify(res));
          this.store.set('token', res.data.jwt);
          this.streamIds = this.getStreamIdsFromJWT(this.jwtHelper.decodeToken(res.data.jwt));
          deferred.resolve(res.data.streamId);
        }
        else {
          console.log("faild to add stream. Error: " + JSON.stringify(res));
          deferred.reject(res.data);
        }

      })
      .catch((err: any) => {
        // this is where you would put an error callback
        this.signOut();
        console.log('stream error: ' + err);
        deferred.reject('AuthApi - Could not post new stream. Error: ' + err);
      });
    return deferred.promise;
  }

  getApiKey(streamId: string): angular.IPromise<string> {

    let deferred: angular.IDeferred<string> = this.$q.defer();
    console.log('AuthApi - get apiKey');

    this.apigClient.streamsStreamIdApikeyGet({ 
      "x-auth-token": this.store.get('token'), 
      "streamId": streamId 
    }, {}, {})
      .then((res: SuccessRespondse<{ "apiKey": string }>) => {
        // this is where you would put a success callback
        console.log("apikey: " + JSON.stringify(res));
        deferred.resolve(res.data.apiKey);
      })
      .catch((err: any) => {
        // this is where you would put an error callback
        this.signOut();
        console.log('get apiKey error: ' + JSON.stringify(err));
        deferred.reject('AuthApi - Could not get new api key. Error: ' + err);
      });
    return deferred.promise;
  }

  isStream(value: string) {
    let start = 'stream-';
    return value.substring(0, start.length) === start;
  }

  getStreamIdsFromJWT(valideUser: any): Array<string> {
    if (typeof valideUser.app_metadata === "undefined") {
      return [];
    }
    else {
      let streamKeys = Object.keys(valideUser.app_metadata).filter(this.isStream);
      return streamKeys.map((key: string) => valideUser.app_metadata[key]);
    }
  }
}

interface SuccessRespondse<T> {
  data: T
}