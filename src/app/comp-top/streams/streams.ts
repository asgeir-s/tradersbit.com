import { PublicApi } from '../../services/public-api/public-api'
import { Stream, StreamsAttribute } from '../../typings/types'
import { StreamAttributes } from '../../util/stream-attributes'

/** @ngInject */
export function tbStreams(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/streams/streams.html',
    controller: tbStreamsCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inStreams: '&'
    },
  };

}

/** @ngInject */
export class tbStreamsCtrl {
  inStreams: () => Array<Stream>;
  streamAttributes: Array<StreamsAttribute> = StreamAttributes.allAtributes();

  constructor(private $mdSidenav) {
  }
  
  toggleRightSidebar() {
    this.$mdSidenav('right').toggle();
  }

}