import { Stream, StreamsAttribute } from "../../typings/types.d.ts"
import { StreamAttributes } from "../../util/stream-attributes"

export class CompetitionView implements ng.IComponentOptions {
  bindings: any
  controller: any
  templateUrl: string

  constructor() {
    this.bindings = {
      inStreams: "<"
    }
    this.controller = CompetitionViewCtrl
    this.templateUrl = "app/comp-top/competition/competition.html"
  }
}

class CompetitionViewCtrl {
  inStreams: Array<Stream>
  attributesComp2: Array<StreamsAttribute> = [{
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
      name: "Net profit",
      short: "Net profit",
      description: "All-time profit for this stream.",
      jsonPath: "stats.allTimeValueIncl",
      on: true,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) < 0
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) > 0
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl - 1) * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl - 1) * 100
      }
    }
  ]

  attributesComp3: Array<StreamsAttribute> = [{
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
      name: "Change since 1 May",
      short: "Change since 1 May",
      description: "Change since 1 May.",
      jsonPath: "",
      on: true,
      bad: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl -
          stream.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee) < 0
      },
      good: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl -
          stream.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee) > 0
      },
      getIt: (stream: Stream) => {
        return ((stream.stats.allTimeValueIncl -
          stream.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee) * 100).toFixed(2) + "%"
      },
      getValue: (stream: Stream) => {
        return (stream.stats.allTimeValueIncl -
          stream.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee) * 100
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

  constructor(
    private $mdSidenav: ng.material.ISidenavService,
    private _: any,
    $interval: any,
    private $state: any) {
    "ngInject"
    this.top10StreamsComp2 = this.inStreams
      .filter((stream: Stream) => stream.stats.numberOfClosedTrades >= 20)
      .sort((stream1: Stream, stream2: Stream) =>
        this.attributesComp2[1].getValue(stream2) - this.attributesComp2[1].getValue(stream1)).slice(0, 10)

    this.top10StreamsComp3 = this.inStreams
      .filter((stream: Stream) => stream.recordedState[this.comp3.startTime.toString()] != null)
      .filter((stream: Stream) =>
        (stream.stats.numberOfSignals - stream.recordedState[this.comp3.startTime.toString()].firstSignal.id) >= 20 * 2)
      .sort((stream1: Stream, stream2: Stream) => {
        const stream1Change =
          stream1.stats.allTimeValueIncl -
          stream1.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee

        const stream2Change =
          stream2.stats.allTimeValueIncl -
          stream2.recordedState[this.comp3.startTime.toString()].firstSignal.valueInclFee

        return stream1Change - stream2Change
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