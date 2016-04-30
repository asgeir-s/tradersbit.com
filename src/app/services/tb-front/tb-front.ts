import { NewStream, SubscriptionRequest, Stream, Signal } from "../../../app/typings/types"

export class TbFront {
  streamIds: Array<string>
  streams: Array<Stream>
  signalsMap: { [streamId: string]: Array<Signal> } = {}
  streamsDirty: boolean = false

  myStreamIds: Array<string>
  myStreams: Array<Stream>
  mySignalsMap: { [streamId: string]: Array<Signal> } = {}
  private privateApigClient: any
  private publicApigClient: any

  constructor(
    private auth: any,
    private store: any,
    private $q: angular.IQService,
    private _: _.LoDashStatic,
    private $window: any,
    private $state: ng.ui.IStateService,
    private jwtHelper: any,
    private $timeout: angular.ITimeoutService,
    private $mdToast: any) {
    "ngInject"
    this.publicApigClient = this.createApiClient()

    try {
      const awstoken = this.store.get("awstoken")
      this.privateApigClient = awstoken == null ? undefined : this.createApiClient(this.store.get("awstoken"))
      const token = this.store.get("token")

      if (typeof token !== "undefined") {
        const jwtDecoded = this.jwtHelper.decodeToken(token)
        this.setSignoutTimeout(jwtDecoded)
        this.myStreamIds = this.getStreamIdsFromJWT(jwtDecoded)
      }
    }
    catch (err) { }
  }

  setSignoutTimeout(jwtDecoded: any) {
    console.log("timeout: " + ((jwtDecoded.exp * 1000) - Date.now()) + "ms")
    this.$timeout(() => this.signOut("User session timeout"), ((jwtDecoded.exp * 1000) - Date.now()))
  }

  signIn(profile: string, token: string): angular.IPromise<boolean> {
    const jwtDecoded = this.jwtHelper.decodeToken(token)
    this.setSignoutTimeout(jwtDecoded)
    this.myStreamIds = this.getStreamIdsFromJWT(jwtDecoded)

    const deferred: angular.IDeferred<boolean> = this.$q.defer()

    this.store.set("profile", profile)
    this.store.set("token", token)

    const options = {
      "id_token": token,
      "role": "arn:aws:iam::525932482084:role/auth0-api-role",
      "principal": "arn:aws:iam::525932482084:saml-provider/auth0"
    }

    this.auth.getToken(options)
      .then((delegation: any) => {
        this.store.set("awstoken", delegation.Credentials)  // add to local storage
        this.privateApigClient = this.createApiClient(delegation.Credentials)
        deferred.resolve(true)
      },
      (err: any) => {
        console.log("failed to acquire delegation token", err)
        deferred.reject("failed to acquire delegation token")
      })
    return deferred.promise
  }

  createApiClient(awstoken?: any) {
    if (awstoken != null) {
      console.log("returns private ApiClient")
      return this.$window.apigClientFactory.newClient({
        accessKey: awstoken.AccessKeyId,
        secretKey: awstoken.SecretAccessKey,
        sessionToken: awstoken.SessionToken,
        region: "us-east-1" // set to your region
      })
    }
    else {
      return this.$window.apigClientFactory.newClient({
        region: "us-east-1" // set to your region
      })
    }

  }

  signOut(reason: string) {
    this.privateApigClient = undefined
    this.auth.signout()
    this.store.remove("profile")
    this.store.remove("token")
    this.store.remove("awstoken")
    this.mySignalsMap = {}
    this.myStreams = undefined
    this.myStreamIds = undefined
    console.log("auth-api: signed out")
    this.$state.reload()
    if (reason !== "") {
      this.$mdToast
      console.log("reason: " + reason)
      this.$mdToast.show(
        this.$mdToast.simple()
          .textContent(reason)
          .position("bottom right")
          .hideDelay(3000)
      )

    }
  }

  isAuthentificated(): boolean {
    console.log("isAuthentificated: " + this.auth.isAuthenticated)
    return this.auth.isAuthenticated
  }

