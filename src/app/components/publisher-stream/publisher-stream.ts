import { PublisherStream, Stream } from '../../../app/typings/types';
import { Signal } from '../../typings/types'
import { AuthApi } from '../../services/auth-api/auth-api'

/** @ngInject */
export function tbPublisherStream(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/publisher-stream/publisher-stream.html',
    bindToController: {
      inStream: '=',
      inBtcRate: '&'
    },
    controller: TbPublisherStreamCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbPublisherStreamCtrl {
  inStream: PublisherStream;
  inBtcRate: number;
  unrealizedPL: number;
  waitingForSignalBack = false;

  constructor(private $mdMedia: angular.material.IMedia, private $mdDialog: any, private $q: angular.IQService, private $http: angular.IHttpService, private $state: angular.ui.IStateService, private authApi: AuthApi, private _: _.LoDashStatic, private $mdToast: any) {
    console.log('inStream: ' + JSON.stringify(this.inStream));
    this.computeUnrealizedPL(this.inStream.lastSignal, this.inStream.exchange)
  }

  openApiKeyDialog(ev: any) {
    this.$mdDialog.show({
      template: '<md-dialog><tb-publisher-apikey-dialog in-stream-id="ctrl.stream.id"></tb-publisher-apikey-dialog></md-dialog>',
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: this.$mdMedia('xs'),
      locals: {
        stream: this.inStream,

      },
      controller: 
      /** @ngInject */
      class DialogCtrl2 {
        constructor(public stream: Stream) {
        }
      },
      controllerAs: 'ctrl'
    })
  };


  logoUrl(): string {
    if (this.inStream.exchange === 'bitstamp') {
      return 'assets/images/bitstamp_logo.png'
    }
    else if (this.inStream.exchange === 'bitfinex') {
      return 'assets/images/bitfinex_logo.png'
    }
    else {
      return '';
    }
  }

  positionString(): string {
    if (this.inStream.status === -1) {
      return 'SHORT';
    }
    else if (this.inStream.status === 0) {
      return 'CLOSE';
    }
    else if (this.inStream.status === 1) {
      return 'LONG';
    }
  }

  computeUnrealizedPL(lastSignal: Signal, exchange: string) {
    this.getLastRate(this.inStream.exchange)
      .then((rate: number) => {
        if (lastSignal.signal === 0) {
          this.unrealizedPL = 0;
        }
        else if (lastSignal.signal === 1) {
          this.unrealizedPL = rate - lastSignal.price - 0.2;
        }
        else if (lastSignal.signal === -1) {
          this.unrealizedPL = (lastSignal.price - rate) - 0.2;
        }
      })

  }

  getLastRate(exchange: string) {
    return this.$http.get('https://api.bitcoinaverage.com/exchanges/USD').then(
      (res: angular.IHttpPromiseCallbackArg<any>) => {
        console.log('last rate at ' + exchange + ': ' + res.data[exchange].rates.last);
        return res.data[exchange].rates.last
      },
      (err: any) => {
        console.error('Could not get bitcoin/usd rate at ' + exchange + '. Error: ' + err);
      })
  }

  goToStream(streamID: string) {
    this.$state.go('stream', { 'streamId': streamID });
  }

  postSignal(streamId: string, signal: number) {
    this.waitingForSignalBack = true;
    this.authApi.postSignal(streamId, signal)
      .then((signals: Array<Signal>) => {
        this.inStream.lastSignal = _.max(signals, 'id');
        this.inStream.status = this.inStream.lastSignal.signal;
        this.computeUnrealizedPL(this.inStream.lastSignal, this.inStream.exchange);
        this.waitingForSignalBack = false;
        let text: string;
        if (signals.length === 1) {
          text = "New " + this.positionString() + " signal @ " + signals[0].price + "$. P/L: " + (signals[0].changeInclFee * 100).toFixed(2) + "%.";
        }
        else {
          text = "Position closed @ " + signals[0].price + "$. P/L: " + (signals[0].changeInclFee * 100).toFixed(2) + "%.\n New " + this.positionString() + " position opened.";
        }

        this.$mdToast.show(
          this.$mdToast.simple()
            .textContent(text)
            .position("bottom right")
            .hideDelay(10000)
        );


      })
  }
}
