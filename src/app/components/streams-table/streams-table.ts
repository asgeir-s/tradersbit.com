import { StreamsAttribute, Stream} from "../../../app/typings/types"

/** @ngInject */
export function tbStreamsTable(): angular.IDirective {

    return {
        restrict: "E",
        scope: {},
        templateUrl: "app/components/streams-table/streams-table.html",
        bindToController: {
            inStreams: "&",
            inAttributes: "&",
            inSortBy: "="
        },
        controller: TbStreamsTableCtrl,
        controllerAs: "ctrl"
    }
}

/** @ngInject */
export class TbStreamsTableCtrl {
    // inputs
    inAttributes: () => Array<StreamsAttribute>
    inStreams: () => Array<Stream>
    inSortBy: string

    reverse: Boolean = true
    predicate: StreamsAttribute

    /* @ngInject */
    constructor(private $state: any, private _: any) {
        this.predicate = _.find(this.inAttributes(), (it: any) => it.short === this.inSortBy)
        console.log(this.predicate.name)
    }

    order(predicate: StreamsAttribute) {
        this.reverse = (this.predicate === predicate) ? !this.reverse : false
        this.predicate = predicate
    }

    goToStream(streamID: string) {
        this.$state.go("stream", { "streamId": streamID })
    }
}