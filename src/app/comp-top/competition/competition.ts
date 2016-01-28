import { Stream, StreamsAttribute } from '../../typings/types'
import { StreamAttributes } from '../../util/stream-attributes'

/** @ngInject */
export function tbCompetition(): angular.IDirective {

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app/comp-top/competition/competition.html',
    controller: TbCompetitionCtrl,
    controllerAs: 'ctrl',
    bindToController: {
      inStreams: '&'
    }
  };

}

/** @ngInject */
export class TbCompetitionCtrl {
  inStreams: () => Array<Stream>;
  allStreamAttributes: Array<StreamsAttribute> = StreamAttributes.allAtributes();
  streamAttributes: Array<StreamsAttribute> = new Array<StreamsAttribute>();
  endTime: number = 1457222340000; 
                    1462312740000
  timeLeft: number = this.endTime - new Date().getTime();
  seconds = Math.floor((this.timeLeft / 1000) % 60);
  minutes = Math.floor(((this.timeLeft / (1000 * 60)) % 60));
  hours = Math.floor(((this.timeLeft / (1000 * 60 * 60)) % 24));
  days = Math.floor((this.timeLeft / (1000 * 60 * 60 * 24)));

  constructor(private $mdSidenav: angular.material.ISidenavService, private _: any, $interval: any) {
    console.log(this.streamAttributes);

    this.streamAttributes = _.filter(this.allStreamAttributes, (attr: any) => attr.short === "Name" || attr.short === "NP");


    $interval(() => {
      this.timeLeft = this.endTime - new Date().getTime();
      this.seconds = Math.floor((this.timeLeft / 1000) % 60);
      this.minutes = Math.floor(((this.timeLeft / (1000 * 60)) % 60));
      this.hours = Math.floor(((this.timeLeft / (1000 * 60 * 60)) % 24));
      this.days = Math.floor((this.timeLeft / (1000 * 60 * 60 * 24)));

    }, 1000, 0);


  }

  toggleRightSidebar(): void {
    this.$mdSidenav('right').toggle();
  }

  toggleMenu() {
    return this.$mdSidenav('leftBig').open();
  }




}