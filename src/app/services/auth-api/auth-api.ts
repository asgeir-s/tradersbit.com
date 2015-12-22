import { NewStream, Stream, Signal, Subscription, CoinbaseEmbedCode } from '../../../app/typings/types';
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
        this.signalsMap = {};
        this.streams = undefined;
        this.streamIds = undefined;
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

    postSignal(streamId: string, signal: number): angular.IPromise<Array<Signal>> {
        delete this.signalsMap[streamId];
        delete this.publicApi.signalsMap[streamId];
        let deferred: angular.IDeferred<Array<Signal>> = this.$q.defer();

        console.log('AuthApi - post signal');
        this.apigClient.streamSignalPost({ "x-auth-token": this.store.get('token') }, {
            "streamId": streamId,
            "signal": signal
        }, {})
            .then((res: SuccessRespondse<Array<Signal>>) => {
                //This is where you would put a success callback
                console.log("signal res: " + JSON.stringify(res));
                deferred.resolve(res.data);
            })
            .catch((err: any) => {
                //This is where you would put an error callback
                console.log('signal error: ' + err);
                deferred.reject('AuthApi - Could not post signal. Error: ' + err);
            });
        return deferred.promise;
    }

    postStream(newStream: NewStream): angular.IPromise<string> {
        this.streams = undefined;
        let deferred: angular.IDeferred<string> = this.$q.defer();

        console.log('AuthApi - post new stream');
        this.apigClient.streamsPost({ "x-auth-token": this.store.get('token') }, newStream, {})
            .then((res: SuccessRespondse<any>) => {
                //This is where you would put a success callback
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
                //This is where you would put an error callback
                console.log('stream error: ' + err);
                deferred.reject('AuthApi - Could not post new stream. Error: ' + err);
            });
        return deferred.promise;
    }

    isStream(value: string) {
        let start = 'stream-';
        return value.substring(0, start.length) === start;
    }

    getStreamIdsFromJWT(valideUser: any): Array<string> {
        let streamKeys = Object.keys(valideUser.app_metadata).filter(this.isStream);
        console.log('<<<<<<<<<<<<<ides from jwt: ' + JSON.stringify(streamKeys.map((key: string) => valideUser.app_metadata[key])));
        return streamKeys.map((key: string) => valideUser.app_metadata[key]);
    }

}

interface SuccessRespondse<T> {
    data: T
}