  getMyStreams(): angular.IPromise<Array<Stream>> {
    let deferred: angular.IDeferred<Array<Stream>> = this.$q.defer()

    if (typeof this.myStreams !== "undefined") {
      // the letiable is defined
      console.log("Tb-Font - gets already fatched streams.")
      deferred.resolve(this.myStreams)
    }
    else {
      console.log("Tb-Font - fatches streams")
      this.privateApigClient.meStreamsGet({ "x-auth-token": this.store.get("token") }, {}, {})
        .then((streams: any) => {

          if (typeof streams.data === "undefined") {
            this.myStreams = []
          }
          else if (JSON.stringify(streams.data).indexOf("could not authenticate") > -1) {
            this.myStreams = []
          }
          else {
            this.myStreams = streams.data
          }

          deferred.resolve(this.myStreams)
        })
        .catch((err: any) => {
          this.signOut("Could not connect")
          console.log(err)
          deferred.reject("Tb-Font - Could not get streams. Error: " + err)
        })

    }
    return deferred.promise
  }

  postSignal(streamId: string, signal: number): angular.IPromise<Array<Signal>> {
    delete this.mySignalsMap[streamId]
    _.remove(this.streams, (stream: Stream) => stream.id === streamId)
    this.streamsDirty = true

    let deferred: angular.IDeferred<Array<Signal>> = this.$q.defer()

    console.log("Tb-Font - post signal")
    this.privateApigClient.meStreamsStreamIdSignalPost({
      "x-auth-token": this.store.get("token"),
      "streamId": streamId
    }, { "signal": signal }, {})
      .then((res: SuccessRespondse<Array<Signal>>) => deferred.resolve(res.data))
      .catch((err: any) => {
        this.signOut("Could not connect")
        console.log("signal error: " + JSON.stringify(err))
        deferred.reject("Tb-Font - Could not post signal. Error: " + err)
      })
    return deferred.promise
  }

  updateSubscriptionPrice(streamId: string, newPriceUsd: number): angular.IPromise<string> {
    _.remove(this.streams, (stream: Stream) => stream.id === streamId)
    this.streamsDirty = true

    let deferred: angular.IDeferred<string> = this.$q.defer()

    console.log("Tb-Font - update subscription price")
    this.privateApigClient.meStreamsStreamIdSubscriptionPricePut({
      "x-auth-token": this.store.get("token"),
      "streamId": streamId
    }, { "priceUsd": newPriceUsd }, {})
      .then((res: SuccessRespondse<string>) => deferred.resolve(res.data))
      .catch((err: any) => {
        this.signOut("Could not connect")
        console.log("update subscription price error: " + JSON.stringify(err))
        deferred.reject("Tb-Font - Could not update subscription price. Error: " + err)
      })
    return deferred.promise
  }

  postStream(newStream: NewStream): angular.IPromise<string> {
    this.myStreams = undefined
    this.streams = undefined
    let deferred: angular.IDeferred<string> = this.$q.defer()

    console.log("Tb-Font - post new stream")
    this.privateApigClient.meStreamsPost({ "x-auth-token": this.store.get("token") }, newStream, {})
      .then((res: SuccessRespondse<any>) => {
        // this is where you would put a success callback
        if (typeof res.data.jwt !== "undefined") {
          console.log("new stream res: " + JSON.stringify(res))
          this.store.set("token", res.data.jwt)
          this.myStreamIds = this.getStreamIdsFromJWT(this.jwtHelper.decodeToken(res.data.jwt))
          deferred.resolve(res.data.streamId)
        }
        else {
          console.log("faild to add stream. Error: " + JSON.stringify(res))
          deferred.reject(res.data)
        }

      })
      .catch((err: any) => {
        // this is where you would put an error callback
        this.signOut("Could not connect")
        console.log("stream error: " + err)
        deferred.reject("Tb-Font - Could not post new stream. Error: " + err)
      })
    return deferred.promise
  }

  getApiKey(streamId: string): angular.IPromise<string> {

    const deferred: angular.IDeferred<string> = this.$q.defer()
    console.log("Tb-Font - get apiKey")
    console.log("x-auth-token: " + this.store.get("token"))
    console.log("streamId: " + streamId)

    this.privateApigClient.meStreamsStreamIdApikeyGet({
      "x-auth-token": this.store.get("token"),
      "streamId": streamId
    }, {}, {})
      .then((res: SuccessRespondse<{ "apiKey": string }>) => deferred.resolve(res.data.apiKey))
      .catch((err: any) => {
        this.signOut("Could not connect")
        console.log("get apiKey error: " + JSON.stringify(err))
        deferred.reject("Tb-Font - Could not get new api key. Error: " + err)
      })
    return deferred.promise
  }

