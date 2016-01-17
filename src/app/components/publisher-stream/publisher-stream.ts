import { PublisherStream, Stream } from '../../../app/typings/types';
import { Signal } from '../../typings/types'
import { AuthApi } from '../../services/auth-api/auth-api'
import { BitfinexSocket } from '../../services/bitfinex-socket/bitfinex-socket'

/** @ngInject */
export function tbPublisherStream(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/components/publisher-stream/publisher-stream.html',
    bindToController: {
      inStream: '='
    },
    controller: TbPublisherStreamCtrl,
    controllerAs: 'ctrl'
  };

}

/** @ngInject */
export class TbPublisherStreamCtrl {
  inStream: PublisherStream;
  unrealizedPL: number;
  waitingForSignalBack = false;
  btcRate: number;

  constructor(public $location: any, private $mdMedia: angular.material.IMedia, private $mdDialog: any,
    private $q: angular.IQService, private $http: angular.IHttpService, private $state: angular.ui.IStateService,
    private authApi: AuthApi, private _: _.LoDashStatic, private $mdToast: any, bitfinexSocket: BitfinexSocket) {

    if (this.inStream.exchange === 'bitfinex') {
      this.computeUnrealizedPL(this.inStream.lastSignal, bitfinexSocket.lastRate);
      this.btcRate = bitfinexSocket.lastRate;

      bitfinexSocket.dataStream.onMessage((message: any) => {
        let tick: Array<number> = JSON.parse(message.data)
        if (tick.length > 8) {
          this.computeUnrealizedPL(this.inStream.lastSignal, tick[7]);
          this.btcRate = tick[7];
        }
      });
    }
    else {
      console.log('WARNING: dont have access to price data for ' + this.inStream.exchange);
    }
    
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

  computeUnrealizedPL(lastSignal: Signal, rate: number) {
    if (lastSignal.signal === 0) {
      this.unrealizedPL = 0;
    }
    else if (lastSignal.signal === 1) {
      this.unrealizedPL =  ((100/lastSignal.price)*(rate - lastSignal.price)) - 0.2;
    }
    else if (lastSignal.signal === -1) {
      this.unrealizedPL = ((100/lastSignal.price)*(lastSignal.price - rate)) - 0.2;
    }
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
        this.computeUnrealizedPL(this.inStream.lastSignal, this.btcRate);
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
