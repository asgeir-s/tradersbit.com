import { StreamsAttribute, Stream} from "../../../app/typings/types.d.ts"

export class TbStreamsTable implements ng.IComponentOptions {
    bindings: any
    controller: any
    templateUrl: string

    constructor() {
        this.bindings = {
            inStreams: "<",
            inAttributes: "<",
            inSortBy: "@",
            inMinNumTrades: "<",
            inActiveLastDays: "<",
            inMinNetProfit: "<"
        }
        this.controller = TbStreamsTableCtrl
        this.templateUrl = "app/components/streams-table/streams-table.html"
    }
}

class TbStreamsTableCtrl {
    inStreams: Array<Stream>
    inAttributes: Array<StreamsAttribute>
    inSortBy: string
    inMinNumTrades: number
    inActiveLastDays: number
    inMinNetProfit: number

    reverse: boolean
    predicate: StreamsAttribute
    streams: Array<Stream>

    constructor(private $state: any, private _: any) {
        "ngInject"
        this.reverse = true
        this.predicate = _.find(this.inAttributes, it => it.short === this.inSortBy)
        this.updateFilters()
    }

    $onChanges(): void {
        this.updateFilters()
    }

    updateFilters(): void {
        this.streams = this.inStreams

        if (this.inMinNumTrades != null) {
            this.streams = this.streams.filter(stream =>
                stream.stats.numberOfClosedTrades >= this.inMinNumTrades)
        }

        if (this.inActiveLastDays != null && !isNaN(this.inActiveLastDays)) {
            const signalsAfter = new Date().getTime() - this.inActiveLastDays * 86400000
            this.streams = this.streams.filter(stream =>
                stream.stats.timeOfLastSignal >= signalsAfter)
        }

        if (this.inMinNetProfit != null) {
            this.streams = this.streams.filter(stream =>
                (stream.stats.allTimeValueIncl - 1) * 100 >= this.inMinNetProfit)
        }
    }

    order(newPredicate: StreamsAttribute): void {
        this.reverse = (this.predicate === newPredicate) ? !this.reverse : false
        this.predicate = newPredicate
    }

    goToStream(streamID: string): void {
        this.$state.go("stream", { "streamId": streamID })
    }
}