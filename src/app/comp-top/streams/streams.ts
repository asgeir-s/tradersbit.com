import { Stream, StreamsAttribute } from '../../typings/types'
import { StreamAttributes } from '../../util/stream-attributes'

/** @ngInject */
export function tbStreams(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/streams/streams.html',
    controller: TbStreamsCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inStreams: '&'
    }
  };

}

/** @ngInject */
export class TbStreamsCtrl {
  inStreams: () => Array<Stream>;
  streamAttributes = 
  StreamAttributes.infoAttributes;
  

   

  constructor(private $mdSidenav: angular.material.ISidenavService) { 
    console.log(StreamAttributes.arr["2"]);
  }
  
  toggleRightSidebar(): void {
    this.$mdSidenav('right').toggle();
  }
  
  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

}