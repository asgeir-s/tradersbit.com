import { Stream, StreamsAttribute } from "../../typings/types"
import { StreamAttributes } from "../../util/stream-attributes"

/** @ngInject */
export function tbCompetition(): angular.IDirective {

  return {
    restrict: "E",
    scope: {},
    templateUrl: "app/comp-top/competition/competition.html",
    controller: TbCompetitionCtrl,
    controllerAs: "ctrl",
    bindToController: {
      inStreams: "&"
    }
  }
}

/** @ngInject */
export class TbCompetitionCtrl {
  inStreams: () => Array<Stream>
  attributes: Array<StreamsAttribute> = [{
    name: "Name",
    jsonPath: "name",
    short: "Name",
    description: "",
    on: true,
    getIt: (stream: Stream) => {
      return stream.name
    },
    getValue: (stream: Stream) => {
      return stream.name
    }
  },
    {
      name: "Net Profit",
      short: "Net Profit",
      description: "All-time profit for this stream.",
      jsonPath: "stats.allTimeValueIncl",
      on: true,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 < 0
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100 > 0
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100
      }
    }
  ]

  comp3 = {
    startTime: 1462104000000,
    endTime: 1470052800000,
    timeLeft: {
      seconds: 0,
      minutes: 0,
      hours: 0,
      days: 0
    }
  }

  top10StreamsComp2: Array<Stream>
  top10StreamsComp3: Array<Stream>

  constructor(private $mdSidenav: angular.material.ISidenavService, private _: any,
    $interval: any, private $state: any) {
    this.top10StreamsComp2 = this.inStreams()
      .filter((stream: Stream) => stream.stats.numberOfClosedTrades >= 20)
      .sort((stream1: Stream, stream2: Stream) =>
        this.attributes[1].getValue(stream2) - this.attributes[1].getValue(stream1)).slice(0, 10)

    this.top10StreamsComp3 = this.inStreams()
      .filter((stream: Stream) => stream.recordedState[this.comp3.startTime.toString()] != null)
      .filter((stream: Stream) =>
        (stream.lastSignal.id - stream.recordedState[this.comp3.startTime.toString()].firstSignal.id) >= 20)
      .sort((stream1: Stream, stream2: Stream) => {
        const stream1Change =
          stream1.lastSignal.changeInclFee -
          stream1.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee

        const stream2Change =
          stream2.lastSignal.changeInclFee -
          stream2.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee

        return stream2Change - stream1Change
      })

    console.log("top10StreamsComp3: " + JSON.stringify(this.top10StreamsComp3))

    $interval(() => {
      const timeLeftComp3 = this.comp3.endTime - new Date().getTime()
      this.comp3.timeLeft.seconds = Math.floor((this.comp3.endTime / 1000) % 60)
      this.comp3.timeLeft.minutes = Math.floor(((this.comp3.endTime / (1000 * 60)) % 60))
      this.comp3.timeLeft.hours = Math.floor(((this.comp3.endTime / (1000 * 60 * 60)) % 24))
      this.comp3.timeLeft.days = Math.floor((this.comp3.endTime / (1000 * 60 * 60 * 24)))
    }, 1000, 0)

  }

  goToStream(streamID: string) {
    this.$state.go("stream", { "streamId": streamID })
  }

  toggleRightSidebar(): void {
    this.$mdSidenav("right").toggle()
  }

  toggleMenu() {
    return this.$mdSidenav("leftBig").open()
  }

}