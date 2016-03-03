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
  attributes: Array<StreamsAttribute> = [{
    name: "Name",
    jsonPath: "name",
    short: "Name",
    description: '',
    on: true,
    getIt: (stream: Stream) => {
      return stream.name;
    },
    getValue: (stream: Stream) => {
      return stream.name;
    }
  },
    {
      name: "Net Profit",
      short: "Net Profit",
      description: "All-time profit for this stream.",
      jsonPath: "stats.allTimeValueIncl",
      on: true,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 < 0;
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 > 0;
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2) + '%';
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100;
      }
    }
  ];
  endTime: number = 1457222340000;
  top10Streams: Array<Stream>;
  timeLeft: number = this.endTime - new Date().getTime();
  seconds = Math.floor((this.timeLeft / 1000) % 60);
  minutes = Math.floor(((this.timeLeft / (1000 * 60)) % 60));
  hours = Math.floor(((this.timeLeft / (1000 * 60 * 60)) % 24));
  days = Math.floor((this.timeLeft / (1000 * 60 * 60 * 24)));

  constructor(private $mdSidenav: angular.material.ISidenavService, private _: any, $interval: any) {
    this.top10Streams = this.inStreams()
    .filter((stream: Stream) => stream.stats.numberOfClosedTrades >= 10)
    .sort((stream1: Stream, stream2: Stream) =>
      this.attributes[1].getValue(stream2) - this.attributes[1].getValue(stream1)).slice(0, 10);

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