  isStream(value: string) {
    let start = "stream-"
    return value.substring(0, start.length) === start
  }

  getStreamIdsFromJWT(valideUser: any): Array<string> {
    if (typeof valideUser.app_metadata === "undefined") {
      return []
    }
    else {
      let streamKeys = Object.keys(valideUser.app_metadata).filter(this.isStream)
      return streamKeys.map((key: string) => valideUser.app_metadata[key])
    }
  }

  /** public */

  publicGetAllStreams(): angular.IPromise<Array<Stream>> {
    const deferred: angular.IDeferred<Array<Stream>> = this.$q.defer()

    if (this.streams == null || this.streamsDirty) {
      this.streamsDirty = false
      console.log("PublicApiService - fatches streams")
      this.publicApigClient.streamsGet({}, {}, {})
        .then((res: SuccessRespondse<Array<Stream>>) => {
          this.streams = res.data
          deferred.resolve(this.streams)
        })
        .catch((err: any) => {
          this.signOut("Could not connect")
          console.log("error " + JSON.stringify(err))
          deferred.reject("error " + JSON.stringify(err))
        })
    }
    else {
      // the variable is defined
      console.log("PublicApiService - gets already fatched streams.")
      deferred.resolve(this.streams)
    }
    return deferred.promise
  }

  /**     this.apigClient.streamsStreamIdGet({ "streamId": streamId }, {}, {}) */
  publicGetStream(streamId: string): angular.IPromise<Stream> {
    const deferred: angular.IDeferred<Stream> = this.$q.defer()
    if (typeof this.streams !== "undefined") {
      // the variable is defined
      console.log("PublicApiService - gets already fatched stream.")
      const cachedStream = _.find(this.streams, (stream: Stream) => stream.id === streamId)
      if (typeof cachedStream === "undefined") {
        console.log("PublicApiService - the stream was not in already fatched streams. Get single stream.")

        this.publicApigClient.streamsStreamIdGet({ "streamId": streamId }, {}, {})
          .then((res: SuccessRespondse<Stream>) => {
            // add the stream to the cash
            this.streams.push(res.data)
            // resolve
            deferred.resolve(res.data)
          },
          (err: any) => {
            console.error("PublicApiService - Could not get stream. Error: " + err)
            deferred.reject("PublicApiService - Could not get stream. Error: " + err)
          })
      }
      else {
        deferred.resolve(cachedStream)
      }
    }
    else {
      this.publicGetAllStreams().then((streams: Array<Stream>) => {
        deferred.resolve(_.find(this.streams, (stream: Stream) => stream.id === streamId))
      })
    }
    return deferred.promise
  }

  publicGetSignals(streamId: string): angular.IPromise<Array<Signal>> {
    const deferred: angular.IDeferred<Array<Signal>> = this.$q.defer()

    if (typeof this.signalsMap[streamId] !== "undefined") {
      // the variable is defined
      console.log("PublicApiService - gets already fatched signals.")
      deferred.resolve(this.signalsMap[streamId])
    }
    else {
      console.log("PublicApiService - fatches signals")
      this.publicApigClient.streamsStreamIdSignalsGet({ "streamId": streamId }, {}, {})
        .then((res: SuccessRespondse<Array<Signal>>) => {
          this.signalsMap[streamId] = res.data
          deferred.resolve(this.signalsMap[streamId])
        },
        (err: any) => {
          console.error("PublicApiService - Could not get signals. Error: " + err)
          deferred.reject("PublicApiService - Could not get signals. Error: " + err)
        })
    }

    return deferred.promise
  }

  publicSubscribeReturnPaymentCode(reCaptcha: string, subscription: SubscriptionRequest): angular.IPromise<string> {
    const deferred: angular.IDeferred<string> = this.$q.defer()

    this.publicApigClient.subscribePost({ "x-re-captcha": reCaptcha }, subscription, {})
      .then((res: SuccessRespondse<any>) => deferred.resolve(res.data.paymentCode))
      .catch((err: any) => {
        this.signOut("Could not connect")
        console.log("error " + JSON.stringify(err))
        deferred.reject("error " + JSON.stringify(err))
      })
    return deferred.promise
  }

}

interface SuccessRespondse<T> {
  data: T
}