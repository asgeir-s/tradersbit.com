

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
  streamAttributes: Array<StreamsAttribute> = StreamAttributes.allAtributes();
  windowWidth: number;
  isMobile: boolean;

  constructor(private $mdSidenav: angular.material.ISidenavService, private $window: angular.IWindowService) {
    this.windowWidth = $window.innerWidth;

    if (!this.isMobile && this.windowWidth < 600) {
      this.showOnlyMobileAttr();
      this.isMobile = true;
    }
    else if (this.windowWidth > 600) {
      this.isMobile = false;
    }

    angular.element($window).bind('resize', () => {
      this.windowWidth = $window.innerWidth;
      // manuall $digest required as resize event
      // is outside of angular
      
      if (!this.isMobile && this.windowWidth < 600) {
        this.showOnlyMobileAttr();
        this.isMobile = true;
      }
      else if (this.windowWidth > 600) {
        this.isMobile = false;
      }
    });
  }

  showOnlyMobileAttr(): void {
    this.streamAttributes.forEach((attr: StreamsAttribute) => {
      if (attr.short === 'NP' || attr.short === 'Name') {
        attr.on = true;
      }
      else {
        attr.on = false;
      }

    })
  }

  toggleRightSidebar(): void {
    this.$mdSidenav('right').toggle();
  }

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }

}